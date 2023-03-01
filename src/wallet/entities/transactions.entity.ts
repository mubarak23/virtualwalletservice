import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';
import { PaymentTransactionStatus } from '../enum/payment-transaction-status.enum';
import { TransactionReferenceType } from '../enum/transaction-reference-type.enum';

@Entity({ name: 'Transactions' })
export class Transactions {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('uuid')
  uuid: string;

  @Column('bigint')
  userId: number;

  @Column('bigint')
  walletId: number;

  @Column()
  reference: string;

  @Column({ default: TransactionReferenceType.PAYSTACK })
  transactionType: string;

  @Column()
  paymentType: string;

  @Column('decimal')
  amountMinor: number;

  @Column({ default: PaymentTransactionStatus.UNPAID })
  paymentStatus: string;

  @Column('decimal')
  walletBalanceMinorBefore: number;

  @Column({ type: 'decimal', nullable: true })
  walletBalanceMinorAfter: number;

  @Column({ type: 'date', nullable: true })
  paidAt: Date;

  @Column()
  currency: string;

  @Column()
  description: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
