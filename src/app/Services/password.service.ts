import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PasswordChange} from "../Models/password-change";
import {UserInfoService} from "./user-id.service";
import {ApiService} from "./api.service";

@Injectable()
export class PasswordService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private userService: UserInfoService,
              private apiSerive: ApiService) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  changePassword(model:PasswordChange) {
    model.id = +this.userService.getUserId();
    let body = JSON.stringify(model);
    return this.http.post(this.apiSerive.getPasswordUrl(),body,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

}
