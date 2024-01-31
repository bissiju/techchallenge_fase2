import { Invoice, PaymentStatus } from "~domain/entity/invoice";
import Order  from "~domain/entity/order";

import InvoiceRepository from "./invoiceRepository";

export interface Payment {
  qrCode?: string;
  paymentStatus: PaymentStatus;
}

export type GeraInvoiceInput = {
  order: Order;
}

export default interface CheckoutRepository {
  generateBilling(invoice: Invoice, invoiceRepository: InvoiceRepository): Promise<Invoice>;
}
