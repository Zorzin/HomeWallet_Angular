import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {SelectItem} from "primeng/components/common/selectitem";
import {ReceiptProduct} from "../../Models/receipt-product";
import {CategoryService} from "../../Services/category.service";
import {ProductService} from "../../Services/product.service";
import {CategoryCreateDialogComponent} from "../category-create-dialog/category-create-dialog.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {productNameValidator} from "../../Validators/product-validators";

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.css']
})
export class ProductEditDialogComponent{

  private oldName:string;
  private oldCategories:any;
  private productId:number;
  private multiSelectCategories: SelectItem[];
  private width: number;
  private height:number;
  private categories : any;
  private product: any;

  private name:FormControl;
  private newProductCategories: FormControl;
  productForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<ProductEditDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private productService: ProductService,
              private categoryService: CategoryService,
              public dialog: MatDialog) {
    this.productService.getProducts();
    this.createFormControls();
    this.createForm();
    this.setValues(data)
    this.getWidthAndHeight();
    this.getCategories();
  }

  setValues(data:any){
    this.oldCategories = [];
    this.product = data;
    this.name.setValue(data.name);
    this.newProductCategories.setValue(data.productCategories);
    this.oldName = data.name;
    this.oldCategories=data.productCategories;
    this.productId = data.id;
    this.multiSelectCategories = [];
  }

  createFormControls() {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      productNameValidator(this.productService,'')
    ]);

    this.newProductCategories = new FormControl();
  }

  createForm(){
    this.productForm = new FormGroup({
      name: new FormGroup({
        productName: this.name
      }),
      categories: new FormGroup({
        newCategories: this.newProductCategories
      })
    });
  }

  Cancel() {
    this.name.setValue(this.oldName);
    this.dialogRef.close(true);
  }

  ConfirmEdit()
  {
    this.productService.updateProduct(this.productId,this.name.value,this.newProductCategories.value).then(()=>{
      this.product.name = this.name.value;
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

  getErrorName() {
    return this.name.hasError('required') ? 'products-name-length' :
      this.name.hasError('minlength') ? 'products-name-length' :
        this.name.hasError('forbiddenName') ? 'products-name-error' : '';
    //|translate
  }

}
