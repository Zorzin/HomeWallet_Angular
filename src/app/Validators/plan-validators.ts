import {FormControl} from "@angular/forms";

export const endDateValidator = (startDate:FormControl) => {
  return (control:FormControl) => {
    if(control.value)
    {
      if(control.value <= startDate.value){
        return {wrongEndDate:{wrongEndDate:control.value}};
      }
      else{
        return null;
      }
    }
  };
};
