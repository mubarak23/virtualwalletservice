import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { WalletService } from 'src/wallet/wallet.service';
export declare class UsersService {
    private usersRepository;
    private readonly walletService;
    constructor(usersRepository: Repository<User>, walletService: WalletService);
    createUser(createUserDto: CreateUserDto): Promise<{
        user: CreateUserDto & User;
        token: string;
        wallet: {
            uuid: any;
            userId: any;
            walletBalanceMinor: number;
        } & import("../wallet/entities/wallet.entity").Wallet;
    }>;
    loginUser(loginDto: LoginUserDto): Promise<{
        user: User;
        token: string;
        wallet: import("../wallet/entities/wallet.entity").Wallet;
    }>;
    findAll(): string;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
