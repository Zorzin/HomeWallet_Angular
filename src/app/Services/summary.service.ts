import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserInfoService} from './user-id.service';

@Injectable()
export class SummaryService {
  private apiUrl = 'https://homewalletapi.azurewebsites.net/api/summary/';  // URL to web api
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

  getSummaryByDates(startDate: string,endDate: string) {
    return this.http.get(this.apiUrl+this.userService.getUserId() + "/"+startDate+ "/"+endDate)
      .toPromise()
      .catch(this.handleError);
  }
}
