import { Repository } from 'typeorm';
import { AxiosError } from 'axios';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { initializeCardPayment } from './dto/initialize-card-payment.dto';
import { PaystackVirtualAccount } from './entities/paystack_virtual_account.entity';
import { UsersService } from 'src/users/users.service';
export declare class PaymentService {
    private PaystackVirtualAccountRepository;
    private readonly userService;
    constructor(PaystackVirtualAccountRepository: Repository<PaystackVirtualAccount>, userService: UsersService);
    getPaystackTransactionFeeMajor(amountMajor: number): number;
    handleAxiosRequestError(error: AxiosError): unknown;
    createVirtualAccount(userId: number): Promise<PaystackVirtualAccount>;
    initializePaymentTransaction(initializeCardPaymentdto: initializeCardPayment): Promise<{
        paymentProviderRedirectUrl: any;
        paymentReference: any;
        accessCode: any;
    }>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePaymentDto: UpdatePaymentDto): string;
    remove(id: number): string;
}
