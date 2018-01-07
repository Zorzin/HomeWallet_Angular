import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class UserInfoService {

  private loginAnnouncedSource = new Subject<number>();

  loginAnnounced$ = this.loginAnnouncedSource.asObservable();
  private apiUrl = 'http://localhost:54044/api/Users/currency/';  // URL to web
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  setUserId(id:number)
  {
    localStorage.setItem('userId',id.toString());
    this.loginAnnouncedSource.next(id);
  }

  getUserId() :string
  {
    return localStorage.getItem('userId');
  }

  isUserLogIn():boolean{
    let userid = localStorage.getItem('userId');
    if(userid==null || userid.length==0 || userid=="-1")
    {
      return false;
    }
    else{
      return true;
    }
  }

  getUserCurrency() {
    return this.http.get(this.apiUrl + this.getUserId(),{responseType:"text"}).toPromise();
  }

}
