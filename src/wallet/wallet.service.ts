import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Transactions } from './entities/transactions.entity';
import { Wallet } from './entities/wallet.entity';
import { PaymentTransactionStatus } from './enum/payment-transaction-status.enum';
import { TransactionReferenceType } from './enum/transaction-reference-type.enum';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
    @InjectRepository(Transactions)
    private transactionRepository: Repository<Transactions>,
  ) {}

  async create(userId: any) {
    const userHasWallet = await this.walletRepository.findOneBy({
      userId: userId,
    });

    if (userHasWallet) {
      throw new UnprocessableEntityException(
        'User with provided details has a wallet',
      );
    }
    const newWallet = this.walletRepository.save({
      uuid: uuidv4(),
      userId,
      walletBalanceMinor: 0,
    });
    if (!newWallet) {
      throw new UnprocessableEntityException('unable to create wallet');
    }
    return newWallet;
  }

  async findwalletByUserId(userId: number) {
    const userWallet = await this.walletRepository.findOneBy({ userId });
    if (!userWallet) {
      throw new UnprocessableEntityException('user Does not work a wallet');
    }
    return userWallet;
  }

  findAll() {
    return `This action returns all wallet`;
  }

  async fetchWalletTransactions(userId: number) {
    const userWallet = await this.walletRepository.findOneBy({ userId });
    if (!userWallet) {
      throw new UnprocessableEntityException('user Does not work a wallet');
    }
    const fetchWalletTransactions = await this.transactionRepository.find({
      where: {
        userId,
        walletId: userWallet.id,
      },
    });

    if (!fetchWalletTransactions) {
      throw new UnprocessableEntityException(
        'Unable to fetch wallet transactions',
      );
    }
    return fetchWalletTransactions;
  }

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  async createWalletTransaction(transactionData: any) {
    
    const newTransaction =  this.transactionRepository.save(
      transactionData,
    );
    
    if(!newTransaction){
      throw new UnprocessableEntityException(
        'Unable to create wallet transactions',
      );
    }
    return newTransaction;
  }

  async findTransactionByReference(reference: string) {
    const financialTransaction = await this.transactionRepository.findOne({
      where: {
        reference,
        transactionType: TransactionReferenceType.PAYSTACK,
      },
    });
    return financialTransaction;
  }

  async processFundWalletTransaction(
    transaction: Transactions,
    sourceWallet: Wallet,
  ) {
    const paymentTransactionUpdate: any = {
      walletBalanceMinorAfter: 
        transaction.walletBalanceMinorBefore + transaction.amountMinor,
        paymentStatus: PaymentTransactionStatus.PAID,
      paidAt: new Date().toISOString(),
    };
    await this.transactionRepository.update(
      transaction.id,
      paymentTransactionUpdate,
    );

    const updateTransaction = {
      walletBalanceMinor:
        sourceWallet.walletBalanceMinor + transaction.amountMinor,
    };

    await this.walletRepository.update(sourceWallet.id, updateTransaction);

    return true;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
