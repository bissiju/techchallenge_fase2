import { PaymentInput } from "./types/paymentType";

export default class Payment {
  public id: string;
  public isPaid: boolean;
  public paymentValue: number;
  public payment_method: string;
  public createdAt: Date;
  public deletedAt: Date | null;
  public updatedAt: Date | null;

  constructor(PaymentInput: PaymentInput) {
    this.id = PaymentInput.id;
    this.isPaid = PaymentInput.isPaid;
    this.paymentValue = PaymentInput.paymentValue;
    this.payment_method = PaymentInput.payment_method;
    this.createdAt = PaymentInput.createdAt ?? new Date();
    this.deletedAt = PaymentInput.deletedAt ?? null;
    this.updatedAt = PaymentInput.updatedAt ?? null;
  }
}
