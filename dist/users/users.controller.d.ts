import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { LoginUserDto } from './dto/login-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(res: any, createUserDto: CreateUserDto): Promise<any>;
    loginUser(res: any, loginAuthDto: LoginUserDto): Promise<any>;
    logOutUser(res: any): Promise<any>;
    findAll(): string;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
