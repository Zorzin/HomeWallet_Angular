import {ProductService} from "../Services/product.service";
import {FormControl} from "@angular/forms";
import {ShopService} from "../Services/shop.service";

export const shopNameValidator = (shopService:ShopService, currentName: string) => {
  return (control:FormControl) => {
    if(control.value)
    {
      if(shopService.ifShopExist(control.value, currentName)){
        return {forbiddenName:{forbiddenName:control.value}};
      }
      else{
        return null;
      }
    }
  };
};
