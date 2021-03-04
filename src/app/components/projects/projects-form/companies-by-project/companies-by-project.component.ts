import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { CompaniesService } from 'src/app/services/companies.service';

@Component({
  selector: 'tecno-companies-by-project',
  templateUrl: './companies-by-project.component.html',
  styleUrls: ['./companies-by-project.component.scss']
})
export class CompaniesByProjectComponent implements OnInit {

  companiesForm = new FormControl();
  companies: Company[] = [];
  companiesSelected : Company[] = [];

  @Output() emitChange: EventEmitter<Company[]> = new EventEmitter();

  constructor(
    private _companiesService: CompaniesService,
  ) { }

  async ngOnInit() {
    await this._companiesService.getCompaniesSelect()
    .subscribe(companies => this.companies = companies);
  }

  onChangeSelect(){
    var selectedIDs: number [] =this.companiesForm.value;
    this.companiesSelected = this.companies.filter(company => 
      {
        var companyID: number = -1;
        if(company.id != null){
          companyID = company.id;
        }
        return selectedIDs.includes(companyID);

      });
    this.emitChange.emit(this.companiesSelected)
  } 

  remove(id: number | undefined){
    this.companiesSelected = this.companiesSelected.filter(company => company.id != id);
    var selectedIDs: number [] = this.companiesForm.value;
    this.companiesForm.setValue( selectedIDs.filter( selectedID => selectedID != id));
    this.emitChange.emit(this.companiesSelected)
  }

}
