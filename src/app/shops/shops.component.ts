import { Component, OnInit } from '@angular/core';
import {ShopService} from "../Services/shop.service";
import {Shop} from "../Models/shop";
import {Router} from "@angular/router";
import {UserInfoService} from "../Services/user-id.service";

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  private width: number;
  private height:number;
  private shops: any;
  private isDataLoaded: boolean;
  private displayCreateDialog: boolean;
  private newShopName: string;

  constructor(private shopService: ShopService,
              private router: Router,
              private userService:UserInfoService) { }

  ngOnInit() {
    this.getWidthAndHeight();
    this.checkUser();
    this.GetShops();
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
  }

  private GetShops() {
    this.shopService.getShops().then((result)=>{
      this.shops = result;
      this.isDataLoaded = true;
    });
  }

  goToDetails(shop:any) {
    this.router.navigate(['/shop-detail',shop.id]);
  }

  Create() {
    this.displayCreateDialog=true;
  }

  ConfirmCreate() {
    this.shopService.createShop(this.newShopName).add(()=>{
      this.GetShops();
      this.displayCreateDialog=false;
      this.newShopName = "";
    });
  }

  Cancel() {
    this.displayCreateDialog=false;
  }

  private getWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}
