import { randomUUID } from "crypto";
import QRCode from 'qrcode';

import OrderDatabaseRepository from "gateways/database/repository/orderDatabaseRepository";
import { Invoice } from "~domain/entity/invoice";
import CheckoutRepository from "~domain/repository/checkoutRepository";
import InvoiceRepository from "~domain/repository/invoiceRepository";

const orderRepository = new OrderDatabaseRepository();

export default class CheckoutProvider implements CheckoutRepository{
  async generateBilling(invoice: Invoice, invoiceRepository: InvoiceRepository): Promise<Invoice> {

    const order = await orderRepository.viewOrder(invoice.orderId);
    const idBillingFake = randomUUID();
    const urlQrCodeFake = await QRCode.toDataURL(`https://www.apidepayment.com.br/?value=${order?.value}&id=${idBillingFake}`) as string;

    return (await invoiceRepository.updateInvoice({ id: invoice.id, qrCode: urlQrCodeFake })) as Invoice;
  }
}
