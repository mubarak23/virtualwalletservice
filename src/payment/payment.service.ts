import {
  Injectable,
  ServiceUnavailableException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { initializeCardPayment } from './dto/initialize-card-payment.dto';
import { PaystackVirtualAccount } from './entities/paystack_virtual_account.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaystackVirtualAccount)
    private PaystackVirtualAccountRepository: Repository<PaystackVirtualAccount>,
    private readonly userService: UsersService,
  ) {}

  getPaystackTransactionFeeMajor(amountMajor: number) {
    let possibleTransactionFee = 0.015 * amountMajor;

    if (amountMajor >= 2500) {
      possibleTransactionFee += 100;
    }

    return possibleTransactionFee > 2000 ? 2000 : possibleTransactionFee;
  }

  handleAxiosRequestError(error: AxiosError) {
    if (error.response) {
      return error.response.data;
    }
    if (error.request) {
      const errorMessage =
        'The server seems down at the moment. Please try again later.';
      return errorMessage;
    }

    return error.message;
  }

  async createVirtualAccount(userId: number) {
    const user = await this.userService.findOne(userId);
    // return user;
    let paystackVirtualNubanAccount =
      await this.PaystackVirtualAccountRepository.findOneBy({
        userId: user.id,
      });
    if (paystackVirtualNubanAccount) {
      return paystackVirtualNubanAccount;
    }
    // create a customer
    const createCustomerBaseURL = 'https://api.paystack.co/customer';
    const headers = {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    };
    const createCustomerPayload = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.emailAddress,
      phone: user.phoneNumber,
    };
    try {
      const createCustomerResponse: AxiosResponse<any> = await axios.post(
        createCustomerBaseURL,
        createCustomerPayload,
        {
          headers,
        },
      );
      if (!createCustomerResponse.data) {
        throw new UnprocessableEntityException(
          'An error occurred with our payment provider. Please try again at a later time.',
        );
      }

      const { integration, id } = createCustomerResponse.data.data;
      const createVirtualNubanBaseURL =
        'https://api.paystack.co/dedicated_account';
      const createDedicatedNubanPostPayload = {
        customer: id,
        preferred_bank:
          process.env.NODE_ENV === 'production' ? 'wema-bank' : 'test-bank',
      };
      const createVirtualNubanResponse: AxiosResponse<any> = await axios.post(
        createVirtualNubanBaseURL,
        createDedicatedNubanPostPayload,
        {
          headers,
        },
      );
      if (!createVirtualNubanResponse) {
        throw new UnprocessableEntityException(
          'An error occurred with our payment provider. Please try again at a later time.',
        );
      }
      const { bank, account_name, account_number } =
        createVirtualNubanResponse?.data?.data;
      const virtualNubanActualResponse = createVirtualNubanResponse?.data?.data;

      paystackVirtualNubanAccount =
        await this.PaystackVirtualAccountRepository.save({
          uuid: uuidv4(),
          userId: user.id,
          bankId: bank.id,
          bankName: bank.name,
          bankAccountNumber: account_number,
          bankAccountName: account_name,
          paystackIntergration: integration,
          paystackCustomerId: id,
          dedicatedNubanPayload: virtualNubanActualResponse,
        });
      return paystackVirtualNubanAccount;
    } catch (error) {
      console.error('Error funding wallet: ', error.message);
      console.log(error.stack);
      throw new ServiceUnavailableException(
        'An error occurred. Please try again at a later time.',
      );
    }
  }

  async initializePaymentTransaction(
    initializeCardPaymentdto: initializeCardPayment,
  ) {
    const baseURL = 'https://api.paystack.co/transaction/initialize';
    const headers = {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      'content-type': 'application/json',
      'cache-control': 'no-cache',
    };

    try {
      const getTransactionFeeMajor = this.getPaystackTransactionFeeMajor(
        initializeCardPaymentdto.amountMajor,
      );
      const initializePaymentPayload: any = {
        amount:
          initializeCardPaymentdto.amountMajor * 100 +
          getTransactionFeeMajor * 100,
        email: initializeCardPaymentdto.email,
        metadata: {
          full_name: initializeCardPaymentdto.fullName,
        },
      };

      const initializePaymentResponse: AxiosResponse<any> = await axios.post(
        baseURL,
        initializePaymentPayload,
        {
          headers,
        },
      );

      if (
        !initializePaymentResponse.data ||
        initializePaymentResponse.status !== 200
      ) {
        throw new ServiceUnavailableException(
          'An error occurred with our payment provider. Please try again at a later time.',
        );
      }
      const { authorization_url, reference, access_code } =
        initializePaymentResponse.data.data;

      return {
        paymentProviderRedirectUrl: authorization_url,
        paymentReference: reference,
        accessCode: access_code,
      };
    } catch (error) {
      const errorMessage = this.handleAxiosRequestError(error);
      console.log(`e handleAxiosRequestError message: `, errorMessage);
      console.log(`e message: `, error.message);
      console.log(error.stack);

      throw new ServiceUnavailableException(
        'An error occurred with our payment provider. Please try again at a later time.',
      );
    }
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
