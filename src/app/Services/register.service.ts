import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserRegister} from "../Models/user-register";
import {ApiService} from "./api.service";

@Injectable()
export class RegisterService {
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private apiSerive: ApiService) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  register(user:UserRegister) {
    let body = JSON.stringify(user);
    return this.http.post(this.apiSerive.getRegisterUrl(),body,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

}
