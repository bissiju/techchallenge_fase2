import CustomerInput, { CustomerDTO } from "~domain/entity/types/customerType";
import CustomerRepository from "~domain/repository/customerRepository";
import CustomerUseCase from "~domain/use_case/customerUseCase";

export class CustomerController {
  static async createCustomer(
    customerRepository: CustomerRepository,
    customer: CustomerInput
  ): Promise<CustomerDTO | null> {
    return await CustomerUseCase.createCustomer(
      customerRepository, customer
    );
  }

  static async listCustomers(
    customerRepository: CustomerRepository
  ): Promise<CustomerDTO[]> {
    return await CustomerUseCase.listCustomers(customerRepository);
  }

  static async viewCustomer(
    customerRepository: CustomerRepository,
    id: string
  ): Promise<CustomerDTO | null> {
    return await CustomerUseCase.viewCustomer(customerRepository, id);
  }
}