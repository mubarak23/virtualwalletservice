import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from './payment/payment.module';
import { WalletModule } from './wallet/wallet.module';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './users/jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PaymentModule,
    WalletModule,
    PassportModule,
    JwtModule.register({ secret: 'secrete', signOptions: { expiresIn: '1h' } }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'manny.db.elephantsql.com',
      port: 5432,
      username: 'sjlflobi',
      password: '3lcI0A7weTOZ_KgX1o1FsM_qptkfufBj',
      database: 'sjlflobi',
      autoLoadEntities: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')], // [join(__dirname, '**', '*.entity.{ts,js}')],
      // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
