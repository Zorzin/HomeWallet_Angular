import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {SelectItem} from "primeng/components/common/selectitem";
import {ReceiptProduct} from "../../Models/receipt-product";
import {CategoryService} from "../../Services/category.service";
import {ProductService} from "../../Services/product.service";
import {CategoryCreateDialogComponent} from "../category-create-dialog/category-create-dialog.component";

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.css']
})
export class ProductEditDialogComponent{

  private newProductCategories: number[];
  private product:any;
  private multiSelectCategories: SelectItem[];
  private currentCategories: any;
  private width: number;
  private height:number;
  private categories : any;

  constructor(public dialogRef: MatDialogRef<ProductEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private productService: ProductService,
              private categoryService: CategoryService,
              public dialog: MatDialog) {
    this.product = data;
    this.newProductCategories = [];
    this.multiSelectCategories = [];
    this.getWidthAndHeight();
    this.getCategories();
  }

  Cancel() {
    this.dialogRef.close(true);
  }

  ConfirmEdit()
  {
    this.productService.updateProduct(this.product.id,this.product.name,this.currentCategories).then(()=>{
      this.dialogRef.close(false);
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
