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
exports.Wallet = void 0;
const typeorm_1 = require("typeorm");
const wallet_type_enum_1 = require("../enum/wallet-type.enum");
let Wallet = class Wallet {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], Wallet.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], Wallet.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)('bigint'),
    __metadata("design:type", Number)
], Wallet.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal' }),
    __metadata("design:type", Number)
], Wallet.prototype, "walletBalanceMinor", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'NGN' }),
    __metadata("design:type", String)
], Wallet.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: wallet_type_enum_1.WalletType.CUSTOMER }),
    __metadata("design:type", String)
], Wallet.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Wallet.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], Wallet.prototype, "updated_at", void 0);
Wallet = __decorate([
    (0, typeorm_1.Entity)({ name: 'Wallet' })
], Wallet);
exports.Wallet = Wallet;
//# sourceMappingURL=wallet.entity.js.map