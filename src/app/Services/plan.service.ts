import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Plan} from "../Models/plan";
import {UserInfoService} from "./user-id.service";

@Injectable()
export class PlanService {

  private apiUrl = 'http://localhost:54044/api/plans/';  // URL to web
  private apiUrlId = 'http://localhost:54044/api/plans/id/';  // URL to web api
  private apiDetailsUrl = 'http://localhost:54044/api/plans/details/';  // URL to web api
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private userId : string;

  private response : any;

  constructor(private http: HttpClient,
              private userService: UserInfoService) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  createPlan(plan:Plan) {
    let body = "{" +
      "\"Amount\":\"" + plan.Amount + "\","+
      "\"StartDate\":\"" + plan.StartDate.toLocaleDateString() + "\","+
      "\"EndDate\":\"" + plan.EndDate.toLocaleDateString() + "\","+
      "}";
    return this.http.post(this.apiUrl+this.userService.getUserId(),body,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

  getPlanById(id:number)
  {
    return this.http.get(this.apiUrlId+this.userService.getUserId()+ "/"+ id);
  }

  getPlan()
  {
    return this.http.get(this.apiUrl+this.userService.getUserId()+ "/"+ new Date().toLocaleDateString());
  }

  getPlanStatistics(id:number) {
    return this.http.get(this.apiUrl+"summary/"+this.userService.getUserId() + "/"+id+"/")
      .toPromise()
      .catch(this.handleError);
  }

  getPlanWithDetails(id:number) {
    return this.http.get(this.apiDetailsUrl+this.userService.getUserId()+ "/"+ id);
  }

  editPlan(plan: any) {
    return this.http.put(this.apiUrl+this.userService.getUserId()+ "/"+plan.id,plan).toPromise();
  }

  getPlans() {
    return this.http.get(this.apiUrl+this.userService.getUserId());
  }

  removePlan(id:number) {
    return this.http.delete(this.apiUrl+this.userService.getUserId()+ "/"+id);
  }
}
