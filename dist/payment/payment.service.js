"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const axios_1 = require("axios");
const uuid_1 = require("uuid");
const paystack_virtual_account_entity_1 = require("./entities/paystack_virtual_account.entity");
const users_service_1 = require("../users/users.service");
let PaymentService = class PaymentService {
    constructor(PaystackVirtualAccountRepository, userService) {
        this.PaystackVirtualAccountRepository = PaystackVirtualAccountRepository;
        this.userService = userService;
    }
    getPaystackTransactionFeeMajor(amountMajor) {
        let possibleTransactionFee = 0.015 * amountMajor;
        if (amountMajor >= 2500) {
            possibleTransactionFee += 100;
        }
        return possibleTransactionFee > 2000 ? 2000 : possibleTransactionFee;
    }
    handleAxiosRequestError(error) {
        if (error.response) {
            return error.response.data;
        }
        if (error.request) {
            const errorMessage = 'The server seems down at the moment. Please try again later.';
            return errorMessage;
        }
        return error.message;
    }
    async createVirtualAccount(userId) {
        var _a, _b;
        const user = await this.userService.findOne(userId);
        let paystackVirtualNubanAccount = await this.PaystackVirtualAccountRepository.findOneBy({
            userId: user.id,
        });
        if (paystackVirtualNubanAccount) {
            return paystackVirtualNubanAccount;
        }
        const createCustomerBaseURL = 'https://api.paystack.co/customer';
        const headers = {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'content-type': 'application/json',
            'cache-control': 'no-cache',
        };
        const createCustomerPayload = {
            first_name: user.firstName,
            last_name: user.lastName,
            email: user.emailAddress,
            phone: user.phoneNumber,
        };
        try {
            const createCustomerResponse = await axios_1.default.post(createCustomerBaseURL, createCustomerPayload, {
                headers,
            });
            if (!createCustomerResponse.data) {
                throw new common_1.UnprocessableEntityException('An error occurred with our payment provider. Please try again at a later time.');
            }
            const { integration, id } = createCustomerResponse.data.data;
            const createVirtualNubanBaseURL = 'https://api.paystack.co/dedicated_account';
            const createDedicatedNubanPostPayload = {
                customer: id,
                preferred_bank: process.env.NODE_ENV === 'production' ? 'wema-bank' : 'test-bank',
            };
            const createVirtualNubanResponse = await axios_1.default.post(createVirtualNubanBaseURL, createDedicatedNubanPostPayload, {
                headers,
            });
            if (!createVirtualNubanResponse) {
                throw new common_1.UnprocessableEntityException('An error occurred with our payment provider. Please try again at a later time.');
            }
            const { bank, account_name, account_number } = (_a = createVirtualNubanResponse === null || createVirtualNubanResponse === void 0 ? void 0 : createVirtualNubanResponse.data) === null || _a === void 0 ? void 0 : _a.data;
            const virtualNubanActualResponse = (_b = createVirtualNubanResponse === null || createVirtualNubanResponse === void 0 ? void 0 : createVirtualNubanResponse.data) === null || _b === void 0 ? void 0 : _b.data;
            paystackVirtualNubanAccount =
                await this.PaystackVirtualAccountRepository.save({
                    uuid: (0, uuid_1.v4)(),
                    userId: user.id,
                    bankId: bank.id,
                    bankName: bank.name,
                    bankAccountNumber: account_number,
                    bankAccountName: account_name,
                    paystackIntergration: integration,
                    paystackCustomerId: id,
                    dedicatedNubanPayload: virtualNubanActualResponse,
                });
            return paystackVirtualNubanAccount;
        }
        catch (error) {
            console.error('Error funding wallet: ', error.message);
            console.log(error.stack);
            throw new common_1.ServiceUnavailableException('An error occurred. Please try again at a later time.');
        }
    }
    async initializePaymentTransaction(initializeCardPaymentdto) {
        const baseURL = 'https://api.paystack.co/transaction/initialize';
        const headers = {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'content-type': 'application/json',
            'cache-control': 'no-cache',
        };
        try {
            const getTransactionFeeMajor = this.getPaystackTransactionFeeMajor(initializeCardPaymentdto.amountMajor);
            const initializePaymentPayload = {
                amount: initializeCardPaymentdto.amountMajor * 100 +
                    getTransactionFeeMajor * 100,
                email: initializeCardPaymentdto.email,
                metadata: {
                    full_name: initializeCardPaymentdto.fullName,
                },
            };
            const initializePaymentResponse = await axios_1.default.post(baseURL, initializePaymentPayload, {
                headers,
            });
            if (!initializePaymentResponse.data ||
                initializePaymentResponse.status !== 200) {
                throw new common_1.ServiceUnavailableException('An error occurred with our payment provider. Please try again at a later time.');
            }
            const { authorization_url, reference, access_code } = initializePaymentResponse.data.data;
            return {
                paymentProviderRedirectUrl: authorization_url,
                paymentReference: reference,
                accessCode: access_code,
            };
        }
        catch (error) {
            const errorMessage = this.handleAxiosRequestError(error);
            console.log(`e handleAxiosRequestError message: `, errorMessage);
            console.log(`e message: `, error.message);
            console.log(error.stack);
            throw new common_1.ServiceUnavailableException('An error occurred with our payment provider. Please try again at a later time.');
        }
    }
    findAll() {
        return `This action returns all payment`;
    }
    findOne(id) {
        return `This action returns a #${id} payment`;
    }
    update(id, updatePaymentDto) {
        return `This action updates a #${id} payment`;
    }
    remove(id) {
        return `This action removes a #${id} payment`;
    }
};
PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(paystack_virtual_account_entity_1.PaystackVirtualAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], PaymentService);
exports.PaymentService = PaymentService;
//# sourceMappingURL=payment.service.js.map