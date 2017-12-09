import { Component, OnInit } from '@angular/core';
import {PlanService} from "../Services/plan.service";
import {Plan} from "../Models/plan";

@Component({
  selector: 'app-plan-create',
  templateUrl: './plan-create.component.html',
  styleUrls: ['./plan-create.component.css']
})
export class PlanCreateComponent implements OnInit {

  amount : number;
  startDate: Date;
  endDate: Date;

  constructor(private planService: PlanService) { }

  ngOnInit() {

    this.amount = 0;
    this.startDate = new Date();
    this.endDate = new Date();
    this.endDate.setDate(this.endDate.getDate()+30);
  }

  create()
  {
    let plan = new Plan();
    plan.EndDate = this.endDate;
    plan.StartDate = this.startDate;
    plan.Amount = this.amount;

    this.planService.createPlan(plan);
  }

}
