import {
  InputCreateCustomerDTO,
  OutputCreateCustomerDTO,
} from "./create-customer.dto";
import CreateCustomerUseCase from "./create-customer.usecase";

describe("Unit test create customer use case", () => {
  let input: InputCreateCustomerDTO;
  let customerRepository: any;

  beforeEach(() => {
    input = {
      name: "John",
      address: {
        street: "Street",
        city: "City",
        number: 123,
        zip: "Zip",
      },
    };

    customerRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
    };
  });

  it("should create a customer", async () => {
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    const output = await createCustomerUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
      },
    });
  });

  it("should thrown an errror when name is missing", async () => {
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });


  
  it("should thrown an errror when street is missing", async () => {
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    input.address.street = "";

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow(
      "Street is required"
    );
  });


});
