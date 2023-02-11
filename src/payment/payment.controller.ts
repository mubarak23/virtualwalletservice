import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { RoleGuard } from 'src/users/role.guard';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { Roles } from 'src/users/role.decorator';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    // return this.paymentService.create(createPaymentDto);
  }

  @Roles('NORMAL')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('/virtual-account/:userId')
  async fetchOrCreateVirtulAccount(@Req() req, @Res() res) {
    const userId = req.params.userId;
    try {
      const virtualAccount = await this.paymentService.createVirtualAccount(
        parseInt(userId),
      );
      return res.status(HttpStatus.CREATED).json({ virtualAccount });
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN).json(error);
    }
  }

  @Roles('NORMAL')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async initializeCardPayment(
    @Req() req,
    @Body() createPaymentDto: CreatePaymentDto,
    @Res() res,
  ) {
    const userId = req.user.id;
    try {
      const virtualAccount = await this.paymentService.createVirtualAccount(
        userId,
      );
      return res.status(HttpStatus.CREATED).json({ virtualAccount });
    } catch (error) {
      return res.status(HttpStatus.FORBIDDEN).json(error);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
