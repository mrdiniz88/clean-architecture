import ICustomerRepository from "../../../domain/customer/repository/customer-repository.interface";
import {
  InputListCustomerDTO,
  OutputListCustomerDTO,
} from "./list-customer.dto";

export default class ListCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute(input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll();

    return {
      customers: customers.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          zip: customer.address.zip,
          city: customer.address.city,
        },
      })),
    };
  }
}
