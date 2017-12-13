import { Component, OnInit } from '@angular/core';
import {ShopService} from "../Services/shop.service";
import {Shop} from "../Models/shop";
import {Router} from "@angular/router";

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  shops: any;
  private displayCreateDialog: boolean;
  private newShopName: string;

  constructor(private shopService: ShopService,
              private router: Router) { }

  ngOnInit() {
    this.GetShops();
  }

  private GetShops() {
    this.shopService.getShops().then((result)=>{
      this.shops = result;
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
}
