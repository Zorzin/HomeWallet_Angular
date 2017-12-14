import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {log} from "util";

@Injectable()
export class ProductService {

  private apiUrl = 'http://localhost:54044/api/products/1';  // URL to web api
  private apiCategoriesUrl = 'http://localhost:54044/api/products/categories/1';  // URL to web api
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private userId : string;

  private response : any;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getProduct(id:number) {
    return this.http.get(this.apiUrl + "/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  getProducts()
  {
    return this.http.get(this.apiUrl)
      .toPromise()
      .catch(this.handleError);
  }

  createProduct(name: string, categories: number[])
  {
    let body = "{" +
      "\"name\":\"" + name + "\","+
      "\"categories\":[" + categories.toString() + "]"+
      "}"
    return this.http.post(this.apiUrl,body,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

  getCategories(id:number) {
    return this.http.get(this.apiCategoriesUrl+"/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  deleteProduct(id:number) {
    return this.http.delete(this.apiUrl+"/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  updateProduct(id:number,name: string, categories: number[]) {

    let body = "{" +
      "\"name\":\"" + name + "\","+
      "\"categories\":[" + categories.toString() + "]"+
      "}"
    return this.http.put(this.apiUrl+"/"+id,body,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }
}
