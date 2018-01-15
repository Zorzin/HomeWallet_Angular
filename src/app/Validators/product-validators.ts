import {ProductService} from "../Services/product.service";
import {FormControl} from "@angular/forms";

export const productNameValidator = (productService:ProductService, currentName: string) => {
  return (control:FormControl) => {
    if(control.value)
    {
      if(productService.ifProductExist(control.value, currentName)){
        return {forbiddenName:{forbiddenName:control.value}};
      }
      else{
        return null;
      }
    }
  };
};
