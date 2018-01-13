import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ShopService} from "../../Services/shop.service";

@Component({
  selector: 'app-shop-create-dialog',
  templateUrl: './shop-create-dialog.component.html',
  styleUrls: ['./shop-create-dialog.component.css']
})
export class ShopCreateDialogComponent{

  constructor(public dialogRef: MatDialogRef<ShopCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private shopService: ShopService) {}
  closeDialog() {
    this.dialogRef.close();
  }

  addShop(newShopName: any) {
    this.shopService.createShop(newShopName.value.toString()).add(()=>{
      this.closeDialog();
    });
  }
}
