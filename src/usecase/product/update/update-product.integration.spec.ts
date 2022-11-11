import IProductRepository from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDTO } from "./update-product.dto";
import ProductFactory from "../../../domain/product/factory/product.factory";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { UpdateProductUseCase } from "./update-product.usecase";

describe("Integration test for update product use case", () => {
  let input: InputUpdateProductDTO;
  let productRepository: IProductRepository;
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should update a customer", async () => {
    productRepository = new ProductRepository();

    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const product = ProductFactory.create("a", "Tênis", 40);

    productRepository.create(product);

    input = {
      id: product.id,
      name: "Sapato",
      price: product.price,
    };

    const output = await updateProductUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
