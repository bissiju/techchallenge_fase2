import { v4 as uuidv4 } from "uuid";

import CustomerInput from "./types/customerType";

export default class Customer {
  public id: string;
  public cpf: string | null;
  public email: string | null;
  public name: string;
  public createdAt: Date;
  public deletedAt: Date | null;
  public updatedAt: Date | null;

  constructor(customerInput: CustomerInput) {
    this.id = customerInput.id ?? uuidv4();
    this.email = customerInput.email ?? null;
    this.cpf = customerInput.cpf ?? null;
    this.name = !this.cpf && !this.email && customerInput.name ? 'Anonimo' : customerInput.name as string
    this.createdAt = customerInput.createdAt ?? new Date();
    this.deletedAt = customerInput.deletedAt ?? null;
    this.updatedAt = customerInput.updatedAt ?? null;

  }
}