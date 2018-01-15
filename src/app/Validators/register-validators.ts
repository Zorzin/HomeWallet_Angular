import {FormControl} from "@angular/forms";
import {ProductService} from "../Services/product.service";
import {LoginService} from "../Services/login.service";

export const loginNameValidator = (loginService:LoginService) => {
  return (control:FormControl) => {
    if(control.value)
    {
      if(loginService.ifLoginExist(control.value)){
        return {forbiddenName:{forbiddenName:control.value}};
      }
      else{
        return null;
      }
    }
  };
};

export const emailNameValidator = (loginService:LoginService) => {
  return (control:FormControl) => {
    if(control.value)
    {
      if(loginService.ifEmailExist(control.value)){
        return {forbiddenEmail:{forbiddenEmail:control.value}};
      }
      let reg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/i;
      if(!control.value.match(reg)){
        return {notEmail:{notEmail:control.value}};
      }
      else{
        return null;
      }
    }
  };
};


//
