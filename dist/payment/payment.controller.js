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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const create_payment_dto_1 = require("./dto/create-payment.dto");
const update_payment_dto_1 = require("./dto/update-payment.dto");
const role_guard_1 = require("../users/role.guard");
const jwt_auth_guard_1 = require("../users/jwt-auth.guard");
const role_decorator_1 = require("../users/role.decorator");
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    create(createPaymentDto) {
    }
    async fetchOrCreateVirtulAccount(req, res) {
        const userId = req.params.userId;
        try {
            const virtualAccount = await this.paymentService.createVirtualAccount(parseInt(userId));
            return res.status(common_1.HttpStatus.CREATED).json({ virtualAccount });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json(error);
        }
    }
    async initializeCardPayment(req, createPaymentDto, res) {
        const userId = req.user.id;
        try {
            const virtualAccount = await this.paymentService.createVirtualAccount(userId);
            return res.status(common_1.HttpStatus.CREATED).json({ virtualAccount });
        }
        catch (error) {
            return res.status(common_1.HttpStatus.FORBIDDEN).json(error);
        }
    }
    findOne(id) {
        return this.paymentService.findOne(+id);
    }
    update(id, updatePaymentDto) {
        return this.paymentService.update(+id, updatePaymentDto);
    }
    remove(id) {
        return this.paymentService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payment_dto_1.CreatePaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "create", null);
__decorate([
    (0, role_decorator_1.Roles)('NORMAL'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, common_1.Get)('/virtual-account/:userId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "fetchOrCreateVirtulAccount", null);
__decorate([
    (0, role_decorator_1.Roles)('NORMAL'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_payment_dto_1.CreatePaymentDto, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "initializeCardPayment", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_payment_dto_1.UpdatePaymentDto]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PaymentController.prototype, "remove", null);
PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map