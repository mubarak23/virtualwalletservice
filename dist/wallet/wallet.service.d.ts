import { Repository } from 'typeorm';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
export declare class WalletService {
    private walletRepository;
    constructor(walletRepository: Repository<Wallet>);
    create(userId: any): Promise<{
        uuid: any;
        userId: any;
        walletBalanceMinor: number;
    } & Wallet>;
    findwalletByUserId(userId: number): Promise<Wallet>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateWalletDto: UpdateWalletDto): string;
    remove(id: number): string;
}
