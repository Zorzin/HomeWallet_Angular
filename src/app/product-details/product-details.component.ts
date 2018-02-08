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

  public width:number;
  public height:number;
  public details: boolean;
  public isDataLoaded: boolean;
  public hasCategories: boolean;
  public currency : string;
  public startDate: Date;
  public endDate: Date;

  public step = -1;
  public product:any;
  public  categories : any;
  public currentCategories: any;

  public shopPriceXLabel= "productdetails-shopPriceXLabel";
  public shopPriceYLabel= "productdetails-shopPriceYLabel";
  public view: any[] = [500, 400];
  public scheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private router : Router,
    private productService: ProductService,
    private route: ActivatedRoute,
    private userService: UserInfoService,
    private dialog: MatDialog) { }
    private summary : any;

  ngOnInit() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setMonth(this.endDate.getMonth()-1);
    this.getWidthAndHeight();
    this.checkUser();
    this.currentCategories = [];
    this.route.paramMap
      .switchMap((params: ParamMap) => this.productService.getProduct(+params.get('id')))
      .subscribe((product) => {
        this.details = true;
        this.product = product;
        this.GetCurrency();
        this.GetCategories();
        this.GetStatistics();
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
        this.currentCategories=[];
        this.hasCategories = true;
        this.categories = response;
        for(let category of this.categories) {
          this.currentCategories.push(category.id);
        }
        this.product.productCategories = this.currentCategories;
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
      if(!result)
      {
        this.GetCategories();
      }
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

  private GetStatistics() {
    let startoffset = this.startDate.getTimezoneOffset()*60000;
    let startdate = new Date(this.startDate);
    startdate.setTime(startdate.getTime()-startoffset);

    let endoffset = this.endDate.getTimezoneOffset()*60000;
    let enddate = new Date(this.endDate);
    enddate.setTime(enddate.getTime()-endoffset);

    this.productService.getProductStatistics(this.product.id,startdate.toISOString(),enddate.toISOString())
      .then((response)=>{
        this.summary = response;
        this.isDataLoaded = true;
      })
  }

  private GetCurrency() {
    this.userService.getUserCurrency().then((response)=>this.currency = JSON.parse(response));
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  SetDates() {
    this.GetStatistics();
    this.step = -1;
  }
}
