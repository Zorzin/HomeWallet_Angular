import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserLogin} from "../Models/user-login";

@Injectable()
export class LoginService {

  private apiUrl = 'http://homewalletapi.azurewebsites.net/api/Users/';  // URL to web
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private userId : string;

  private logins : any
  private emails : any;

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  getLogins(){
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response=>this.logins = response);
  }

  getEmails(){
    return this.http.get(this.apiUrl+"emails")
      .toPromise()
      .then(response=>this.emails = response);
  }


  login(user:UserLogin) {
    let body = JSON.stringify(user);
    return this.http.post(this.apiUrl+"login",body,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

  ifLoginExist(login: any) {
    if(!this.logins){
      this.getLogins().then(()=>{
        return this.checkName(login);
      })
    }
    return this.checkName(login);
  }

  checkName(name:string):boolean{
    if(this.logins)
    {
      for(let login of this.logins){
        if(login==name){
          return true;
        }
      }
    }
    return false;
  }

  ifEmailExist(email: any) {
    if(!this.emails){
      this.getEmails().then(()=>{
        return this.checkEmail(email);
      })
    }
    return this.checkEmail(email);
  }

  checkEmail(name:string):boolean{
    if(this.emails)
    {
      for(let email of this.emails){
        if(email==name){
          return true;
        }
      }
    }
    return false;
  }
}
