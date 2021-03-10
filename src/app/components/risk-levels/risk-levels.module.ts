import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//COMPONENTS
import { RiskLevelsComponent } from './risk-levels.component';

// MATERIAL
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

//MODULES
import { RiskLevelsRoutingModule } from './risk-levels-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RiskLevelsFormComponent } from './risk-levels-form/risk-levels-form.component';
import { RiskLevelsResolver } from './guards-managements/risk-levels.resolver';

const materialModels = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [
    RiskLevelsComponent,
    RiskLevelsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RiskLevelsRoutingModule,
    materialModels
  ],
  exports: [
    materialModels
  ],
  providers: [
    RiskLevelsResolver,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class RiskLevelsModule { }
