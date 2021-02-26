import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Company } from 'src/app/models/company';
import { CompanyType } from 'src/app/models/company-type';
import { CompaniesService } from 'src/app/services/companies.service';
import { CompanyTypesService } from 'src/app/services/company-types.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-companies-form',
  templateUrl: './companies-form.component.html',
  styleUrls: ['./companies-form.component.scss']
})
export class CompaniesFormComponent implements OnInit {
  showBtnClose: boolean = true;
  
  companiesGroup!: FormGroup;
  pluralOption: string = "Compañías";
  singularOption: string = "Compañía";
  isButtonReset: boolean = false;

  selectCompanyType!: CompanyType [];
  fButtonDisabled: boolean = false;

  company!: Company;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private companiesService: CompaniesService,
    private companyTypesService: CompanyTypesService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    environment.consoleMessage(this.data, "++++++++++");
    this.companiesGroup = this.fb.group({
      title: [null, Validators.required],
      description: null,
      company_type_id: [null, Validators.required],
      is_active: true
    });

    await this.getSelectCompanyTypes();
    if (this.data.mode == 'edit') {

      this.companiesService.getCompaniesId(this.data.id)
        .subscribe((res: Company) => {
          this.company = res;
          this.companiesGroup.patchValue({
            title: this.company.title,
            description: this.company.description,
            company_type_id: this.company.company_type_id,
            is_active: this.company.is_active
          });
        });
    }
  }
  
  onSubmit() {
    environment.consoleMessage(this.companiesGroup, "OnSubmit compañias: ");
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
    this.companiesGroup.patchValue({
      title: null,
      description: null,
      company_type_id: null,
      is_active: true
    });
  }

  createRegister() {
    environment.consoleMessage(this.companiesGroup.value, "createRegister: ");
    this.companiesService.addCompanies(this.companiesGroup.value)
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
    environment.consoleMessage(this.companiesGroup, `updateRegister para registro con id ${this.data.id}: `);

    this.companiesService.updateCompaniesId(
      this.companiesGroup.value,
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

  onClickSelectCompanyType() {
    environment.consoleMessage("", "Cargar info de managers");
    this.getSelectCompanyTypes();
  }

  getSelectCompanyTypes() {
    this.companyTypesService.getCompaniesSelect()
      .subscribe((res: CompanyType []) => this.selectCompanyType = res);
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

    if (this.companiesGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

}
