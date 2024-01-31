import { CustomerDTO } from "~domain/entity/types/customerType";

export default interface CustomerRepository {
    createCustomer(Customer: CustomerDTO): Promise<CustomerDTO>;
    listCustomers(): Promise<CustomerDTO[]>;
    viewCustomer(cpf: string | null): Promise<CustomerDTO | null>;
    filtraCustomer(cpf: string | null, email: string | null): Promise<CustomerDTO | null>;
}
