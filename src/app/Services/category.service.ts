import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserInfoService} from "./user-id.service";

@Injectable()
export class CategoryService {

  private apiUrl = 'http://localhost:54044/api/categories/';  // URL to web api
  private apiProductsUrl = 'http://localhost:54044/api/categories/products/';  // URL to web api
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private userId : string;

  private response : any;

  constructor(private http: HttpClient,
              private userService: UserInfoService) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getCategory(id:number) {
    return this.http.get(this.apiUrl +this.userService.getUserId()+ "/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  getCategories()
  {
    return this.http.get(this.apiUrl+this.userService.getUserId())
      .toPromise()
      .catch(this.handleError);
  }

  createCategory(name: string)
  {
    return this.http.post(this.apiUrl+this.userService.getUserId()+ "/"+name,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }

  getProducts(id:number) {

    return this.http.get(this.apiProductsUrl+this.userService.getUserId()+ "/"+id)
      .toPromise()
      .catch(this.handleError);
  }

  deleteCategory(id:number) {

    return this.http.delete(this.apiUrl+this.userService.getUserId()+ "/"+id,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }

  updateCategory(id, name) {

    return this.http.put(this.apiUrl+this.userService.getUserId()+ "/"+id+"/"+name,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }
}
