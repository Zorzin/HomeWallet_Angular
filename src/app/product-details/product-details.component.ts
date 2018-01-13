import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductService} from "../Services/product.service";
import {SelectItem} from "primeng/primeng";
import {CategoryService} from "../Services/category.service";
import {UserInfoService} from "../Services/user-id.service";
import {ProductEditDialogComponent} from "../dialogs/product-edit-dialog/product-edit-dialog.component";
import {MatDialog} from "@angular/material";
import {DeleteDialogComponent} from "../dialogs/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  private width:number;
  private height:number;
  private details: boolean;
  private isDataLoaded: boolean;
  private hasCategories: boolean;
  private removeDialogDisplay: boolean;
  private editDialogDisplay: boolean;

  product:any;
  categories : any;

  multiSelectCategories: SelectItem[];
  currentCategories: any;

  constructor(
    private router : Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private userService: UserInfoService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getWidthAndHeight();
    this.checkUser();
    this.currentCategories = [];
    this.multiSelectCategories = [];
    this.route.paramMap
      .switchMap((params: ParamMap) => this.productService.getProduct(+params.get('id')))
      .subscribe((product) => {
        this.details = true;
        this.product = product;
        this.GetCategories();
        this.getAllCategories();
        this.isDataLoaded = true;
      });
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
  }

  SetStatistics() {
    this.details = false;
  }

  SetDetails() {
    this.details = true;
  }

  private GetCategories() {
    this.productService.getCategories(this.product.id).then((response)=>{
      if(response.toString())
      {
        this.hasCategories = true;
        this.categories = response;
        for(let category of this.categories) {
          this.currentCategories.push(category.id);
        }
      }
    });
  }

  getAllCategories()
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

  CategoryDetails(category:any)
  {
    this.router.navigate(['/category-detail',category.id]);
  }

  GoBack()
  {
    this.router.navigate(['/products']);
  }

  Edit() {

    let dialogRef = this.dialog.open(ProductEditDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
      data:this.product
    });

    dialogRef.afterClosed().subscribe(result => {
      this.product.name = result.name;
      this.GetCategories();
    });
  }

  Delete()
  {
    let dialogRef = this.dialog.open(DeleteDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
      data: { content: 'productdetails-yousure',header:'productdetails-remove'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.ConfirmDelete();
      }
    });
  }

  ConfirmDelete()
  {
    this.productService.deleteProduct(this.product.id).then(()=>{
      this.GoBack();
    });
  }

  private getWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}
