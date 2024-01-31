import { PaymentDTO } from "~domain/entity/types/paymentType";

export default interface PaymentRepository {
  createPayment(payment: PaymentDTO): Promise<PaymentDTO>;
  }
  