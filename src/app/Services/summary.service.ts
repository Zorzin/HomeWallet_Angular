import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserInfoService} from './user-id.service';

@Injectable()
export class SummaryService {
  private apiUrl = 'http://localhost:54044/api/summary/';  // URL to web api
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private userService: UserInfoService) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getDailySummaryByDate(date: string) {
    return this.http.get(this.apiUrl+"daily/"+this.userService.getUserId() + "/"+date)
      .toPromise()
      .catch(this.handleError);
  }
}
