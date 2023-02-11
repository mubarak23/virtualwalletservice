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
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const wallet_entity_1 = require("./entities/wallet.entity");
let WalletService = class WalletService {
    constructor(walletRepository) {
        this.walletRepository = walletRepository;
    }
    async create(userId) {
        const userHasWallet = await this.walletRepository.findOneBy({
            userId: userId,
        });
        if (userHasWallet) {
            throw new common_1.UnprocessableEntityException('User with provided details has a wallet');
        }
        const newWallet = this.walletRepository.save({
            uuid: (0, uuid_1.v4)(),
            userId,
            walletBalanceMinor: 0,
        });
        if (!newWallet) {
            throw new common_1.UnprocessableEntityException('unable to create wallet');
        }
        return newWallet;
    }
    async findwalletByUserId(userId) {
        const userWallet = await this.walletRepository.findOneBy({ userId });
        if (!userWallet) {
            throw new common_1.UnprocessableEntityException('user Does not work a wallet');
        }
        return userWallet;
    }
    findAll() {
        return `This action returns all wallet`;
    }
    findOne(id) {
        return `This action returns a #${id} wallet`;
    }
    update(id, updateWalletDto) {
        return `This action updates a #${id} wallet`;
    }
    remove(id) {
        return `This action removes a #${id} wallet`;
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wallet_entity_1.Wallet)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallet.service.js.map