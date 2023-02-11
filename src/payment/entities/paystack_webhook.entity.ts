import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';

@Entity({ name: 'PaystackWebHooks' })
export class PaystackWebHooks {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('uuid')
  uuid: string;

  @Column({ nullable: true })
  transactionUuid: string;

  @Column('jsonb')
  paystackPayload: any;

  @Column('boolean')
  isProcessed: boolean;

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
