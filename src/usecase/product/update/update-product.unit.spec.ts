import IProductRepository from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDTO } from "./update-product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { UpdateProductUseCase } from "./update-product.usecase";

describe("Unit test for update product use case", () => {
  let input: InputUpdateProductDTO;
  let productRepository: IProductRepository;

  beforeEach(() => {
    const product = ProductFactory.create("a", "Tênis", 40);

    input = {
      id: product.id,
      name: "Sapato",
      price: product.price
    };

    productRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue(Promise.resolve(product)),
      update: jest.fn(),
    };
  });

  it("should update a customer", async () => {
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const output = await updateProductUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
