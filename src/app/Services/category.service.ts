import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class CategoryService {

  private apiUrl = 'http://localhost:54044/api/categories/1';  // URL to web api
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
    return this.http.post(this.apiUrl,"\""+name+"\"",{headers:this.headers,responseType: 'text' })
      .subscribe();
  }
}
