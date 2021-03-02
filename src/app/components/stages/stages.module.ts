import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { StagesComponent } from './stages.component';
import { StagesFormComponent } from './stages-form/stages-form.component';


// MATERIAL
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

// MODULES
import { StagesRoutingModule } from './stages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StagesResolver } from './guards-stages/stages.resolver';

const materialModels = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [
    StagesComponent,
    StagesFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StagesRoutingModule,
    materialModels
  ],
  exports: [
    materialModels
  ],
  providers: [
    StagesResolver,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class StagesModule { }
