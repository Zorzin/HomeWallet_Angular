import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PasswordChange} from "../Models/password-change";
import {UserInfoService} from "./user-id.service";

@Injectable()
export class PasswordService {

  private apiUrl = 'http://localhost:54044/api/Users/password/';  // URL to web
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  private response : any;

  constructor(private http: HttpClient,
              private userService: UserInfoService) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  changePassword(model:PasswordChange) {
    model.id = +this.userService.getUserId();
    let body = JSON.stringify(model);
    return this.http.post(this.apiUrl,body,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

}
