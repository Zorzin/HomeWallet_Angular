import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ShopService} from "../../Services/shop.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {shopNameValidator} from "../../Validators/shop-validators";

@Component({
  selector: 'app-shop-edit-dialog',
  templateUrl: './shop-edit-dialog.component.html',
  styleUrls: ['./shop-edit-dialog.component.css']
})
export class ShopEditDialogComponent{

  private name:FormControl;
  private shopForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ShopEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private shopService: ShopService) {
    this.shopService.getShops();
    this.createFormControls();
    this.createForm();
    this.name.setValue(data.Name);
  }

  createFormControls() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      shopNameValidator(this.shopService,this.data.Name)
    ]);
  }

  createForm(){
    this.shopForm = new FormGroup({
      name: new FormGroup({
        shopName: this.name
      })
    });
  }

  getErrorName() {
    return this.name.hasError('required') ? 'shops-name-length' :
      this.name.hasError('minlength') ? 'shops-name-length' :
        this.name.hasError('forbiddenName') ? 'shops-name-error' : '';
    //|translate
  }

  ConfirmEdit(){
    this.shopService.editShop(this.data.Id,this.name.value);
    this.dialogRef.close(this.name.value);
  }

  Cancel(){
    this.dialogRef.close();
  }
}
