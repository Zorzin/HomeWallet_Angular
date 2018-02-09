import { Injectable } from '@angular/core';
import {SelectItem} from "primeng/primeng";

@Injectable()
export class ApiService {

  private apiUrl = 'https://homewalletapi.azurewebsites.net/api';  // URL to web api

  constructor() { }

  getCategoriesUrl(){
    return this.apiUrl+"/categories/";
  }

  getCategoriesProductsUrl(){
    return this.apiUrl+"/categories/products/";
  }

  getUsersUrl(){
    return this.apiUrl+"/users/";
  }

  getPasswordUrl(){
    return this.apiUrl+"/users/password/";
  }

  getPlansUrl(){
    return this.apiUrl+"/plans/";
  }

  getPlansIdUrl(){
    return this.apiUrl+"/plans/id/";
  }

  getPlansDetailsUrl(){
    return this.apiUrl+"/plans/details/";
  }

  getProductsUrl(){
    return this.apiUrl+"/products/";
  }

  getProductCategoriesUrl(){
    return this.apiUrl+"/products/categories/";
  }

  getReceiptsUrl(){
    return this.apiUrl+"/receipts/";
  }

  getReceiptsCyclicalUrl(){
    return this.apiUrl+"/receipts/cyclical/";
  }

  getReceiptProductsUrl(){
    return this.apiUrl+"/receiptproducts/";
  }

  getRegisterUrl(){
    return this.apiUrl+"/users/register/";
  }

  getShopUrl(){
    return this.apiUrl+"/shops/";
  }

  getShopProductsUrl(){
    return this.apiUrl+"/shops/products/";
  }

  getSummaryUrl(){
    return this.apiUrl+"/summary/";
  }
}
