import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// COMPONENTS
import { CompanyTypesComponent } from './company-types.component';
import { CompanyTypesFormComponent } from './company-types-form/company-types-form.component';

// MATERIAL
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

// MODULES
import { CompanyTypesRoutingModule } from './company-types-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyTypesResolver } from './guards-company-types/company-types.resolver';

const materialModels = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [
    CompanyTypesComponent,
    CompanyTypesFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CompanyTypesRoutingModule,
    materialModels
  ],
  exports: [
    materialModels
  ],
  providers: [
    CompanyTypesResolver,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class CompanyTypesModule { }
