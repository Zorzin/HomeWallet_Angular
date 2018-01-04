import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

@Injectable()
export class UserIdService {

  private loginAnnouncedSource = new Subject<number>();

  loginAnnounced$ = this.loginAnnouncedSource.asObservable();

  constructor() {}

  setUserId(id:number)
  {
    localStorage.setItem('userId',id.toString());
    this.loginAnnouncedSource.next(id);
  }

  getUserId() :string
  {
    return localStorage.getItem('userId');
  }

}
