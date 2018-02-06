import {Component, Inject, OnInit} from '@angular/core';
import {UserInfoService} from "../Services/user-id.service";
import {Router} from "@angular/router";
import {PasswordService} from "../Services/password.service";
import {PasswordChange} from "../Models/password-change";
import {SelectItem} from "primeng/primeng";
import {CurrenciesService} from "../Services/currencies.service";
import {AccountService} from "../Services/account.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {categoryNameValidator} from "../Validators/category-validators";
import {passwordValueValidator, rePasswordValidator} from "../Validators/password-validators";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public currencies: SelectItem[];
  public themes: SelectItem[];
  public languages: SelectItem[];
  public language:string;
  public theme:string;
  public currency:string;
  public passwordChange: PasswordChange;
  public width:number;
  public height:number;
  public passwordDialogDisplay:boolean;
  public currencyDialogDisplay: boolean;

  public oldPasswordName:FormControl;
  public newPasswordName:FormControl;
  public reNewPasswordName:FormControl;
  public passwordForm: FormGroup;


  constructor(private userService:UserInfoService,
              private accountService: AccountService,
              private passwordService: PasswordService,
              private router:Router,
              private currenciesService:CurrenciesService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getCurrencies();
    this.getLanguages();
    this.getThemes();
    this.passwordChange = new PasswordChange();
    this.checkUser();
    this.getWidthAndHeight();
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.oldPasswordName = new FormControl('', [
      Validators.required
    ]);

    this.newPasswordName = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      passwordValueValidator()
    ]);

    this.reNewPasswordName = new FormControl('', [
      Validators.required,
      rePasswordValidator(this.newPasswordName)
    ]);
  }

  createForm(){
    this.passwordForm = new FormGroup({
      oldPassword: new FormGroup({
        oldPasswordName: this.oldPasswordName
      }),
      newPassword: new FormGroup({
        newPasswordName: this.newPasswordName
      }),
      reNewPassword: new FormGroup({
        reNewPasswordName: this.reNewPasswordName
      })
    });
  }

  checkUser()
  {
    if(!this.userService.isUserLogIn())
    {
      this.router.navigate(['/main']);
    }
  }

  private getWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  public ConfirmChangePassword() {
    this.passwordChange.newPassword = this.newPasswordName.value;
    this.passwordChange.reNewPassword = this.reNewPasswordName.value;
    this.passwordChange.oldPassword = this.oldPasswordName.value;
    this.passwordService.changePassword(this.passwordChange)
    .then(()=>{
      this.passwordChange = new PasswordChange();
      this.openPasswordSuccessDialog("account-passwordsuccess");
    })
    .catch((reason) =>{
      this.openPasswordSuccessDialog("account-passworderror");
    });

    this.reNewPasswordName.reset();
    this.newPasswordName.reset();
    this.oldPasswordName.reset();
  }

  openPasswordSuccessDialog(data:any){
    let dialogRef = this.dialog.open(PasswordChangeDialog,{
      height: '100px',
      width: '300px',
      data: data
    });
  }

  private changeCurrency() {
    this.userService.changeUserCurrency(this.currency);
  }

  private changeLanguage() {
    this.userService.changeUserLanguage(this.language);
  }

  private changeTheme() {
    this.userService.changeUserTheme(this.theme);
  }


  private getCurrencies() {
    this.currencies = this.currenciesService.getCurrencies();
    this.userService.getUserCurrency().then((response)=>this.currency = JSON.parse(response));
  }

  private getLanguages() {
    this.languages = this.accountService.getLanguages();
    this.userService.getUserLanguage().then((response)=>this.language = JSON.parse(response));
  }

  private getThemes() {
    this.themes = this.accountService.getThemes();
    this.userService.getUserTheme().then((response)=>this.theme = JSON.parse(response));
  }

  public saveAccount()
  {
    this.changeCurrency();
    this.changeTheme();
    this.changeLanguage();
  }

  getRePasswordErrorName() {
    return this.reNewPasswordName.hasError('wrongRePassword') ? 'register-repassword-error' :'';
  }

  getNewPasswordErrorName() {
    return this.newPasswordName.hasError('required') ? 'register-password-length' :
      this.newPasswordName.hasError('minlength') ? 'register-password-length' :
        this.newPasswordName.hasError('wrongPassword') ? 'register-password-chars' : '';

  }

  getOldPasswordErrorName() {
    return this.oldPasswordName.hasError('required') ? 'account-password-length' : '';

  }
}

@Component({
  selector: 'password-change-dialog',
  templateUrl: 'passwordChangeDialog.html',
})
export class PasswordChangeDialog {
  constructor(public dialogRef: MatDialogRef<PasswordChangeDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
  closeDialog() {
    this.dialogRef.close();
  }
}
