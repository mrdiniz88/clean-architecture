import ICustomerRepository from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import {
  InputUpdateCustomerDTO,
  OutputUpdateCustomerDTO,
} from "./update-customer.dto";

export default class UpdateCustomerUseCase {
  constructor(private customerRepository: ICustomerRepository) {}

  async execute(
    input: InputUpdateCustomerDTO
  ): Promise<OutputUpdateCustomerDTO> {
    const customer = await this.customerRepository.findById(input.id);

    customer.changeName(input.name);

    const { city, number, street, zip } = input.address;

    customer.changeAddress(new Address(street, number, zip, city));

    await this.customerRepository.update(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
      },
    };
  }
}
