import { Invoice, paymentStatus } from "~domain/entity/invoice";
import Order from "~domain/entity/order";
import InvoiceRepository from "~domain/repository/invoiceRepository";

export default class InvoiceUseCase {
  static async generateInvoice(
    order: Order,
    invoiceRepository: InvoiceRepository
  ): Promise<Invoice> {
    const status = paymentStatus.PAYMENT_PENDING;
    const invoice = await invoiceRepository.createInvoice({
      orderId: order.id,
      qrCode: "",
      paymentStatus: status,
    });
    return invoice as Invoice;
  }
}
