import {Component, Inject, OnInit} from '@angular/core';
import {RegisterService} from "../Services/register.service";
import {UserInfoService} from "../Services/user-id.service";
import {UserRegister} from "../Models/user-register";
import {Router} from "@angular/router";
import {SelectItem} from "primeng/primeng";
import {CurrenciesService} from "../Services/currencies.service";
import {AccountService} from "../Services/account.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserLogin} from "../Models/user-login";
import {emailNameValidator, loginNameValidator} from "../Validators/register-validators";
import {LoginService} from "../Services/login.service";
import {passwordValueValidator, rePasswordValidator} from "../Validators/password-validators";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private themes: SelectItem[];
  private languages: SelectItem[];
  private currencies: SelectItem[];
  private userObj : UserRegister;

  private emailName: FormControl;
  private loginName:FormControl;
  private passwordName:FormControl;
  private rePasswordName:FormControl;
  private currencyValue:FormControl;
  private themeValue:FormControl;
  private languageValue:FormControl;
  private registerForm: FormGroup;

  constructor(private registerService: RegisterService,
              private accountService: AccountService,
              private userIdService: UserInfoService,
              private router: Router,
              private currenciesService: CurrenciesService,
              private loginService:LoginService) { }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
    this.getCurrencies();
    this.getThemes();
    this.getLanguages();
    this.userObj = new UserRegister();
  }

  createFormControls() {
    this.loginName = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      loginNameValidator(this.loginService)
    ]);

    this.passwordName = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      passwordValueValidator()
    ]);

    this.rePasswordName = new FormControl('', [
      Validators.required,
      rePasswordValidator(this.passwordName)
    ]);

    this.emailName = new FormControl('', [
      Validators.required,
      emailNameValidator(this.loginService)
    ]);

    this.currencyValue = new FormControl('', [
      Validators.required,
    ]);

    this.themeValue = new FormControl('', [
      Validators.required,
    ]);

    this.languageValue = new FormControl('', [
      Validators.required,
    ]);
  }

  createForm(){
    this.registerForm = new FormGroup({ //email, repassword, currency, theme, language
      login: new FormGroup({
        loginName: this.loginName
      }),
      password: new FormGroup({
        passwordName: this.passwordName
      }),
      email: new FormGroup({
        emailName: this.emailName
      }),
      repassword: new FormGroup({
        rePasswordName: this.rePasswordName
      }),
      currency: new FormGroup({
        currencyValue: this.currencyValue
      }),
      theme: new FormGroup({
        themeValue: this.themeValue
      }),
      language: new FormGroup({
        languageValue: this.languageValue
      })
    });
  }

  onRegister()
  {
    this.userObj.currency = this.currencyValue.value;
    this.userObj.email = this.emailName.value;
    this.userObj.language = this.languageValue.value;
    this.userObj.login = this.loginName.value;
    this.userObj.password = this.passwordName.value;
    this.userObj.repassword= this.rePasswordName.value;
    this.userObj.theme = this.themeValue.value;
    this.registerService.register(this.userObj).then((response)=>{
      this.userIdService.setUserId(parseInt(response,10));
      this.userIdService.changeUserLanguage(this.userObj.language);
      this.router.navigate(['/receipts']);
    })
      .catch(reason => this.ShowErrorModal())
  }

  onLogin()
  {
    this.router.navigate(['/login']);
  }


  private getCurrencies() {
    this.currencies = this.currenciesService.getCurrencies();
  }

  private getThemes() {
    this.themes = this.accountService.getThemes();
  }

  private getLanguages() {
    this.languages = this.accountService.getLanguages();
  }

  GetEmailErrorName() {
    return this.emailName.hasError('forbiddenEmail') ? 'register-email-forbidden' :
      this.emailName.hasError('notEmail') ? 'register-email-notemail' :
        this.emailName.hasError('required') ? 'register-email-length' : '';
  }

  GetPasswordErrorName() {
    return this.passwordName.hasError('required') ? 'register-password-length' :
      this.passwordName.hasError('minlength') ? 'register-password-length' :
        this.passwordName.hasError('wrongPassword') ? 'register-password-chars' : '';
  }

  GetRePasswordErrorName() {
    return this.rePasswordName.hasError('wrongRePassword') ? 'register-repassword-error' : '';
  }

  GetLoginErrorName(){
    return this.loginName.hasError('forbiddenName') ? 'register-login-forbidden' :
      this.loginName.hasError('minlength') ? 'register-login-length' :
        this.loginName.hasError('required') ? 'register-login-length' : '';
  }

  private ShowErrorModal() {

  }
}



@Component({
  selector: 'register-error-dialog',
  templateUrl: 'registerErrorDialog.html',
})
export class RegisterErrorDialog {
  constructor(public dialogRef: MatDialogRef<RegisterErrorDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}
  closeDialog() {
    this.dialogRef.close();
  }
}
