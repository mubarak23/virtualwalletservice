import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModuleRef } from '@nestjs/core';
import { Repository } from 'typeorm';
import { TransactionFor } from 'nest-transact';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { sign } from 'jsonwebtoken';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class UsersService extends TransactionFor {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly walletService: WalletService,
    moduleRef: ModuleRef,
  ) {
    super(moduleRef);
  }

  async createUser(createUserDto: CreateUserDto) {
    const userExist = await this.usersRepository.findOneBy({
      emailAddress: createUserDto.emailAddress,
    });

    if (userExist) {
      throw new UnprocessableEntityException(
        'User Already Exist, Procced to Login',
      );
    }
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = password;
    const uuid = uuidv4();
    createUserDto.uuid = uuid;
    createUserDto.msisdn = createUserDto.phoneNumber;
    const newUser = await this.usersRepository.save(createUserDto);
    const userId: number = newUser.id;
    const accessToken = sign({ ...newUser }, process.env.JWT_KEY);
    const createWallet = await this.walletService.create(userId);

    return { user: newUser, token: accessToken, wallet: createWallet };
  }

  async loginUser(loginDto: LoginUserDto) {
    const { emailAddress, password } = loginDto;
    const existUser = await this.usersRepository.findOneBy({ emailAddress });

    if (existUser && (await bcrypt.compare(password, existUser.password))) {
      const userWallet = await this.walletService.findwalletByUserId(
        existUser.id,
      );
      const accessToken = sign({ ...existUser }, process.env.JWT_KEY);
      return { user: existUser, token: accessToken, wallet: userWallet };
    } else {
      throw new NotFoundException('User Login Fail');
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const existUser = await this.usersRepository.findOne({
      where: { id },
    });
    return existUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
