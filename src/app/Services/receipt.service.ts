import { Injectable } from '@angular/core';
import {Headers,Http} from "@angular/http";
import {Receipt} from "../Models/receipt";
import {log} from "util";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ReceiptCreate} from "../Models/receipt-create";
import {ReceiptCyclicalCreate} from "../Models/receipt-cyclical-create";
import {ReceiptProductEdit} from "../Models/receipt-product-edit";
import {ReceiptEdit} from "../Models/receipt-edit";
import {UserInfoService} from "./user-id.service";

@Injectable()
export class ReceiptService {

  private apiUrl = 'https://homewalletapi.azurewebsites.net/api/receipts/';  // URL to web api
  private apiCyclicalUrl = 'https://homewalletapi.azurewebsites.net/api/receipts/cyclical/';  // URL to web api

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private userService: UserInfoService) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getReceipts() {
    return this.http.get(this.apiUrl+this.userService.getUserId())
      .toPromise()
      .catch(this.handleError);
  }

  getReceiptTotalValue(id:number) {
    return this.http.get(this.apiUrl+this.userService.getUserId()+ "/totalValue/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  getReceipt(id:number) {
    return this.http.get(this.apiUrl+this.userService.getUserId()+ "/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  createReceipt(receipt: ReceiptCreate)
  {
    let body = JSON.stringify(receipt);
    log(body);
    return this.http.post(this.apiUrl+this.userService.getUserId(),body,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }

  createReceiptCyclical(receipt: ReceiptCyclicalCreate)
  {
    let body = JSON.stringify(receipt);
    log(body);
    return this.http.post(this.apiCyclicalUrl+this.userService.getUserId(),body,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

  removeReceipt(id: number)
  {
    return this.http.delete(this.apiUrl+this.userService.getUserId()+ "/"+id)
      .subscribe();
  }

  updateReceipt(receipt: any, receiptProducts: ReceiptProductEdit[])
  {
    let body = this.getReceiptJSON(receipt,receiptProducts);
    return this.http.put(this.apiUrl+this.userService.getUserId()+ "/"+receipt.id,body,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }

  private getReceiptJSON(receipt: any, receiptProducts: ReceiptProductEdit[]) {
      let receiptEdit = new ReceiptEdit();
      console.log(receipt.purchaseDate);

      let offset = receipt.purchaseDate.getTimezoneOffset()*60000;
      let date = new Date(receipt.purchaseDate);
      date.setTime(date.getTime()-offset);
      receiptEdit.Date = date.toISOString();

      receiptEdit.ShopId = receipt.shopID;
      receiptEdit.Products = receiptProducts;
      receiptEdit.ReceiptId = receipt.id;
      return JSON.stringify(receiptEdit);
  }
}
