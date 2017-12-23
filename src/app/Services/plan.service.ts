import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Plan} from "../Models/plan";

@Injectable()
export class PlanService {

  private apiUrl = 'http://localhost:54044/api/plans/1';  // URL to web
  private apiUrlId = 'http://localhost:54044/api/plans/id/1';  // URL to web api
  private apiDetailsUrl = 'http://localhost:54044/api/plans/details/1';  // URL to web api
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private userId : string;

  private response : any;

  constructor(private http: HttpClient) { }

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
    return this.http.post(this.apiUrl,body,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

  getPlanById(id:number)
  {
    return this.http.get(this.apiUrlId+"/"+ id);
  }

  getPlan()
  {
    return this.http.get(this.apiUrl+"/"+ new Date().toLocaleDateString());
  }

  getPlanWithDetails(id:number) {
    return this.http.get(this.apiDetailsUrl+"/"+ id);
  }

  editPlan(plan: any) {
    return this.http.put(this.apiUrl+"/"+plan.id,plan);
  }

  getPlans() {
    return this.http.get(this.apiUrl);
  }

  removePlan(id:number) {
    return this.http.delete(this.apiUrl+"/"+id);
  }
}
