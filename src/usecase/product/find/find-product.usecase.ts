import IProductRepository from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDTO, OutputFindProductDTO } from "./find-product.dto";

export default class FindProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute({ id }: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const customer = await this.productRepository.findById(id);

    return {
      id: customer.id,
      name: customer.name,
      price: customer.price,
    };
  }
}
