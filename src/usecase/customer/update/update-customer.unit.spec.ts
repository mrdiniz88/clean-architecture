import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ICustomerRepository from "../../../domain/customer/repository/customer-repository.interface";

import Address from "../../../domain/customer/value-object/address";
import { InputUpdateCustomerDTO } from "./update-customer.dto";
import UpdateCustomerUseCase from "./update-customer.usecase";

describe("Unit test for update customer use case", () => {
  let input: InputUpdateCustomerDTO;
  let customerRepository: ICustomerRepository;

  beforeEach(() => {
    const customer = CustomerFactory.createWithAddress(
      "John",
      new Address("Street", 123, "Zip", "City")
    );

    input = {
      id: customer.id,
      name: "John Doe",
      address: {
        street: "Street Updated",
        number: 1234,
        zip: "Zip Updated",
        city: customer.address.city,
      },
    };

    customerRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
      update: jest.fn(),
    };
  });

  it("should update a customer", async () => {
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
