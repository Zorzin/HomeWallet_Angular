import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ShopService} from "../../Services/shop.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {shopNameValidator} from "../../Validators/shop-validators";

@Component({
  selector: 'app-shop-create-dialog',
  templateUrl: './shop-create-dialog.component.html',
  styleUrls: ['./shop-create-dialog.component.css']
})
export class ShopCreateDialogComponent{

  public name:FormControl;
  public shopForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ShopCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private shopService: ShopService) {
    this.shopService.getShops();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      shopNameValidator(this.shopService,'')
    ]);
  }

  createForm(){
    this.shopForm = new FormGroup({
      name: new FormGroup({
        shopName: this.name
      })
    });
  }

  addShop() {
    this.shopService.createShop(this.name.value).then((response)=>{
      this.dialogRef.close(response);
    });
  }

  getErrorName() {
    return this.name.hasError('required') ? 'shops-name-length' :
      this.name.hasError('minlength') ? 'shops-name-length' :
        this.name.hasError('forbiddenName') ? 'shops-name-error' : '';
    //|translate
  }
}
