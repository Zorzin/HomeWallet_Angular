import { Component, OnInit } from '@angular/core';
import {PlanService} from "../Services/plan.service";
import {Plan} from "../Models/plan";
import {Router} from "@angular/router";
import {isUndefined} from "util";
import {UserInfoService} from "../Services/user-id.service";

@Component({
  selector: 'app-plan-create',
  templateUrl: './plan-create.component.html',
  styleUrls: ['./plan-create.component.css']
})
export class PlanCreateComponent implements OnInit {

  amount : number;
  startDate: Date;
  endDate: Date;
  private responseFromService: object;
  private canCreate: boolean;

  constructor(
    private planService: PlanService,
    private router: Router,
    private userService: UserInfoService) { }

  ngOnInit() {

    this.checkUser();
    this.checkIfThereIsPlanAlready();

    this.amount = 0;
    this.startDate = new Date();
    this.endDate = new Date();
    this.endDate.setDate(this.endDate.getDate()+30);
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
  }

  create()
  {
    let plan = new Plan();
    plan.EndDate = this.endDate;
    plan.StartDate = this.startDate;
    plan.Amount = this.amount;

    this.planService.createPlan(plan);
  }

  private checkIfThereIsPlanAlready() {
    this.planService.getPlan().subscribe((response)=>{
      this.responseFromService = response;
      if(this.responseFromService)
      {
        this.canCreate = false;
      }
      else
      {
        this.canCreate = true;
      }
    });
  }

  private goToList()
  {
    this.router.navigate(['/plans']);
  }
}
