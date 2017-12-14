import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class CategoryService {

  private apiUrl = 'http://localhost:54044/api/categories/1';  // URL to web api
  private apiProductsUrl = 'http://localhost:54044/api/categories/products/1';  // URL to web api
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private userId : string;

  private response : any;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getCategory(id:number) {
    return this.http.get(this.apiUrl + "/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  getCategories()
  {
    return this.http.get(this.apiUrl)
      .toPromise()
      .catch(this.handleError);
  }

  createCategory(name: string)
  {
    return this.http.post(this.apiUrl+"/"+name,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }

  getProducts(id:number) {

    return this.http.get(this.apiProductsUrl+"/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  deleteCategory(id:number) {

    return this.http.delete(this.apiUrl+"/"+id,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }

  updateCategory(id, name) {

    return this.http.put(this.apiUrl+"/"+id+"/"+name,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }
}
