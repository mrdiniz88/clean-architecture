import Customer from "../../../domain/customer/entity/customer";
import ICustomerRepository from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import { OutputFindCustomerDTO } from "./find-customer.dto";
import FindCustomerUseCase from "./find-customer.usecase";

describe("Unit test find customer use case", () => {
  let customerRepository: any;
  let customer: Customer;

  beforeEach(() => {
    customer = new Customer("Jhon Doe", "123");
    const address = new Address("street", 123, "zip", "city");
    customer.changeAddress(address);

    customerRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
      update: jest.fn(),
    };
  });

  it("should find a customer", async () => {
    const usecase = new FindCustomerUseCase(customerRepository);

    await customerRepository.create(customer);

    const input = {
      id: "123",
    };

    const output: OutputFindCustomerDTO = {
      id: "123",
      name: "Jhon Doe",
      address: {
        street: "street",
        city: "city",
        number: 123,
        zip: "zip",
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a customer", async () => {
    customerRepository.findById.mockImplementation(() => {
      throw new Error("Customer not found");
    });

    const usecase = new FindCustomerUseCase(customerRepository);

    await customerRepository.create(customer);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
