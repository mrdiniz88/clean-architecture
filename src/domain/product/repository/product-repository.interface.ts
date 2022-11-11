import RepositoryInterface from "../../@shared/repository/repository.interface";
import IProduct from "../entity/product.interface";

export default interface IProductRepository
  extends RepositoryInterface<IProduct> {}
