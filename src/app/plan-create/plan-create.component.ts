import {Component, Inject, OnInit} from '@angular/core';
import {PlanService} from "../Services/plan.service";
import {Plan} from "../Models/plan";
import {Router} from "@angular/router";
import {isUndefined} from "util";
import {UserInfoService} from "../Services/user-id.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {endDateValidator} from "../Validators/plan-validators";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {PasswordChangeDialog} from "../account/account.component";

@Component({
  selector: 'app-plan-create',
  templateUrl: './plan-create.component.html',
  styleUrls: ['./plan-create.component.css']
})
export class PlanCreateComponent implements OnInit {

  private responseFromService: object;
  private canCreate: boolean;

  private amountValue: FormControl;
  private startDateValue:FormControl;
  private endDateValue:FormControl;
  private createPlanForm: FormGroup;

  constructor(
    private planService: PlanService,
    private router: Router,
    private userService: UserInfoService,
    public dialog: MatDialog) { }

  ngOnInit() {


    this.createFormControls();
    this.createForm();
    this.amountValue.setValue(1);
    this.startDateValue.setValue(new Date());
    let endDate = new Date();
    endDate.setDate(endDate.getDate()+30);
    this.endDateValue.setValue(endDate);
    this.checkUser();
    this.checkIfThereIsPlanAlready();
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
    this.createPlanForm = new FormGroup({ //email, repassword, currency, theme, language
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

  create()
  {
    let plan = new Plan();
    plan.EndDate = this.endDateValue.value;
    plan.StartDate = this.startDateValue.value;
    plan.Amount = this.amountValue.value;

    this.planService.createPlan(plan)
      .then((response)=>{
        this.goToList();
      })
      .catch(reason => this.openDialog("plan-error"));
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


  openDialog(data:any){
    let dialogRef = this.dialog.open(PlanErrorDialog,{
      height: '100px',
      width: '300px',
      data: data
    });
  }

  private goToList()
  {
    this.router.navigate(['/plans']);
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


@Component({
  selector: 'plan-error-dialog',
  templateUrl: 'planErrorDialog.html',
})
export class PlanErrorDialog {
  constructor(public dialogRef: MatDialogRef<PlanErrorDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
  closeDialog() {
    this.dialogRef.close();
  }
}
