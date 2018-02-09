import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Plan} from "../Models/plan";
import {UserInfoService} from "./user-id.service";
import {ApiService} from "./api.service";

@Injectable()
export class PlanService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private userService: UserInfoService,
              private apiSerive: ApiService) { }

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
    return this.http.post(this.apiSerive.getPlansUrl()+this.userService.getUserId(),body,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

  getPlanById(id:number)
  {
    return this.http.get(this.apiSerive.getPlansIdUrl()+this.userService.getUserId()+ "/"+ id);
  }

  getPlan()
  {
    return this.http.get(this.apiSerive.getPlansUrl()+this.userService.getUserId()+ "/"+ new Date().toLocaleDateString());
  }

  getPlanStatistics(id:number) {
    return this.http.get(this.apiSerive.getPlansUrl()+"summary/"+this.userService.getUserId() + "/"+id+"/")
      .toPromise()
      .catch(this.handleError);
  }

  getPlanWithDetails(id:number) {
    return this.http.get(this.apiSerive.getPlansDetailsUrl()+this.userService.getUserId()+ "/"+ id);
  }

  editPlan(plan: any) {
    return this.http.put(this.apiSerive.getPlansUrl()+this.userService.getUserId()+ "/"+plan.id,plan).toPromise();
  }

  getPlans() {
    return this.http.get(this.apiSerive.getPlansUrl()+this.userService.getUserId());
  }

  removePlan(id:number) {
    return this.http.delete(this.apiSerive.getPlansUrl()+this.userService.getUserId()+ "/"+id);
  }
}
