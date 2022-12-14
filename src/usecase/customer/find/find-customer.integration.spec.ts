import { Sequelize } from "sequelize-typescript";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import { OutputFindCustomerDTO } from "./find-customer.dto";
import FindCustomerUseCase from "./find-customer.usecase";

describe("Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close()
  })

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);

    const customer = new Customer("Jhon Doe", "123");
    const address = new Address("street", 123, "zip", "city");
    customer.changeAddress(address);

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
});
