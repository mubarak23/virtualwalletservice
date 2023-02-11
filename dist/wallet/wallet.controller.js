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
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const wallet_service_1 = require("./wallet.service");
const create_wallet_dto_1 = require("./dto/create-wallet.dto");
const update_wallet_dto_1 = require("./dto/update-wallet.dto");
const jwt_auth_guard_1 = require("../users/jwt-auth.guard");
const role_guard_1 = require("../users/role.guard");
const role_decorator_1 = require("../users/role.decorator");
let WalletController = class WalletController {
    constructor(walletService) {
        this.walletService = walletService;
    }
    create(createWalletDto) {
        return this.walletService.create(createWalletDto);
    }
    findAll(req, res) {
        const userId = req.user.id;
        const userWallet = this.walletService.findwalletByUserId(userId);
        if (!userWallet) {
            throw new common_1.NotFoundException('user Does not work a wallet');
        }
        return res.status(common_1.HttpStatus.ACCEPTED).json({ userWallet });
    }
    findOne(id) {
        return this.walletService.findOne(+id);
    }
    update(id, updateWalletDto) {
        return this.walletService.update(+id, updateWalletDto);
    }
    remove(id) {
        return this.walletService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wallet_dto_1.CreateWalletDto]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "create", null);
__decorate([
    (0, role_decorator_1.Roles)('NORMAL'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, role_guard_1.RoleGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_wallet_dto_1.UpdateWalletDto]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WalletController.prototype, "remove", null);
WalletController = __decorate([
    (0, common_1.Controller)('wallet'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
exports.WalletController = WalletController;
//# sourceMappingURL=wallet.controller.js.map