import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyTypesRoutingModule } from './company-types-routing.module';
import { CompanyTypesComponent } from './company-types.component';


@NgModule({
  declarations: [CompanyTypesComponent],
  imports: [
    CommonModule,
    CompanyTypesRoutingModule
  ]
})
export class CompanyTypesModule { }
