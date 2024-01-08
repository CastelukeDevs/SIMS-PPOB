export type ITransaction = {
  invoice_number: string;
  transaction_type: ITransactionType;
  description: string;
  total_amount: number;
  created_on: Date;
};

export type ITransactionType = 'TOPUP' | 'PAYMENT';
