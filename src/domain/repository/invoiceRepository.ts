import { Invoice, PaymentStatus } from "~domain/entity/invoice";

export type CreateInvoiceInput = {
  orderId: string;
  qrCode: string | null;
  paymentStatus: PaymentStatus;
};

export type UpdateInvoiceInput = {
  id: string;
  paidAt?: Date;
  qrCode?: string;
};

export default interface InvoiceRepository {
  updateInvoice(updateInvoice: UpdateInvoiceInput): Promise<Invoice>;
  createInvoice(createrInvoiceInput: CreateInvoiceInput): Promise<Invoice>;
  viewInvoice(id: string): Promise<Invoice | null>;
  updateStatusPaymentInvoice(
    id: string,
    paymentStatus: PaymentStatus
  ): Promise<Invoice>;
  pegaInvoice(id: string): Promise<Invoice>;
}
