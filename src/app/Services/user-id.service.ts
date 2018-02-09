import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ApiService} from "./api.service";

@Injectable()
export class UserInfoService {

  private loginAnnouncedSource = new Subject<number>();
  private themeAnnouncedSource = new Subject<string>();
  private langAnnouncedSource = new Subject<string>();

  loginAnnounced$ = this.loginAnnouncedSource.asObservable();
  languageAnnounced$ = this.langAnnouncedSource.asObservable();
  themeAnnounced$ = this.themeAnnouncedSource.asObservable();
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private apiSerive: ApiService) { }

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
    return this.http.get(this.apiSerive.getUsersUrl()+"currency/" + this.getUserId(),{responseType:"text"}).toPromise();
  }

  getUserTheme() {
    return this.http.get(this.apiSerive.getUsersUrl()+"theme/" + this.getUserId(),{responseType:"text"})
      .toPromise();
  }

  getUserLanguage() {
    return this.http.get(this.apiSerive.getUsersUrl()+"language/" + this.getUserId(),{responseType:"text"}).toPromise();
  }

  changeUserCurrency(currency: string) {
    return this.http.post(this.apiSerive.getUsersUrl()+"currency/"+this.getUserId()+"/"+currency,null,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

  changeUserTheme(theme: string) {
    return this.http.post(this.apiSerive.getUsersUrl()+"theme/"+this.getUserId()+"/"+theme,null,{headers:this.headers,responseType: 'text' })
      .toPromise().then(()=>{
        this.themeAnnouncedSource.next(theme);
      });
  }

  changeUserLanguage(language: string) {
    return this.http.post(this.apiSerive.getUsersUrl()+"language/"+this.getUserId()+"/"+language,null,{headers:this.headers,responseType: 'text' })
      .toPromise().then(()=>{
        localStorage.setItem('lang',language);
        this.langAnnouncedSource.next(language);
      });
  }
}
