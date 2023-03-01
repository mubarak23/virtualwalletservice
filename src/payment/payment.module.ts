import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './entities/payment.entity';
import { PaystackWebHooks } from './entities/paystack_webhook.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaystackTransferRecipient } from './entities/patstack_transfer_recipient.entity';
import { PaystackVirtualAccount } from './entities/paystack_virtual_account.entity';
import { UsersModule } from 'src/users/users.module';
import { WalletModule } from 'src/wallet/wallet.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payment,
      PaystackWebHooks,
      PaystackTransferRecipient,
      PaystackVirtualAccount,
    ]),
    UsersModule,
    WalletModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
