import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ShopService} from "../Services/shop.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {

  private isDataLoaded: boolean;
  private shop: any;
  private details: boolean;
  private hasProducts: boolean;
  private products: any;
  private removeDialogDisplay: boolean;
  private editDialogDisplay: boolean;

  constructor(
    private location: Location,
    private router: Router,
    private shopService: ShopService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.shopService.getShop(+params.get('id')))
      .subscribe((shop) => {
        this.shop = shop;
        this.details = true;
        this.isDataLoaded = true;
        this.GetProducts();
      });
  }

  private GetProducts() {
    this.shopService.getShopProducts(this.shop.id).then((result)=>{
      if(result!=null)
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
    this.editDialogDisplay = true;
  }

  Delete()
  {
    this.removeDialogDisplay = true;
  }

  CancelDelete()
  {
    this.removeDialogDisplay = false;
  }

  ConfirmDelete()
  {
    this.shopService.deleteShop(this.shop.id).add(()=>{
      this.GoBack();
    });
  }

  ConfirmEdit() {
    this.shopService.editShop(this.shop.id,this.shop.name).add(()=>{
      this.editDialogDisplay = false;
    })
  }

  CancelEdit() {
    this.editDialogDisplay = false;
  }
}
