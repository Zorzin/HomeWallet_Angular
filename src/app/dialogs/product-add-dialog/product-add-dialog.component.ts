import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {ReceiptProduct} from "../../Models/receipt-product";
import {ProductService} from "../../Services/product.service";
import {ShopService} from "../../Services/shop.service";
import {CategoryService} from "../../Services/category.service";
import {SelectItem} from "primeng/primeng";
import {CategoryCreateDialogComponent} from "../category-create-dialog/category-create-dialog.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {productNameValidator} from "../../Validators/product-validators";

@Component({
  selector: 'app-product-add-dialog',
  templateUrl: './product-add-dialog.component.html',
  styleUrls: ['./product-add-dialog.component.css']
})
export class ProductAddDialogComponent{

  private newProductSwitch: boolean = false;
  private currentProduct : ReceiptProduct;
  private multiSelectCategories: SelectItem[];
  private products: SelectItem[];
  private categories: any;
  private width: number;
  private height:number;

  private existProductList: FormControl;
  private productName: FormControl;
  private newProductCategories: FormControl;
  private productAmount: FormControl;
  private productPrice: FormControl;
  private productForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProductAddDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private productService: ProductService,
              private shopService: ShopService,
              private categoryService: CategoryService,
              public dialog: MatDialog) {
    this.productService.getProducts();
    this.createFormControls();
    this.createForm();
    this.setValues();
    this.getWidthAndHeight();
    this.getProducts();
    this.getCategories();
  }

  setValues(){
    this.currentProduct = new ReceiptProduct();
    this.multiSelectCategories = [];
    this.products = [];
  }

  createFormControls() {
    this.existProductList = new FormControl('', [
      Validators.required,
    ]);
    this.productName = new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      productNameValidator(this.productService,"")
    ]);

    this.productAmount = new FormControl('', [
      Validators.required,
      Validators.min(0.01)
    ]);

    this.productPrice = new FormControl('', [
      Validators.required,
      Validators.min(0.01)
    ]);

    this.newProductCategories = new FormControl();
  }

  createForm(){
    this.productForm = new FormGroup({
      existProduct:new FormGroup({
        existProductList: this.existProductList
      }),
      newProduct:new FormGroup({
        productName: this.productName,
        newProductCategories: this.newProductCategories
      }),
      price:new FormGroup({
        productPrice: this.productPrice
      }),
      amount:new FormGroup({
        productAmount: this.productAmount
      }),
      categories: new FormGroup({
        newCategories: this.newProductCategories
      })
    });
  }

  closeDialog( cancel: boolean) {
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
    this.currentProduct.Amount = this.productAmount.value;
    this.currentProduct.Price = this.productPrice.value;
    if(this.newProductSwitch)
    {
      this.productService.createProduct(this.productName.value,this.newProductCategories.value?this.newProductCategories.value:null).then((response)=>{
        this.currentProduct.Name = this.productName.value;
        this.currentProduct.ID = parseInt(response);
        this.closeDialog(false);
      })
    }
    else {
      this.currentProduct.ID = this.existProductList.value;
      this.getProductName().then(()=>{
        this.closeDialog(false);
      });
    }
  }

  private getProductName() {
    return this.productService.getProduct(this.currentProduct.ID).then((response)=>{
      this.currentProduct.Name = response.name;
    });
  }

  getProducts()
  {
    this.productService.getProducts().then((response)=>{
      for (let product of response)
      {
        let item:any = {};
        item.value = product.id;
        item.label = product.name;
        this.products.push(item);
      }
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

  getExistProductErrorName(){
    return this.existProductList.hasError('required') ? 'products-list-error' : '';
  }

  getNewProductErrorName(){
    return this.productName.hasError('required') ? 'products-name-length' :
      this.productName.hasError('minlength') ? 'products-name-length' :
        this.productName.hasError('forbiddenName') ? 'products-name-error' : '';
  }

  getAmountErrorName(){
    return this.existProductList.hasError('required') ? 'products-amount-length' :'';
  }

  getPriceErrorName(){
    return this.existProductList.hasError('required') ? 'products-price-length' :'';
  }
}
