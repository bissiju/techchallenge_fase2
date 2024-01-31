import { Op } from "sequelize";

import { CustomerDTO } from "~domain/entity/types/customerType";
import customerRepository from "~domain/repository/customerRepository";

import CustomerModel from "../models/customerModel";

class CustomerDatabaseRepository implements customerRepository {
    async createCustomer(customer: CustomerDTO): Promise<CustomerDTO> {
        try {
            return await CustomerModel.create(customer) as CustomerDTO;
        } catch (err: any) {
            console.error('Error creating customer: ', err);
            throw new Error(err);
        }
    }

    async filtraCustomer(cpf: string | null, email: string | null): Promise<CustomerDTO | null> {
        try {
            const query = [];
            if (cpf) {
                query.push([{ cpf }])
            }
            if (email) {
                query.push([{ email }])
            }


            return await CustomerModel.findOne({
                where: {
                    [Op.or]: query
                }
            }) as CustomerDTO;
        } catch (err: any) {
            console.error('Erro ao filtrar customer: ', err);
            throw new Error(err);
        }
    }

    async listCustomers(): Promise<CustomerDTO[]> {
        try {
            return await CustomerModel.findAll() as CustomerDTO[];
        } catch (err: any) {
            console.error('Error listing customers: ', err);
            throw new Error(err);
        }
    }

    async viewCustomer(cpf: string): Promise<CustomerDTO | null> {
        try {
            return await CustomerModel.findOne({ where: { cpf: cpf } }) as CustomerDTO;
        } catch (err: any) {
            console.error('Error viewing customer: ', err);
            throw new Error(err);
        }

    }
}
export default CustomerDatabaseRepository;