import { CustomerDTO } from "~domain/entity/types/customerType";
import Customer from "~domain/entity/customer";
import CPF from "~domain/entity/value_object/cpf";
import Email from "~domain/entity/value_object/email";
import CustomerRepository from "~domain/repository/customerRepository";


export default class CustomerUseCase {
  static async customerExists(customerRepository: CustomerRepository, email: string | null, cpf: string | null): Promise<boolean> {
    const customer = await customerRepository.filtraCustomer(email, cpf);
    return customer ? true : false;
  }

  static async createCustomer(customerRepository: CustomerRepository, customer: CustomerDTO) {
    if (customer.cpf || customer.email) {
      if (customer.cpf) {
        const cpfValidado = new CPF(customer.cpf);
        customer.cpf = cpfValidado.viewValue();
      }

      if (customer.email) {
        const emailValidado = new Email(customer.email);
        customer.email = emailValidado.viewValue();
      }

      const customerExists = await CustomerUseCase.customerExists(customerRepository, customer.email, customer.cpf);

      if (customerExists) {
        throw new Error("customer_duplicado");
      }

    }
    const novoCustomer = new Customer(customer);

    return customerRepository.createCustomer(novoCustomer);
  }

  static async listCustomers(customerRepository: CustomerRepository): Promise<CustomerDTO[]> {
    return customerRepository.listCustomers();
  }

  static async viewCustomer(customerRepository: CustomerRepository, cpf: string): Promise<CustomerDTO | null> {
    const cpfValidado = new CPF(cpf);
    return customerRepository.viewCustomer(cpfValidado.viewValue());
  }

}