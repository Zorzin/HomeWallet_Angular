import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialog} from "@angular/material";
import {CategoryService} from "../../Services/category.service";
import {ShopService} from "../../Services/shop.service";
import {ProductService} from "../../Services/product.service";
import {SelectItem} from "primeng/primeng";
import {ReceiptProduct} from "../../Models/receipt-product";
import {CategoryCreateDialogComponent} from "../category-create-dialog/category-create-dialog.component";

@Component({
  selector: 'app-product-create-dialog',
  templateUrl: './product-create-dialog.component.html',
  styleUrls: ['./product-create-dialog.component.css']
})
export class ProductCreateDialogComponent{

  private newProductName: string;
  private newProductCategories: number[];
  private currentProduct : ReceiptProduct;
  private multiSelectCategories: SelectItem[];
  private categories: any;
  private width: number;
  private height:number;

  constructor(public dialogRef: MatDialogRef<ProductCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private productService: ProductService,
              private categoryService: CategoryService,
              public dialog: MatDialog) {
    this.newProductCategories = [];
    this.currentProduct = new ReceiptProduct();
    this.multiSelectCategories = [];
    this.getWidthAndHeight();
    this.getCategories();
  }

  Close() {
    this.dialogRef.close();
  }

  ConfirmCreate()
  {
      this.productService.createProduct(this.newProductName,this.newProductCategories).then((response)=>{
        this.currentProduct.Name = this.newProductName;
        this.currentProduct.ID = parseInt(response);
        this.dialogRef.close();
      });
  }

  getCategories()
  {
    this.categoryService.getCategories().then((response)=>{
      this.categories= response;
      for (let category of this.categories)
      {
        let item:any = {};
        item.value = category.id;
        item.label = category.name;
        this.multiSelectCategories.push(item);
      }
    });
  }

  showCategoryDialog(){
    let dialogRef = this.dialog.open(CategoryCreateDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
    });

    dialogRef.afterClosed().subscribe(result => {
      this.afterCreateCategory();
    });
  }

  private getWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  private afterCreateCategory() {
    this.multiSelectCategories = [];
    this.getCategories();
  }

}
