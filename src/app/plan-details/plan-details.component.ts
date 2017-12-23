import { Component, OnInit } from '@angular/core';
import {PlanDetails} from '../Models/plan-details';
import {PlanService} from "../Services/plan.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css']
})
export class PlanDetailsComponent implements OnInit {

  private planDetails: any;
  private isDataLoaded: boolean;
  private canEdit: boolean;
  private responseFromService: any;
  private showRemoveDialog: boolean;

  constructor(
    private planService: PlanService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.planService.getPlanWithDetails(+params.get('id')))
      .subscribe((plan) => {
        this.planDetails = plan;
        this.checkIfThereIsPlanAlready();
        this.planDetails.startDate = new Date(this.planDetails.startDate);
        this.planDetails.endDate = new Date(this.planDetails.endDate);
        this.isDataLoaded = true;
      });
  }

  private checkIfThereIsPlanAlready() {
    this.planService.getPlan().subscribe((response)=>{
      this.responseFromService = response;
      if(this.responseFromService)
      {
        if(this.responseFromService.id == this.planDetails.id)
        {
          this.canEdit = true;
        }
        else
        {
          this.canEdit = false;
        }
      }
    });
  }

  private goEdit() {
    this.router.navigate(['/plan-edit', this.planDetails.id]);
  }

  private goToList()
  {
    this.router.navigate(['/plans']);
  }

  private onRemove()
  {
    this.showRemoveDialog = true;
  }

  private ConfirmDelete()
  {
    this.planService.removePlan(this.planDetails.id).subscribe(()=>{
      this.router.navigate(['/plans']);
    })
  }

  private CancelDelete()
  {
    this.showRemoveDialog = false;
  }
}
