import { Component, OnInit } from '@angular/core';
import {PlanService} from "../Services/plan.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Location} from "@angular/common";
import {UserInfoService} from "../Services/user-id.service";

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrls: ['./plan-edit.component.css']
})
export class PlanEditComponent implements OnInit {

  private canEdit: boolean;
  private isDataLoaded: boolean;
  private plan: any;
  private currentPlan: any;

  constructor(
    private planService: PlanService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserInfoService) { }

  ngOnInit() {
    this.checkUser();
    this.route.paramMap
    .switchMap((params: ParamMap) => this.planService.getPlanById(+params.get('id')))
    .subscribe((plan) => {
      this.plan = plan;
      this.planService.getPlan().subscribe((response)=>{
        this.currentPlan = response;
        if(this.currentPlan!=null)
        {
          if(this.currentPlan.id !=this.plan.id)
          {
            this.canEdit = false;
          }
          else
          {
            this.plan.startDate = new Date(this.plan.startDate);
            this.plan.endDate = new Date(this.plan.endDate);
            this.canEdit = true;
          }
          this.isDataLoaded = true;
        }
      });
    });
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
  }

  goToDetails() {
    this.router.navigate(['/plan-details',this.plan.id]);
  }

  onSave() {
    this.plan.startDate = new Date(this.plan.startDate).toLocaleDateString();
    this.plan.endDate = new Date(this.plan.endDate).toLocaleDateString();
    console.log(this.plan);
    this.planService.editPlan(this.plan).subscribe(()=>{
      this.goToDetails();
    })
  }
}
