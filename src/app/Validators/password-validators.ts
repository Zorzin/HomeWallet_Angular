import {FormControl} from "@angular/forms";

export const passwordValueValidator = () => {
  return (control:FormControl) => {
    if(control.value)
    {
      if(!control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*?])(?=.{6,100})/)){
        return {wrongPassword:{wrongPassword:control.value}};
      }
      else{
        return null;
      }
    }
  };
};

export const rePasswordValidator = (password:FormControl) => {
  return (control:FormControl) => {
    if(control.value)
    {
      if(control.value != password.value){
        return {wrongRePassword:{wrongRePassword:control.value}};
      }
      else{
        return null;
      }
    }
  };
};
