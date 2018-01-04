import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ReceiptService} from "../Services/receipt.service";
import {ShopService} from "../Services/shop.service";
import {Receipt} from "../Models/receipt";
import {log} from "util";
import {Location} from "@angular/common";
import {UserIdService} from "../Services/user-id.service";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  dates: Array<Array<any>>;
  receipts: any;
  private login:boolean;
  private addToday:boolean
  private todayString:string;
  private dataLoaded:boolean;

  constructor(private receiptService: ReceiptService,
              private shopService: ShopService,
              private router: Router,
              private location: Location,
              private userService: UserIdService) { }

  ngOnInit() {
    this.dataLoaded = false;
    this.todayString = new Date().toLocaleDateString();
    this.getUserId();
    this.getReceipts();
    this.location.subscribe((x) => {
      this.getReceipts();
    });
  }

  getReceipts(): void {
      this.receiptService.getReceipts().then((receipts)=>{
        this.receipts = receipts;
        this.getReceiptDate();
        this.setShopNames();
        this.getDates();
        this.getTotalValue();
        if(!this.checkToday())
        {
          this.addToday = true;
        }
        else
        {
          this.addToday = false;
        }
        this.dataLoaded = true;
      });
  }

  private setShopNames() {
    for (let receipt of this.receipts)
    {
      this.shopService.getShop(receipt.shopID).then(shop=>receipt.shopName = shop.name)
    }
  }

  private getDates() {
    let datesCounter = 0;
    let dateCounter =0;
    if(this.receipts.length>0)
    {
      let date = this.receipts[0].purchaseDate;
      this.dates = [[]];
      for(let receipt of this.receipts)
      {
        if(receipt.purchaseDate != date)
        {
          datesCounter++;
          this.dates[datesCounter] = [];
          date = receipt.purchaseDate;
        }
        this.dates[datesCounter].push(receipt);
      }
    }
  }

  private getTotalValue()
  {
      for(let receipt of this.receipts)
      {
        this.receiptService.getReceiptTotalValue(receipt.id).then(value => receipt.totalValue = value);
      }
  }

  private getReceiptDate() {
    for(let receipt of this.receipts)
    {
      receipt.purchaseDate = new Date(receipt.purchaseDate).toLocaleDateString();
    }
  }

  private onSelect(receipt:Receipt)
  {
    this.router.navigate(['/receipt-detail',receipt.id]);
  }

  private onCreate()
  {
    this.router.navigate(['/receipt-create']);
  }

  private getUserId() {
    if(this.userService.getUserId()=='-1' || this.userService.getUserId().length == 0)
    {
      this.login = false;
    }
    else {
      this.login = true;
    }
  }

  private checkToday() :boolean {
    if(this.dates)
    {
      for(let date of this.dates)
      {
        if(date[0].purchaseDate == new Date().toLocaleDateString())
        {
          return true;
        }
      }
    }
    return false;
  }
}
