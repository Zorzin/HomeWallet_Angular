import { Component, OnInit } from '@angular/core';
import {PlanDetails} from '../Models/plan-details';
import {PlanService} from "../Services/plan.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Location} from "@angular/common";
import {UserInfoService} from "../Services/user-id.service";
import {DeleteDialogComponent} from "../dialogs/delete-dialog/delete-dialog.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css']
})
export class PlanDetailsComponent implements OnInit {

  public width:number;
  public height:number;
  public planDetails: any;
  public isDataLoaded: boolean;
  public canEdit: boolean;
  public responseFromService: any;
  public summary : any;
  public currency : string;

  public eachCategoriesSpentXLabel = 'plandetails-eachCategoriesSpentXLabel';
  public eachCategoriesSpentYLabel = 'plandetails-eachCategoriesSpentYLabel';
  public view: any[] = [500, 400];
  public scheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(
    private planService: PlanService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserInfoService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getWidthAndHeight();
    this.checkUser();
    this.route.paramMap
      .switchMap((params: ParamMap) => this.planService.getPlanWithDetails(+params.get('id')))
      .subscribe((plan) => {
        this.planDetails = plan;
        this.checkIfThereIsPlanAlready();
        this.planDetails.startDate = new Date(this.planDetails.startDate);
        this.planDetails.endDate = new Date(this.planDetails.endDate);
        this.GetCurrency();
        this.GetStatistics();
      });
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

  Delete()
  {
    let dialogRef = this.dialog.open(DeleteDialogComponent,{
      height: this.height.toString(),
      width: this.width.toString(),
      data: { content: 'plandetails-yousure',header:'plandetails-delete'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.ConfirmDelete();
      }
    });
  }

  ConfirmDelete()
  {
    this.planService.removePlan(this.planDetails.id).subscribe(()=>{
      this.router.navigate(['/plans']);
    });
  }

  private getWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  private GetStatistics() {
    this.planService.getPlanStatistics(this.planDetails.id).then((response)=>{
      this.summary = response;
      this.isDataLoaded = true;
    });
  }

  private GetCurrency() {
    this.userService.getUserCurrency().then((response)=>this.currency = JSON.parse(response));
  }
}
