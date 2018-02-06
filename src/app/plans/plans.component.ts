import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlanService} from "../Services/plan.service";
import {UserInfoService} from "../Services/user-id.service";

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  public plans: any;
  public isDataLoaded: boolean;
  public canCreate: boolean;
  public responseFromService: object;

  constructor(
    private planService: PlanService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserInfoService) { }

  ngOnInit() {
    this.checkUser();
    this.planService.getPlans().subscribe((response)=>{
      this.checkIfThereIsPlanAlready();
      this.plans = response;
      for(let plan of this.plans)
      {
        plan.startDate = new Date(plan.startDate).toLocaleDateString();
        plan.endDate = new Date(plan.endDate).toLocaleDateString();
      }
      this.isDataLoaded = true;
    })
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
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

  goToDetails(id:number)
  {
    this.router.navigate(['/plan-details',id]);
  }

  Create()
  {
    this.router.navigate(['/plan-create']);
  }

}
