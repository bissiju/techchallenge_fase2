export interface PaymentDTO {
  id: string;
  isPaid: boolean;
  paymentValue: number;
  payment_method: string;
  invoiceId: string;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
}

export interface PaymentInput {
  id: string;
  isPaid: boolean;
  paymentValue: number;
  payment_method: string;
  invoiceId: string;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date | null;
}
