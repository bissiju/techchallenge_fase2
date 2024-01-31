import { v4 as uuidv4 } from "uuid";

import { ItemOrderInput } from "./types/itemOrderType";

export default class ItemOrder {
  public id: string;
  public productId: string;
  public orderId: string;
  public quantity: number;
  public itemValue: number;
  public totalValue: number;
  public note: string | null;
  public createdAt: Date;
  public updatedAt: Date | null;
  public deletedAt: Date | null;
  
  
  constructor(itemOrder: ItemOrderInput) {
    this.id = itemOrder.id ?? uuidv4();
    this.productId = itemOrder.productId;
    this.orderId = itemOrder.orderId;
    this.quantity = itemOrder.quantity;
    this.itemValue = itemOrder.itemValue ?? 0;
    this.totalValue = this.calculateTotal();
    this.note = itemOrder.note ?? null;
    this.createdAt = new Date();
    this.deletedAt = itemOrder.deletedAt ?? null;
    this.updatedAt = itemOrder.updatedAt ?? null;
  }

  calculateTotal(){
    this.totalValue = this.itemValue * this.quantity;
    return this.totalValue;
  }

  updateQuantity(quantity: number) {
    this.quantity = quantity;
    this.calculateTotal();
  }

  updateNote(note: string) {
    this.note = note;
  }
}