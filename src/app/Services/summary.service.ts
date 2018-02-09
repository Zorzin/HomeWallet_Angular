import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserInfoService} from './user-id.service';
import {ApiService} from "./api.service";

@Injectable()
export class SummaryService {

  constructor(private http: HttpClient,
              private userService: UserInfoService,
              private apiSerive: ApiService) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getDailySummaryByDate(date: string) {
    return this.http.get(this.apiSerive.getSummaryUrl()+"daily/"+this.userService.getUserId() + "/"+date)
      .toPromise()
      .catch(this.handleError);
  }

  getSummaryByDates(startDate: string,endDate: string) {
    return this.http.get(this.apiSerive.getSummaryUrl()+this.userService.getUserId() + "/"+startDate+ "/"+endDate)
      .toPromise()
      .catch(this.handleError);
  }
}
