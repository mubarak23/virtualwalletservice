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
  UnprocessableEntityException,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { RoleGuard } from 'src/users/role.guard';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { Roles } from 'src/users/role.decorator';
import {getClientIp} from '@supercharge/request-ip';
import {createHmac} from 'crypto';

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

  @Post('/webhook')
  async processWebhookPayment(@Req() req) {
    const paystackApiSecretKey = process.env.PAYSTACK_SECRET_KEY;

    const currentSourceIp: string | undefined = getClientIp(req);
    
    if (!currentSourceIp) {
      throw new UnprocessableEntityException(
        'Could not fetch source ip address',
      );
    }
    const validSourceIps = ['52.31.139.75', '52.49.173.169', '52.214.14.220'];

    if (!validSourceIps.includes(currentSourceIp)) {
      throw new UnprocessableEntityException(
        'Invalid source ip. Counterfeit content!!!',
      );
    }
    if (req.body.data.status !== 'success') {
      throw new UnprocessableEntityException('Unsuccessful payment!!!');
    }
    const saveWebook = await this.paymentService.saveWebHookPayment(req.body);

    const hash = createHmac('sha512', paystackApiSecretKey)
      .update(JSON.stringify(req.body))
      .digest('hex');
    if (hash !== req.headers['x-paystack-signature']) {
      throw new UnprocessableEntityException('Counterfeit content!!!');
    }
    const paystackReference: string = req.body.data.reference;
    const status = await this.paymentService.checkPaystackTransaction(
      paystackReference,
    );
    if (status !== 'success') {
      throw new UnprocessableEntityException('Counterfeit content!!!');
    }
    if (req.body.data.channel === 'dedicated_nuban') {
      // process account to wallet funding
      const processPaymentByBankTransfer =
        await this.paymentService.processAccountToWallet(req);
      // update webook transaction
      await this.paymentService.updateWebhookTransaction(saveWebook);
      return true;
    }
    return false;
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
