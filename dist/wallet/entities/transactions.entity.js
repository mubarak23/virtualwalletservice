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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transactions = void 0;
const typeorm_1 = require("typeorm");
const payment_transaction_status_enum_1 = require("../enum/payment-transaction-status.enum");
const transaction_reference_type_enum_1 = require("../enum/transaction-reference-type.enum");
let Transactions = class Transactions {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Transactions.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Transactions.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], Transactions.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], Transactions.prototype, "walletId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transactions.prototype, "reference", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: transaction_reference_type_enum_1.TransactionReferenceType.PAYSTACK }),
    __metadata("design:type", String)
], Transactions.prototype, "transactionType", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Transactions.prototype, "amountMinor", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: payment_transaction_status_enum_1.PaymentTransactionStatus.UNPAID }),
    __metadata("design:type", String)
], Transactions.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Transactions.prototype, "walletBalanceMinorBefore", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal'),
    __metadata("design:type", Number)
], Transactions.prototype, "walletBalanceMinorAfter", void 0);
__decorate([
    (0, typeorm_1.Column)('date'),
    __metadata("design:type", Date)
], Transactions.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transactions.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Transactions.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Transactions.prototype, "updated_at", void 0);
Transactions = __decorate([
    (0, typeorm_1.Entity)({ name: 'Transactions' })
], Transactions);
exports.Transactions = Transactions;
//# sourceMappingURL=transactions.entity.js.map