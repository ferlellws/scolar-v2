import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyType } from 'src/app/models/company-type';
import { CompanyTypesService } from 'src/app/services/company-types.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-company-types-form',
  templateUrl: './company-types-form.component.html',
  styleUrls: ['./company-types-form.component.scss']
})
export class CompanyTypesFormComponent implements OnInit {
  showBtnClose: boolean = true;
  companyTypesGroup!: FormGroup;
  pluralOption: string = "Tipos de Compañía";
  singularOption: string = "Tipo de Compañía";
  isButtonReset: boolean = false;

  fButtonDisabled: boolean = false;

  companyType!: CompanyType;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private companyTypesService: CompanyTypesService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    // environment.consoleMessage(this.data, "++++++++++");
    this.companyTypesGroup = this.fb.group({
      title: [null, Validators.required],
      description: null,
      is_active: true
    });
    if (this.data.mode == 'edit') {

      this.companyTypesService.getCompanyTypesId(this.data.id)
        .subscribe((res: CompanyType) => {
          this.companyType = res;
          this.companyTypesGroup.patchValue({
            title: this.companyType.title,
            description: this.companyType.description,            
            is_active: this.companyType.is_active
          });
        });
    }
  }
  
  onSubmit() {
    // environment.consoleMessage(this.companyTypesGroup, "OnSubmit tipo de compañias: ");
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
    this.companyTypesGroup.patchValue({
      title: null,
      description: null,

      is_active: true
    });
  }

  createRegister() {
    // environment.consoleMessage(this.companyTypesGroup.value, "createRegister: ");
    this.companyTypesService.addCompanyTypes(this.companyTypesGroup.value)
      .subscribe((res) => {
        // environment.consoleMessage(res, "<<<<<<<<>>>>>>");
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
          // environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
      });
  }

  updateRegister() {
    // environment.consoleMessage(this.companyTypesGroup, `updateRegister para registro con id ${this.data.id}: `);

    this.companyTypesService.updateCompanyTypeId(
      this.companyTypesGroup.value,
      this.data.id
    )
      .subscribe((res) => {
        // environment.consoleMessage(res, "<<<<<<<<>>>>>>");
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
          // environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
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

    if (this.companyTypesGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

}
