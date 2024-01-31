import { PaymentDTO, PaymentInput } from "~domain/entity/types/paymentType";
import InvoiceRepository from "~domain/repository/invoiceRepository";
import PaymentRepository from "~domain/repository/paymentRepository";
import OrderRepository from "~domain/repository/orderRepository";
import PaymentUseCase from "~domain/use_case/paymentUseCase";

export class PaymentController {
  static async getPayment(
    invoiceRepository: InvoiceRepository, 
    orderRepository: OrderRepository,
    dbPaymentRepository: PaymentRepository,
    payment: PaymentInput
  ): Promise<PaymentDTO> {
    const paymentCreated = await PaymentUseCase.getPayment(
      invoiceRepository,
      orderRepository,
      dbPaymentRepository, payment
    );
    return paymentCreated;
  }
}
