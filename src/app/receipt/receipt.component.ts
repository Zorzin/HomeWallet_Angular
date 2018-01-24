import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ReceiptService} from "../Services/receipt.service";
import {ShopService} from "../Services/shop.service";
import {Receipt} from "../Models/receipt";
import {log} from "util";
import {Location} from "@angular/common";
import {UserInfoService} from "../Services/user-id.service";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  dates: Array<Array<any>>;
  datesToView: Array<Array<any>>;
  private loadButton:boolean = true;
  private receipts: any;
  private login:boolean;
  private addToday:boolean;
  private todayString:string;
  private dataLoaded:boolean;
  private currency:string;
  private lastId: number;

  constructor(private receiptService: ReceiptService,
              private shopService: ShopService,
              private router: Router,
              private location: Location,
              private userService: UserInfoService) { }

  ngOnInit() {
    this.datesToView = [[]];
    this.lastId = 0;
    this.checkUser();
    this.dataLoaded = false;
    this.todayString = new Date().toLocaleDateString();
    this.getUserId();
    this.getReceipts();
    this.location.subscribe((x) => {
      this.getReceipts();
    });
  }

  getReceiptToView(){
    let last = this.lastId;
    if(!this.dates)
    {
      this.hideButton();
      return;
    }
    for(let i=last;i<last+5;i++)
    {
      if(this.dates.length>i)
      {
        this.datesToView[i] = [];
        for(let date of this.dates[i]){
          this.datesToView[i].push(date);
        }
      }
      else{
        this.hideButton();
        return;
      }
      this.lastId = i;
    }
  }

  hideButton(){
    this.loadButton = false;
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
  }

  getReceipts(): void {
      this.receiptService.getReceipts().then((receipts)=>{
        this.receipts = receipts;
        this.getReceiptDate();
        this.setShopNames();
        this.getDates();
        this.getTotalValue();
        this.getUSerCurrency();
        if(!this.checkToday())
        {
          this.addToday = true;
        }
        else
        {
          this.addToday = false;
        }
        this.getReceiptToView();
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
        if(receipt.purchaseDate.toLocaleDateString() != date.toLocaleDateString())
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
      receipt.purchaseDate = new Date(receipt.purchaseDate);
    }
  }

  private onSelect(receipt:Receipt)
  {
    this.router.navigate(['/receipt-detail',receipt.id]);
  }

  private onCreate(date:any)
  {
    let param;
    if(date)
    {
      param = date[0].purchaseDate.toUTCString();
    }
    else {
      param = new Date().toUTCString();
    }
    this.router.navigate(['/receipt-create',param]);
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
        if(date[0].purchaseDate.toLocaleDateString() == new Date().toLocaleDateString())
        {
          return true;
        }
      }
    }
    return false;
  }

  private getUSerCurrency() {
    this.userService.getUserCurrency().then((response)=>{
      this.currency = JSON.parse(response);
    });
  }

  onSummary(purchaseDate: string) {
      this.router.navigate(['/daily-summary',purchaseDate.toString()]);
  }
}
