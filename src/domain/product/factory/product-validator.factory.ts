import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import IProduct from "../entity/product.interface"
import { ProductYupValidator } from "../validator/product-yup.validator";

export class ProductValidatorFactory {
  static create(): ValidatorInterface<IProduct> { 
    return new ProductYupValidator();
  }
}
