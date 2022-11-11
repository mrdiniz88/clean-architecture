import ICustomerRepository from "../../../domain/customer/repository/customer-repository.interface";
import {
  InputCreateCustomerDTO,
  OutputCreateCustomerDTO,
} from "./create-customer.dto";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";

export default class CreateCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(
    input: InputCreateCustomerDTO
  ): Promise<OutputCreateCustomerDTO> {
    const { street, city, number, zip } = input.address;
    const customer = CustomerFactory.createWithAddress(
      input.name,
      new Address(street, number, zip, city)
    );

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street,
        number,
        zip,
        city,
      },
    };
  }
}
