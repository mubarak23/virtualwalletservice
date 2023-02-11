import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';

@Entity({ name: 'PaystackTransferRecipient' })
export class PaystackTransferRecipient {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('uuid')
  uuid: string;

  @Column()
  accountNumber: string;

  @Column()
  bankCode: string;

  @Column()
  recipientCode: string;

  @Column()
  currency: string;

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
