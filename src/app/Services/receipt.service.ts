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
import {ApiService} from "./api.service";

@Injectable()
export class ReceiptService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private userService: UserInfoService,
              private apiSerive: ApiService) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getReceipts() {
    return this.http.get(this.apiSerive.getReceiptsUrl()+this.userService.getUserId())
      .toPromise()
      .catch(this.handleError);
  }

  getReceiptTotalValue(id:number) {
    return this.http.get(this.apiSerive.getReceiptsUrl()+this.userService.getUserId()+ "/totalValue/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  getReceipt(id:number) {
    return this.http.get(this.apiSerive.getReceiptsUrl()+this.userService.getUserId()+ "/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  createReceipt(receipt: ReceiptCreate)
  {
    let body = JSON.stringify(receipt);
    log(body);
    return this.http.post(this.apiSerive.getReceiptsUrl()+this.userService.getUserId(),body,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }

  createReceiptCyclical(receipt: ReceiptCyclicalCreate)
  {
    let body = JSON.stringify(receipt);
    log(body);
    return this.http.post(this.apiSerive.getReceiptsCyclicalUrl()+this.userService.getUserId(),body,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

  removeReceipt(id: number)
  {
    return this.http.delete(this.apiSerive.getReceiptsUrl()+this.userService.getUserId()+ "/"+id)
      .subscribe();
  }

  updateReceipt(receipt: any, receiptProducts: ReceiptProductEdit[])
  {
    let body = this.getReceiptJSON(receipt,receiptProducts);
    return this.http.put(this.apiSerive.getReceiptsUrl()+this.userService.getUserId()+ "/"+receipt.id,body,{headers:this.headers,responseType: 'text' })
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
