import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserInfoService} from "./user-id.service";

@Injectable()
export class CategoryService {

  private apiUrl = 'http://homewalletapi.azurewebsites.net/api/categories/';  // URL to web api
  private apiProductsUrl = 'http://localhost:54044/api/categories/products/';  // URL to web api
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private userId : string;

  private response : any;
  private categories:any;

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

  getCategoryStatistics(id:number, startDate:string, endDate:string) {
    return this.http.get(this.apiUrl+"summary/"+this.userService.getUserId() + "/"+id+"/"+startDate+"/"+endDate)
      .toPromise()
      .catch(this.handleError);
  }

  getCategories()
  {
    return this.http.get(this.apiUrl+this.userService.getUserId())
      .toPromise()
      .then((response)=>this.categories = response)
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

  ifCategoryExist(name:string, currentName:string):boolean{
    if(!this.categories){
      this.getCategories().then(()=>{
        return this.checkName(name,currentName);
      })
    }
    return this.checkName(name,currentName);
  }

  checkName(name:string,currentName:string):boolean{
    if(this.categories)
    {
      for(let category of this.categories){
        if(category.name==name && category.name!=currentName){
          return true;
        }
      }
    }
    return false;
  }
}
