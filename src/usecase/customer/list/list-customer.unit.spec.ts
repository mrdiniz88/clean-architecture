import Customer from "../../../domain/customer/entity/customer";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list-customer.usecase";

describe("Unit test for listing customer use case", () => {
  let customer1: Customer;
  let customer2: Customer;
  let customerRepository: any;
  let customers: CustomerFactory[];
  beforeEach(() => {
    customer1 = CustomerFactory.createWithAddress(
      "Jhon Doe",
      new Address("Street", 123, "Zip", "City")
    );

    customer2 = CustomerFactory.createWithAddress(
      "Jhon Doe 2",
      new Address("Street 2", 1234, "Zip1", "City")
    );

    customers = [customer1, customer2];

    customerRepository = {
      create: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve(customers)),
      findById: jest.fn(),
      update: jest.fn(),
    };
  });

  it("should list a customer", async () => {
    const useCase = new ListCustomerUseCase(customerRepository);

    const output = await useCase.execute(undefined);

    expect(output.customers.length).toBe(customers.length);
    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.city).toBe(customer1.address.city);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.city).toBe(customer2.address.city);
  });
});
