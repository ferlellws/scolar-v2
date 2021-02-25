import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

// COMPONENTS
import { VicePresidenciesComponent } from './vice-presidencies.component';

// MODULES
import { SharedModule } from '../shared/shared.module';
import { VicePresidenciesRoutingModule } from './vice-presidencies-routing.module';
import { VicePresidenciesFormComponent } from './vice-presidencies-form/vice-presidencies-form.component';
import { VicePresidenciesResolver } from './guards/vice-presidencies.resolver';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const materialModels = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [
    VicePresidenciesComponent,
    VicePresidenciesFormComponent
  ],
  imports: [
    CommonModule,
    VicePresidenciesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    materialModels
  ],
  exports: [
    materialModels
  ],
  providers: [
    VicePresidenciesResolver,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class VicePresidenciesModule { }
