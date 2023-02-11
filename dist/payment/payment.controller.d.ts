import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    create(createPaymentDto: CreatePaymentDto): void;
    fetchOrCreateVirtulAccount(req: any, res: any): Promise<any>;
    initializeCardPayment(req: any, createPaymentDto: CreatePaymentDto, res: any): Promise<any>;
    findOne(id: string): string;
    update(id: string, updatePaymentDto: UpdatePaymentDto): string;
    remove(id: string): string;
}
