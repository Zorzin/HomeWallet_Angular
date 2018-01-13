import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ShopService} from "../../Services/shop.service";

@Component({
  selector: 'app-shop-edit-dialog',
  templateUrl: './shop-edit-dialog.component.html',
  styleUrls: ['./shop-edit-dialog.component.css']
})
export class ShopEditDialogComponent{

  private name:string;

  constructor(public dialogRef: MatDialogRef<ShopEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private shopService: ShopService) {
    this.name = data.Name;
  }


  ConfirmEdit(){
    this.shopService.editShop(this.data.Id,this.name);
    this.dialogRef.close(this.name);
  }

  Cancel(){
    this.dialogRef.close();
  }
}
