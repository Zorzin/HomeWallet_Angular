import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {ReceiptProduct} from "../../Models/receipt-product";
import {ProductService} from "../../Services/product.service";
import {ShopService} from "../../Services/shop.service";
import {CategoryService} from "../../Services/category.service";
import {SelectItem} from "primeng/primeng";
import {CategoryCreateDialogComponent} from "../category-create-dialog/category-create-dialog.component";

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.css']
})
export class ProductAddDialogComponent{

  private newProduct: boolean = false;
  private newProductName: string;
  private newProductCategories: number[];
  private currentProduct : ReceiptProduct;
  private multiSelectCategories: SelectItem[];
  private shops: any;
  private products: any;
  private categories: any;
  private width: number;
  private height:number;

  constructor(public dialogRef: MatDialogRef<ProductAddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private productService: ProductService,
              private shopService: ShopService,
              private categoryService: CategoryService,
              public dialog: MatDialog) {

    this.newProductCategories = [];
    this.currentProduct = new ReceiptProduct();
    this.multiSelectCategories = [];
    this.getWidthAndHeight();
    this.getShops();
    this.getProducts();
    this.getCategories();
  }
  closeDialog( cancel: boolean) {
    this.newProductCategories = [];
    this.newProductName = '';
    if(cancel)
    {
      this.dialogRef.close(null);
    }
    else
    {
      this.dialogRef.close(this.currentProduct);
    }
  }

  addProduct()
  {
    if(this.newProduct)
    {
      this.productService.createProduct(this.newProductName,this.newProductCategories).then((response)=>{
        this.currentProduct.Name = this.newProductName;
        this.currentProduct.ID = parseInt(response);
        this.closeDialog(false);
      })
    }
    else {
      this.getProductName().then(()=>{
        this.closeDialog(false);
      });
    }
  }

  private getProductName() {
    return this.productService.getProduct(this.currentProduct.ID).then(response=>this.currentProduct.Name = response.name);
  }



  getShops()
  {
    this.shopService.getShops().then(response=>this.shops = response)
  }

  getProducts()
  {
    this.productService.getProducts().then(response=>this.products = response);
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
