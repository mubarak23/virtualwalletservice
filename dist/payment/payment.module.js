"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const payment_controller_1 = require("./payment.controller");
const payment_entity_1 = require("./entities/payment.entity");
const paystack_webhook_entity_1 = require("./entities/paystack_webhook.entity");
const typeorm_1 = require("@nestjs/typeorm");
const patstack_transfer_recipient_entity_1 = require("./entities/patstack_transfer_recipient.entity");
const paystack_virtual_account_entity_1 = require("./entities/paystack_virtual_account.entity");
const users_module_1 = require("../users/users.module");
let PaymentModule = class PaymentModule {
};
PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                payment_entity_1.Payment,
                paystack_webhook_entity_1.PaystackWebHooks,
                patstack_transfer_recipient_entity_1.PaystackTransferRecipient,
                paystack_virtual_account_entity_1.PaystackVirtualAccount,
            ]),
            users_module_1.UsersModule,
        ],
        controllers: [payment_controller_1.PaymentController],
        providers: [payment_service_1.PaymentService],
    })
], PaymentModule);
exports.PaymentModule = PaymentModule;
//# sourceMappingURL=payment.module.js.map