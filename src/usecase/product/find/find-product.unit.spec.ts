import Product from "../../../domain/product/entity/product";
import IProduct from "../../../domain/product/entity/product.interface";
import { InputFindProductDTO, OutputFindProductDTO } from "./find-product.dto";
import FindProductUseCase from "./find-product.usecase";

describe("Unit test find product use case", () => {
  let product: IProduct;
  let productRepository: any;

  beforeEach(() => {
    product = new Product("Tênis", 30, "123");

    productRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn().mockReturnValue(Promise.resolve(product)),
      update: jest.fn(),
    };
  });

  it("should find a product", async () => {
    const usecase = new FindProductUseCase(productRepository);

    await productRepository.create(product);

    const input = {
      id: "123",
    };

    const output: OutputFindProductDTO = {
      id: "123",
      name: "Tênis",
      price: 30,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a customer", async () => {
    productRepository.findById.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const usecase = new FindProductUseCase(productRepository);

    await productRepository.create(product);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
