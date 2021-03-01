import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// COMPONENTS
import { PrioritiesComponent } from './priorities.component';
import { PrioritiesFormComponent } from './priorities-form/priorities-form.component';

// MATERIAL
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

// MODULES
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrioritiesRoutingModule } from './priorities-routing.module';
import { PrioritiesResolver } from './guards-priorities/priorities.resolver';

const materialModels = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [
    PrioritiesComponent,
    PrioritiesFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PrioritiesRoutingModule,
    materialModels
  ],
  exports: [
    materialModels
  ],
  providers: [
    PrioritiesResolver,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class PrioritiesModule { }
