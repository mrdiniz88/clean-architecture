import { ValidatorInterface } from "../../@shared/validator/validator.interface";
import IProduct from "../entity/product.interface";
import * as yup from "yup";

export class ProductYupValidator implements ValidatorInterface<IProduct> {
  validate(entity: IProduct): void {
    try {
      yup.object().shape({
        id: yup.string().required("Id is required"),
        name: yup.string().required("Name is required"),
	price: yup.number().min(1, "Price must be greater then zero").required("Price is required")
      }).validateSync({
	id: entity.id,
	name: entity.name,
	price: entity.price
      }, {
	abortEarly: false,
      });
    } catch(errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
	entity.notification.addError({
   	  context: "product",
	  message: error,	      
	})
      })
    }
  }    	

}
