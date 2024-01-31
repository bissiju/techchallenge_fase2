import { PaymentDTO } from "~domain/entity/types/paymentType";
import PaymentRepository from "~domain/repository/paymentRepository";

import PaymentModel from "../models/paymentModel";

export default class PaymentDatabaseRepository implements PaymentRepository {
  async createPayment(payment: PaymentDTO): Promise<PaymentDTO> {
    try {
      return (await PaymentModel.create(payment)) as PaymentDTO;
    } catch (err: any) {
      console.log("PRINT PAGAMENTO", payment);
      console.error("Error creating payment ", err);
      throw new Error(err);
    }
  }
}
