import { Component, OnInit } from '@angular/core';
import {PlanService} from "../Services/plan.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Location} from "@angular/common";
import {UserInfoService} from "../Services/user-id.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordValueValidator, rePasswordValidator} from "../Validators/password-validators";
import {emailNameValidator, loginNameValidator} from "../Validators/register-validators";
import {endDateValidator} from "../Validators/plan-validators";
import {PlanErrorDialog} from "../plan-create/plan-create.component";
import {MatDialog} from "@angular/material";

@Component({
  selector: 'app-plan-edit',
  templateUrl: './plan-edit.component.html',
  styleUrls: ['./plan-edit.component.css']
})
export class PlanEditComponent implements OnInit {

  public canEdit: boolean;
  public isDataLoaded: boolean;
  public plan: any;
  public currentPlan: any;

  public amountValue: FormControl;
  public startDateValue:FormControl;
  public endDateValue:FormControl;
  public editForm: FormGroup;

  constructor(
    private planService: PlanService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserInfoService,
    public  dialog: MatDialog) { }

  ngOnInit() {
    this.checkUser();
    this.GetCurrentPlan();
    this.createFormControls();
    this.createForm();
  }

  GetCurrentPlan(){
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
              this.startDateValue.setValue(new Date(this.plan.startDate));
              this.endDateValue.setValue(new Date(this.plan.endDate));
              this.amountValue.setValue(this.plan.amount);
              this.canEdit = true;
            }
            this.isDataLoaded = true;
          }
        });
      });
  }


  createFormControls() {
    this.amountValue = new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]);

    this.startDateValue = new FormControl('', [
      Validators.required,
    ]);

    this.endDateValue = new FormControl('', [
      Validators.required,
      endDateValidator(this.startDateValue)
    ]);
  }

  createForm(){
    this.editForm = new FormGroup({ //email, repassword, currency, theme, language
      amount: new FormGroup({
        amountValue: this.amountValue
      }),
      startDate: new FormGroup({
        startDateValue: this.startDateValue
      }),
      endDate: new FormGroup({
        endDateValue: this.endDateValue
      }),
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
    this.plan.startDate = new Date(this.startDateValue.value).toLocaleDateString();
    this.plan.endDate = new Date(this.endDateValue.value).toLocaleDateString();
    this.plan.amount = this.amountValue.value;
    console.log(this.plan);
    this.planService.editPlan(this.plan)
      .then(()=>{
      this.goToDetails();
    })
      .catch(reason => this.openDialog("plan-error"))

  }

  openDialog(data:any){
    let dialogRef = this.dialog.open(PlanErrorDialog,{
      height: '100px',
      width: '300px',
      data: data
    });
  }

  GetEndDateErrorName() {
    return this.endDateValue.hasError('required') ? 'plan-noenddate-error' :
      this.endDateValue.hasError('wrongEndDate') ? 'plan-enddate-error' : '';
  }

  GetStartDateErrorName() {
    return this.startDateValue.hasError('required') ? 'plan-nostartdate-error' : '';
  }

  GetAmountErrorName() {
    return this.amountValue.hasError('required') ? 'plan-nomoney-error' :
      this.amountValue.hasError('min') ? 'plan-money-error' : '';
  }
}
