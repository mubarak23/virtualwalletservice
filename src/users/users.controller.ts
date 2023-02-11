import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { DataSource } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
  ) {}

  @Post('/signup')
  async create(@Res() res, @Body() createUserDto: CreateUserDto) {
    try {
      const { token, user, wallet } = await this.dataSource.transaction(
        (manager) => {
          return this.usersService
            .withTransaction(manager)
            .createUser(createUserDto);
        },
      );
      // const { token, user, wallet } = await this.usersService.createUser(
      //   createUserDto,
      // );
      return res.status(HttpStatus.CREATED).json({ token, user, wallet });
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN).json(error);
    }
  }

  @Post('/login')
  async loginUser(@Res() res, @Body() loginAuthDto: LoginUserDto) {
    try {
      const { token, user, wallet } = await this.usersService.loginUser(
        loginAuthDto,
      );
      res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // 1 day
        sameSite: 'none',
        secure: true,
      });
      return res.status(HttpStatus.CREATED).json({ token, user, wallet });
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN).json(error);
    }
  }

  @Get('/logout')
  async logOutUser(@Res() res) {
    try {
      res.cookie('token', '', {
        path: '/',
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'none',
        secure: true,
      });
      return res.status(200).json({ message: 'Successfully Logged Out' });
    } catch (error) {
      return res.json(error);
    }
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
