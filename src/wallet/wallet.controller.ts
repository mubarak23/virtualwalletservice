import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { RoleGuard } from 'src/users/role.guard';
import { Roles } from 'src/users/role.decorator';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Roles('NORMAL')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll(@Req() req, @Res() res) {
    const userId = req.user.id;
    const userWallet = this.walletService.findwalletByUserId(userId);
    if (!userWallet) {
      throw new NotFoundException('user Does not work a wallet');
    }
    return res.status(HttpStatus.ACCEPTED).json({ userWallet });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(+id);
  }

  @Roles('NORMAL')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/transactions/:userId')
  async fetchWalletsTransactions(@Req() req, @Res() res) {
    const userId = req.params.userId;
    try {
      const transactions = await this.walletService.fetchWalletTransactions(
        userId,
      );
      return res.status(HttpStatus.ACCEPTED).json({ transactions });
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN).json(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
