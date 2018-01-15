import { FormControl } from '@angular/forms';
import {CategoryService} from "../Services/category.service";

export const categoryNameValidator = (categoryService:CategoryService, currentName: string) => {
  return (control:FormControl) => {
    if(control.value)
    {
      if(categoryService.ifCategoryExist(control.value, currentName)){
        return {forbiddenName:{forbiddenName:control.value}};
      }
      else{
        return null;
      }
    }
  };
};
