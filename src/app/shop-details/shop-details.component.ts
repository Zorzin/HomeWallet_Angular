import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ShopService} from "../Services/shop.service";
import {Location} from "@angular/common";
import {UserInfoService} from "../Services/user-id.service";
import {DeleteDialogComponent} from "../dialogs/delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material";
import {ShopEditDialogComponent} from "../dialogs/shop-edit-dialog/shop-edit-dialog.component";

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {

  private width:number;
  private height:number;
  private isDataLoaded: boolean;
  private shop: any;
  private details: boolean;
  private hasProducts: boolean;
  private products: any;
  private summary : any;
  private currency : string;
  private startDate: Date;
  private endDate: Date;

  private step = -1;
  private moneySpentXLabel= "shopdetails-moneySpentXLabel";
  private moneySpentYLabel= "shopdetails-moneySpentyLabel";
  private view: any[] = [500, 400];
  private scheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private router: Router,
    private shopService: ShopService,
    private route: ActivatedRoute,
    private userService: UserInfoService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.startDate = new Date();
    this.endDate = new Date();
    this.startDate.setMonth(this.endDate.getMonth()-1);
    this.getWidthAndHeight();
    this.checkUser();
    this.route.paramMap
      .switchMap((params: ParamMap) => this.shopService.getShop(+params.get('id')))
      .subscribe((shop) => {
        this.shop = shop;
        this.details = true;
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

  private GetProducts() {
    this.shopService.getShopProducts(this.shop.id).then((result)=>{
      if(result.toString())
      {
        this.products = result;
        this.hasProducts = true;
      }
    })
  }

  SetStatistics() {
    this.details = false;
  }

  SetDetails() {
    this.details = true;
  }

  ProductDetails(product: any)
  {
    this.router.navigate(['/product-detail',product.id]);
  }

  GoBack()
  {
    this.router.navigate(['/shops']);
  }

  Edit() {

    let dialogRef = this.dialog.open(ShopEditDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
      data: { Name: this.shop.name,Id:this.shop.id },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.updateShop(result);
      }
    });
  }

  Delete()
  {
    let dialogRef = this.dialog.open(DeleteDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
      data: { content: 'shopdetails-yousure',header:'shopdetails-delete'},
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
    this.shopService.deleteShop(this.shop.id).add(()=>{
      this.GoBack();
    });
  }

  private getWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  private updateShop(result: string) {
    this.shop.name = result;
  }

  private GetStatistics() {
    this.shopService.getShopStatistics(this.shop.id,this.startDate.toLocaleDateString(),this.endDate.toLocaleDateString())
      .then((response)=> {
        this.summary = response;
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
