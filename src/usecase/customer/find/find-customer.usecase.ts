import ICustomerRepository from "../../../domain/customer/repository/customer-repository.interface";
import {
  InputFindCustomerDTO,
  OutputFindCustomerDTO,
} from "./find-customer.dto";

export default class FindCustomerUseCase {
  constructor(private readonly customerRepository: ICustomerRepository) {}

  async execute({ id }: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
    const customer = await this.customerRepository.findById(id);

    const { city, number, street, zip } = customer.address;

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street,
        city,
        number,
        zip,
      },
    };
  }
}
