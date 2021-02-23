import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { CompanyType } from 'src/app/models/company-type';
import { CompanyTypesService } from 'src/app/services/company-types.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-companies-form',
  templateUrl: './companies-form.component.html',
  styleUrls: ['./companies-form.component.scss']
})
export class CompaniesFormComponent implements OnInit {
  showBtnClose: boolean = true;
  
  companyFormGroup: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  companyTypes: CompanyType[] = [];
  company: Company = new Company;

  constructor(
  private _companyType: CompanyTypesService,
  private fcB: FormBuilder
  ) { 

  this.companyFormGroup = this.fcB.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
    'companyTypesControl': [this.company.company_type_id, [Validators.required]],
    'titleCompanyControl': [this.company.title, [Validators.required]],
    'companyDescriptionControl': [this.company.description, [Validators.required]],
  });

  this.company.company_type_id = 0;

  }

  ngOnInit(): void {
  }

  _openCompanyType(ev: boolean) {
    if (ev) {
      this._companyType.getCompanyTypesAll()
        .subscribe(_companyType => this.companyTypes = _companyType);
    }
  }

  guardar() {
    
    if (
      (this.companyFormGroup.get('companyTypesControl')!.value) == 0 ||
      (this.companyFormGroup.get('titleCompanyControl')!.value) == "" ||
      (this.companyFormGroup.get('companyDescriptionControl')!.value) == ""
    ){

    } else {
      this.company.company_type_id = this.companyFormGroup.get('companyTypesControl')!.value;
      this.company.title = this.companyFormGroup.get('titleCompanyControl')!.value;
      this.company.description = this.companyFormGroup.get('companyDescriptionControl')!.value;
    }
    
    environment.consoleMessage(this.company);
  }
}
