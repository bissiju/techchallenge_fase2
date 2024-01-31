import { v4 as uuidv4 } from "uuid";

import { OrderInput, StatusOrder, statusOrder } from "./types/orderType";
import { PaymentStatus, paymentStatus } from "./invoice";
import ItemOrder from "./itemOrder";

export default class Order {
  public id: string;
  public customerId: string;
  public invoiceId: string | null;
  public status: StatusOrder;
  public value: number;
  public items: ItemOrder[];
  public deliveredAt: Date | null;
  public createdAt: Date;
  public deletedAt: Date | null;
  public updatedAt: Date | null;

  constructor(orderInput: OrderInput, items: ItemOrder[] | null = []) {
    this.id = orderInput.id ?? uuidv4();
    this.customerId = orderInput.customerId;
    this.invoiceId = orderInput.invoiceId ?? null;
    this.status = orderInput.status ?? this.startOrder();
    this.items =  items ?? [];
    this.deliveredAt = orderInput.deliveredAt ?? null;
    this.createdAt = orderInput.createdAt ?? new Date();
    this.deletedAt = orderInput.deletedAt ?? null;
    this.updatedAt = orderInput.updatedAt ?? null;


    this.value = orderInput.value ?? 0;
    this.calculateTotal();
  }

  startOrder() {
    this.status = statusOrder.STARTED;
  }

  processOrder() {
    if (this.status !== statusOrder.STARTED) {
      throw new Error(
        `Error updating order status`
      );
    }

    this.validateValue();
    this.status = statusOrder.PAYMENT_PENDING;
  }

  updatePayment(orderPaymentStatus: PaymentStatus) {

    if (orderPaymentStatus !== paymentStatus.PAYMENT_PENDING) {
      this.status = orderPaymentStatus === paymentStatus.PAYMENT_APPROVED
        ? statusOrder.PREPARING_PENDING
        : statusOrder.FAILED;
    }
    
  }

  preparing() {
    if (this.status !== statusOrder.PREPARING_PENDING) {
      throw new Error(
        `Error updating order status`
      );
    }
    this.status = statusOrder.PREPARING;
  }

  completed() {
    if (this.status !== statusOrder.PREPARING) {
      throw new Error(
        `Error updating order status`
      );
    }
    this.status = statusOrder.PREPARING_COMPLETED;
  }

  delivered() {
    if (this.status !== statusOrder.PREPARING_COMPLETED) {
      throw new Error(
        `Error updating order status`
      );
    }
    this.deliveredAt = new Date();
    this.status = statusOrder.DELIVERED;
  }

  generateInvoice(invoiceId: string) {
    this.invoiceId = invoiceId;
  }

  validateValue() {
    if (this.value <= 0) {
      throw new Error(
        `Order value is null`
      );
    }
  }

  addItem(item: ItemOrder) {
    if (this.status !== statusOrder.STARTED) {
      throw new Error(
        `Order already processed`
      );
    }

    this.items.push(item);
    this.calculateTotal();
  }

  removeItem(itemId: string) {
    if (this.status !== statusOrder.STARTED) {
      throw new Error(
        `Order already processed`
      );
    }

    this.items = this.items?.filter(item => item.id !== itemId);
    this.calculateTotal();
  }
  
  calculateTotal() {
    this.value = this.items?.reduce((total: number, item: ItemOrder,) => total + item.calculateTotal(), 0) ?? 0;
  }
}
