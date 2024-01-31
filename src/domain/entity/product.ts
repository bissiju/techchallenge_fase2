import { v4 as uuidv4 } from "uuid";

import { ProductInput } from "./types/productType";

export default class Product {
  public id: string;
  public name: string;
  public categoryId: string | null;
  public price: number;
  public description: string | null;
  public image: string | null;
  public createdAt: Date;
  public deletedAt: Date | null;
  public updatedAt: Date | null;


  constructor(productInput: ProductInput) {
    this.id = productInput.id ?? uuidv4();
    this.name = productInput.name;
    this.categoryId = productInput.categoryId ?? null;
    this.price = productInput.price;
    this.image = productInput.image;
    this.description = productInput.description ?? null;
    this.createdAt = productInput.createdAt ?? new Date();
    this.deletedAt = productInput.deletedAt ?? null;
    this.updatedAt = productInput.updatedAt ?? null;

    this.validate();
  }

  validate() {
    if (this.price <= 0) {
      throw new Error('Price nao pode ser menor igual a zero');
    }
  }

  viewPrice() {
    return this.price;
  }
}