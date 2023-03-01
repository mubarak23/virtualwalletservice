import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';
import { WalletType } from '../enum/wallet-type.enum';

@Entity({ name: 'Wallet' })
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  uuid: string;

  @Column('bigint')
  userId: number;

  @Column({ type: 'decimal' })
  walletBalanceMinor: number;

  @Column({ default: 'NGN' })
  currency: string;

  @Column({ default: WalletType.CUSTOMER })
  type: string;

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
