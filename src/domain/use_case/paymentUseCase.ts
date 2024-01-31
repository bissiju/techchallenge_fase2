import { PaymentDTO, PaymentInput } from "~domain/entity/types/paymentType";
import InvoiceRepository from "~domain/repository/invoiceRepository";
import PaymentRepository from "~domain/repository/paymentRepository";
import OrderRepository from "~domain/repository/orderRepository";

import OrderUseCase from "./orderUseCase";

export default class PaymentUseCase {
  static async getPayment(invoiceRepository: InvoiceRepository, orderRepository: OrderRepository, paymentRepository: PaymentRepository, payment: PaymentInput): Promise<PaymentDTO> {
    const paymentCreated = await paymentRepository.createPayment(payment);

    if (paymentCreated.isPaid) {
      await OrderUseCase.paymentApproved(orderRepository, invoiceRepository, paymentCreated)
    } else {
      await OrderUseCase.paymentDenied(orderRepository, invoiceRepository, paymentCreated)
    }
    return paymentCreated
  }
}
