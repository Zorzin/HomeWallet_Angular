import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserRegister} from "../Models/user-register";

@Injectable()
export class RegisterService {
  private apiUrl = 'https://homewalletapi.azurewebsites.net/api/Users/register/';  // URL to web
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private userId : string;

  private response : any;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  register(user:UserRegister) {
    let body = JSON.stringify(user);
    return this.http.post(this.apiUrl,body,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

}
