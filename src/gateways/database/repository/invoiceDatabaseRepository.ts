import { v4 as uuidv4 } from "uuid";

import { Invoice, PaymentStatus } from "~domain/entity/invoice";
import InvoiceRepository, {
  UpdateInvoiceInput,
  CreateInvoiceInput,
} from "~domain/repository/invoiceRepository";

import InvoiceModel from "../models/invoiceModel";

class InvoiceDatabaseRepository implements InvoiceRepository {
  async updateInvoice({
    id,
    paidAt,
    qrCode,
  }: UpdateInvoiceInput): Promise<Invoice> {
    try {
      return (await InvoiceModel.update(
        {
          paidAt,
          qrCode,
        },
        { where: { id: id } }
      ).then(() =>
        InvoiceModel.findOne({
          where: { id: id },
        })
      )) as Invoice;
    } catch (err: any) {
      console.error("Error creating Invoice: ", err);
      throw new Error(err);
    }
  }

  async createInvoice({
    orderId,
    qrCode,
    paymentStatus,
  }: CreateInvoiceInput): Promise<Invoice> {
    try {
      const invoice = await InvoiceModel.create({
        id: uuidv4(),
        orderId,
        qrCode,
        paymentStatus,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return invoice.dataValues as Invoice;
    } catch (err: any) {
      console.error("Error creating Invoice: ", err);
      throw new Error(err);
    }
  }

  async viewInvoice(invoiceId: string): Promise<Invoice | null> {
    try {
      return await InvoiceModel.findOne({
        where: {
          id: invoiceId,
        },
      });
    } catch (err: any) {
      console.error("Error viewing Invoice: ", err);
      throw new Error(err);
    }
  }

  async pegaInvoice(id: string): Promise<Invoice> {
    try {
      const invoice = await InvoiceModel.findByPk(id);
      return invoice as Invoice;
    } catch (err: any) {
      console.error("Erro ao recuperar Invoice: ", err);
      throw new Error(err);
    }
  }

  async updateStatusPaymentInvoice(
    id: string,
    paymentStatus: PaymentStatus
  ): Promise<Invoice> {
    const invoice = await InvoiceModel.findByPk(id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    invoice!.paymentStatus = paymentStatus;
    await invoice?.save();
    return invoice as Invoice;
  }
}

export default InvoiceDatabaseRepository;
