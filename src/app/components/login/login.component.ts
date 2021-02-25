import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MainService } from 'src/app/services/main.service';
import { TokenService } from 'src/app/services/security/token.service';

@Component({
  selector: 'tecno-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInGroup: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  errorFlag: boolean = false;
  flagRememberUser: boolean = false;
  flagShowPass: boolean = false;
  disabledButton: boolean = false;

  user!: User;
  emailToRemember: string = "";

  constructor(
    private _tokenService: TokenService,
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private mainService: MainService
  ) {
    // this.logInGroup = this.fb.group({
    //   hideRequired: this.hideRequiredControl,
    //   floatLabel: this.floatLabelControl,
    //   'emailControl': "",
    //   'passControl': "",
    // });

    // Se borra userToken del local storage
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    // Se verifica si existe sesion abierta
    this.authService.getToken();

    if (localStorage.getItem("emailUser")) {
      this.emailToRemember = localStorage.getItem("emailUser") || '';
      this.flagRememberUser = true;
    }

    this.logInGroup = this.fb.group({
      // hideRequired: this.hideRequiredControl,
      // floatLabel: this.floatLabelControl,
      email: [
        this.emailToRemember, [
          Validators.required,
          Validators.pattern(
            "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
          ),
          Validators.email
        ]
      ],
      password: [null, Validators.required],
      checkRemember: this.flagRememberUser
    });

  }

  ngOnInit(): void {
    this.mainService.hideLoading();



    // this.logInGroup = new FormGroup({
    //   email: new FormControl(this.emailToRemember),
    //   password: new FormControl(null)
    // });

    // this.logInGroup = this.fb.group({
    //   hideRequired: this.hideRequiredControl,
    //   floatLabel: this.floatLabelControl,
    //   'emailControl': [],
    //   'passControl': [],
    // });

  }

  changeChecked(flagRememberUser: any) {
    console.log(flagRememberUser);

  }

  onLogin() {
    this.disabledButton = true;
    this.user = this.logInGroup.value;
    this.flagRememberUser = this.logInGroup.value.checkRemember;
    console.log(">>>>>>>>>>>>>>>>>>>", this.logInGroup.get('email'));
    this.mainService.showLoading();
    this.authService.onLogin(this.user)
      .subscribe((res: any) => {
        console.log({res});
        this.mainService.hideLoading();
        this.openSnackBar(true, res.messages, "");
        console.log(this.flagRememberUser);

        if (this.flagRememberUser) {
          localStorage.setItem("emailUser", this.user.email);
        }
        this.disabledButton = false;
        this.logInGroup.reset();
      }, (err) => {
        // SI HAY UN ERROR
        let message: string = "";

        this.disabledButton = false;

        if (err.error.messages) {
          message = err.error.messages;
        } else {
          message = err.message;
        }
        this.openSnackBar(false, message, "");
        console.error(err);
      });
  }

  openSnackBar(succes: boolean, message: string, action: string, duration: number = 3000) {
    var panelClass = "succes-snack-bar";
    if(!succes){
      panelClass  = "error-snack-bar";
    }
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }

  getMessageError(field: string, labelField: string): string {
    let message!: string;
    if (this.logInGroup.get(field)?.errors?.pattern) {
      message = `Por favor, ingrese ${labelField} válido`
    }

    if (this.logInGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

}
