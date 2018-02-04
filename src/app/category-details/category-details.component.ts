import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {CategoryService} from "../Services/category.service";
import {UserInfoService} from "../Services/user-id.service";
import {CategoryEditDialogComponent} from "../dialogs/category-edit-dialog/category-edit-dialog.component";
import {MatDialog} from "@angular/material";
import {DeleteDialogComponent} from "../dialogs/delete-dialog/delete-dialog.component";

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit {

  private width:number;
  private height:number;
  private details: boolean;
  private isDataLoaded: boolean;
  private hasProducts: boolean;
  private category:any;
  private products : any;
  private summary : any;
  private currency : string;
  private step = -1;
  private moneySpentXLabel= "Sklep";
  private moneySpentYLabel= "wydano";
  private view: any[] = [500, 400];
  private scheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  private startDate: Date;
  private endDate: Date;

  constructor(
    private router : Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private userService: UserInfoService) { }

  ngOnInit() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setMonth(this.endDate.getMonth()-1);
    this.getWidthAndHeight();
    this.checkUser();
    this.route.paramMap
      .switchMap((params: ParamMap) => this.categoryService.getCategory(+params.get('id')))
      .subscribe((result) => {
        this.details = true;
        this.category = result;
        this.GetCurrency();
        this.GetProducts();
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

  private GetProducts() {
    this.categoryService.getProducts(this.category.id).then((response)=>{
      if(response.toString())
      {
        this.hasProducts = true;
        this.products = response;
      }
    });
  }

  ProductDetails(product:any)
  {
    this.router.navigate(['/product-detail',product.id]);
  }

  GoBack()
  {
    this.router.navigate(['/categories']);
  }

  Edit() {
    let dialogRef = this.dialog.open(CategoryEditDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
      data: { Name: this.category.name,Id:this.category.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.updateCategory(result);
      }
    });
  }

  Delete()
  {
    let dialogRef = this.dialog.open(DeleteDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
      data: { content: 'categorydetails-areyousure',header:'categorydetails-remove'},
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
    this.categoryService.deleteCategory(this.category.id).add(()=>{
      this.GoBack();
    });
  }

  private getWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  private updateCategory(name:string) {
    this.category.name = name;
  }

  private GetStatistics() {
    this.categoryService.getCategoryStatistics(this.category.id,this.startDate.toLocaleDateString(),this.endDate.toLocaleDateString())
      .then((response)=>{
        this.summary=response;
        this.isDataLoaded = true;
      });
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
