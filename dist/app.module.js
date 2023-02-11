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
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const payment_module_1 = require("./payment/payment.module");
const wallet_module_1 = require("./wallet/wallet.module");
const typeorm_2 = require("typeorm");
const config_1 = require("@nestjs/config");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./users/jwt.strategy");
let AppModule = class AppModule {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            payment_module_1.PaymentModule,
            wallet_module_1.WalletModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({ secret: 'secrete', signOptions: { expiresIn: '1h' } }),
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'manny.db.elephantsql.com',
                port: 5432,
                username: 'sjlflobi',
                password: '3lcI0A7weTOZ_KgX1o1FsM_qptkfufBj',
                database: 'sjlflobi',
                autoLoadEntities: true,
                entities: [(0, path_1.join)(__dirname, '**', '*.entity.{ts,js}')],
                synchronize: true,
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, jwt_strategy_1.JwtStrategy],
    }),
    __metadata("design:paramtypes", [typeorm_2.DataSource])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map