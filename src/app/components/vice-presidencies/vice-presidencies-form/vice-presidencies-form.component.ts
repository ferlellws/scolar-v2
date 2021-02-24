import { VicePresidency } from './../../../models/vice-presidency';
import { VicePresidenciesService } from 'src/app/services/vice-presidencies.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-vice-presidencies-form',
  templateUrl: './vice-presidencies-form.component.html',
  styleUrls: ['./vice-presidencies-form.component.scss']
})
export class VicePresidenciesFormComponent implements OnInit {
  showBtnClose: boolean = true;
  vicePresidenciesGroup!: FormGroup;
  pluralOption: string = "vicepresidencias";
  singularOption: string = "vicepresidencia";
  isButtonReset: boolean = false;

  selectManagers!: User [];
  fButtonDisabled: boolean = false;

  vicePresidency!: VicePresidency;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private vicePresidenciesService: VicePresidenciesService,
    private usersService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    environment.consoleMessage(this.data, "++++++++++");
    this.vicePresidenciesGroup = this.fb.group({
      title: [null, Validators.required],
      description: null,
      manager_id: [null, Validators.required],
      is_active: true
    });

    await this.getSelectManagers();
    if (this.data.mode == 'edit') {

      this.vicePresidenciesService.getVicePresidenciesId(this.data.id)
        .subscribe((res: VicePresidency) => {
          this.vicePresidency = res;
          this.vicePresidenciesGroup.patchValue({
            title: this.vicePresidency.title,
            description: this.vicePresidency.description,
            manager_id: this.vicePresidency.manager_id,
            is_active: this.vicePresidency.is_active
          });
        });
    }
  }

  onSubmit() {
    environment.consoleMessage(this.vicePresidenciesGroup, "OnSubmit vicepresidencias: ");
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
    this.vicePresidenciesGroup.patchValue({
      title: null,
      description: null,
      manager_id: null,
      is_active: true
    });
  }

  createRegister() {
    environment.consoleMessage(this.vicePresidenciesGroup.value, "createRegister: ");
    this.vicePresidenciesService.addVicePresidency(this.vicePresidenciesGroup.value)
      .subscribe((res) => {
        environment.consoleMessage(res, "<<<<<<<<>>>>>>");
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
          environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
      });
  }

  updateRegister() {
    // this.vicePresidenciesGroup.patchValue({
    //   title: "Hola"
    // });
    environment.consoleMessage(this.vicePresidenciesGroup, `updateRegister para registro con id ${this.data.id}: `);

    // this.fButtonDisabled = true;
    this.vicePresidenciesService.updateVicePresidencyId(
      this.vicePresidenciesGroup.value,
      this.data.id
    )
      .subscribe((res) => {
        environment.consoleMessage(res, "<<<<<<<<>>>>>>");
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
          environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
      });
  }

  onClickSelectManager() {
    environment.consoleMessage("", "Cargar info de managers");
    this.getSelectManagers();
  }

  getSelectManagers() {
    this.usersService.getManagers()
      .subscribe((res: User []) => this.selectManagers = res);
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

}
