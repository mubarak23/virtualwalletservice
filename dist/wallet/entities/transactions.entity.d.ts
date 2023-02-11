export declare class Transactions {
    id: string;
    uuid: string;
    userId: number;
    walletId: number;
    reference: string;
    transactionType: string;
    amountMinor: number;
    paymentStatus: string;
    walletBalanceMinorBefore: number;
    walletBalanceMinorAfter: number;
    paidAt: Date;
    currency: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}
