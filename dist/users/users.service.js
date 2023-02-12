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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcryptjs");
const uuid_1 = require("uuid");
const jsonwebtoken_1 = require("jsonwebtoken");
const user_entity_1 = require("./entities/user.entity");
const wallet_service_1 = require("../wallet/wallet.service");
let UsersService = class UsersService {
    constructor(usersRepository, walletService) {
        this.usersRepository = usersRepository;
        this.walletService = walletService;
    }
    async createUser(createUserDto) {
        const userExist = await this.usersRepository.findOneBy({
            emailAddress: createUserDto.emailAddress,
        });
        if (userExist) {
            throw new common_1.UnprocessableEntityException('User Already Exist, Procced to Login');
        }
        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(createUserDto.password, salt);
        createUserDto.password = password;
        const uuid = (0, uuid_1.v4)();
        createUserDto.uuid = uuid;
        createUserDto.msisdn = createUserDto.phoneNumber;
        const newUser = await this.usersRepository.save(createUserDto);
        const userId = newUser.id;
        const accessToken = (0, jsonwebtoken_1.sign)(Object.assign({}, newUser), process.env.JWT_KEY);
        const createWallet = await this.walletService.create(userId);
        return { user: newUser, token: accessToken, wallet: createWallet };
    }
    async loginUser(loginDto) {
        const { emailAddress, password } = loginDto;
        const existUser = await this.usersRepository.findOneBy({ emailAddress });
        if (existUser && (await bcrypt.compare(password, existUser.password))) {
            const userWallet = await this.walletService.findwalletByUserId(existUser.id);
            const accessToken = (0, jsonwebtoken_1.sign)(Object.assign({}, existUser), process.env.JWT_KEY);
            return { user: existUser, token: accessToken, wallet: userWallet };
        }
        else {
            throw new common_1.NotFoundException('User Login Fail');
        }
    }
    findAll() {
        return `This action returns all users`;
    }
    async findOne(id) {
        const existUser = await this.usersRepository.findOne({
            where: { id },
        });
        return existUser;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    remove(id) {
        return `This action removes a #${id} user`;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        wallet_service_1.WalletService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map