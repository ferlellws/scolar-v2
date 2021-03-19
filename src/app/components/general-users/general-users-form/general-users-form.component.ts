import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-general-users-form',
  templateUrl: './general-users-form.component.html',
  styleUrls: ['./general-users-form.component.scss']
})
export class GeneralUsersFormComponent implements OnInit {
  showBtnClose: boolean = true;
  
  usersGroup!: FormGroup;
  pluralOption: string = "Usuarios";
  singularOption: string = "Usuario";
  isButtonReset: boolean = false;

  //selectCompanyType!: CompanyType [];
  fButtonDisabled: boolean = false;

  user!: User;
  selectJobs!: any [];
  selectProfiles!: any [];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService,
    //private companyTypesService: CompanyTypesService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    true;//environment.consoleMessage(this.data, "++++++++++");
    this.usersGroup = this.fb.group({
      first_name: [null, Validators.required],
      last_name: [null,Validators.required],
      email: [null, [
                    Validators.required,
                    Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"),
                    Validators.email]
                  ],
      semanal_hours: [null, [
                    Validators.required,
                    Validators.max(40),
                    Validators.min(0)]
                  ],
      job_id: [null, Validators.required],
      profile_id: [null, Validators.required],
      is_active: true
    });

    //await this.getSelectCompanyTypes();
    if (this.data.mode == 'edit') {

      this.userService.getUsersId(this.data.id)
        .subscribe((res: User) => {
          this.user = res;
          this.usersGroup.patchValue({
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            email: this.user.email,
            semanal_hours: this.user.semanal_hours,
            job_id: this.user.job_id,
            profile_id: this.user.profile_id,
            is_active: this.user.is_active
          });
        });
    }
  }
  
  onSubmit() {
    true;//environment.consoleMessage(this.usersGroup, "OnSubmit compañias: ");
    if (!this.isButtonReset) {
      this.fButtonDisabled = true;
      if (this.data.mode == 'create') {
        this.createRegister();
      } else {
        this.updateRegister();
      }
    }
  }

  onReset() {
    this.isButtonReset = true;
    this.usersGroup.patchValue({
      title: null,
      description: null,
      company_type_id: null,
      is_active: true
    });
  }

  createRegister() {
    true;//environment.consoleMessage(this.usersGroup.value, "createRegister: ");
    this.userService.addUser(this.usersGroup.value)
      .subscribe((res) => {
        true;//environment.consoleMessage(res, "<<<<<<<<>>>>>>");
        this.fButtonDisabled = false;
        if (res.status == 'created') {
          this.openSnackBar(true, "Registro creado satisfactoriamente", "");
        }
      }, (err) => {
        this.fButtonDisabled = false;
        let aErrors: any[] = [];
        for(let i in err.error) {
          aErrors = aErrors.concat(err.error[i])
        }

        let sErrors: string = "";
        aErrors.forEach((err) => {
          sErrors += "- " + err + "\n";
          true;//environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
      });
  }

  updateRegister() {
    true;//environment.consoleMessage(this.usersGroup, `updateRegister para registro con id ${this.data.id}: `);

    this.userService.updateUser(
      this.usersGroup.value,
      this.data.id
    )
      .subscribe((res) => {
        true;//environment.consoleMessage(res, "<<<<<<<<>>>>>>");
        this.fButtonDisabled = false;
        if (res.status == 'updated') {
          this.openSnackBar(true, "Registro actualizado satisfactoriamente", "");
        }
      }, (err) => {
        this.fButtonDisabled = false;
        let aErrors: any[] = [];
        for(let i in err.error) {
          aErrors = aErrors.concat(err.error[i])
        }

        let sErrors: string = "";
        aErrors.forEach((err) => {
          sErrors += "- " + err + "\n";
          true;//environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
      });
  }

  onClickSelectJob() {
    //this.getSelectJobs();
  }

  getSelectJobs() {
    // this.companyTypesService.getCompaniesSelect()
    //   .subscribe((res: CompanyType []) => this.selectCompanyType = res);
  }

  onClickSelectProfile() {
    //this.getSelectJobs();
  }

  getSelectJProfiles() {
    // this.companyTypesService.getCompaniesSelect()
    //   .subscribe((res: CompanyType []) => this.selectCompanyType = res);
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

    if (this.usersGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    if(labelField == "correo") {
      if (this.usersGroup.get(field)?.errors?.pattern) {
        message = `Por favor, ingrese un ${labelField} válido`
      }
    }

    return message;
  }

}
