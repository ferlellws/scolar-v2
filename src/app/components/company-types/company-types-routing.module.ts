import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyTypesComponent } from './company-types.component';

const routes: Routes = [{ path: '', component: CompanyTypesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyTypesRoutingModule { }
