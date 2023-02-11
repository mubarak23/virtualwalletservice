import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';

@Entity({ name: 'PaystackVirtualAccount' })
export class PaystackVirtualAccount {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('uuid')
  uuid: string;

  @Column('bigint')
  userId: number;

  @Column()
  bankId: number;

  @Column()
  bankName: string;

  @Column()
  bankAccountNumber: string;

  @Column()
  bankAccountName: string;

  @Column()
  paystackIntergration: string;

  @Column()
  paystackCustomerId: string;

  @Column('jsonb')
  dedicatedNubanPayload: any;

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
