import { Component, OnInit } from '@angular/core';
import {ShopService} from "../Services/shop.service";
import {Shop} from "../Models/shop";
import {Router} from "@angular/router";
import {UserInfoService} from "../Services/user-id.service";
import {ShopCreateDialogComponent} from "../dialogs/shop-create-dialog/shop-create-dialog.component";
import {MatDialog} from "@angular/material";

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

  constructor(private shopService: ShopService,
              private router: Router,
              private userService:UserInfoService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.getWidthAndHeight();
    this.checkUser();
    this.getShops();
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
  }

  private getShops() {
    this.shopService.getShops().then((result)=>{
      this.shops = result;
      this.isDataLoaded = true;
    });
  }

  goToDetails(shop:any) {
    this.router.navigate(['/shop-detail',shop.id]);
  }

  Create() {

    let dialogRef = this.dialog.open(ShopCreateDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getShops();
    });
  }

  private getWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}
