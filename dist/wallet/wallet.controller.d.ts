import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
export declare class WalletController {
    private readonly walletService;
    constructor(walletService: WalletService);
    create(createWalletDto: CreateWalletDto): Promise<{
        uuid: any;
        userId: any;
        walletBalanceMinor: number;
    } & import("./entities/wallet.entity").Wallet>;
    findAll(req: any, res: any): any;
    findOne(id: string): string;
    update(id: string, updateWalletDto: UpdateWalletDto): string;
    remove(id: string): string;
}
