import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
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

  findOne(id: number) {
    return `This action returns a #${id} wallet`;
  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} wallet`;
  }
}
