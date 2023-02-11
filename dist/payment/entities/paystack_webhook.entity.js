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
exports.PaystackWebHooks = void 0;
const typeorm_1 = require("typeorm");
let PaystackWebHooks = class PaystackWebHooks {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], PaystackWebHooks.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('uuid'),
    __metadata("design:type", String)
], PaystackWebHooks.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PaystackWebHooks.prototype, "transactionUuid", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Object)
], PaystackWebHooks.prototype, "paystackPayload", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean'),
    __metadata("design:type", Boolean)
], PaystackWebHooks.prototype, "isProcessed", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], PaystackWebHooks.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    }),
    __metadata("design:type", Date)
], PaystackWebHooks.prototype, "updated_at", void 0);
PaystackWebHooks = __decorate([
    (0, typeorm_1.Entity)({ name: 'PaystackWebHooks' })
], PaystackWebHooks);
exports.PaystackWebHooks = PaystackWebHooks;
//# sourceMappingURL=paystack_webhook.entity.js.map