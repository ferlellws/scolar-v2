import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

// COMPONENTS
import { StatesComponent } from './states.component';
import { StatesFormComponent } from './states-form/states-form.component';

// MODULES
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatesRoutingModule } from './states-routing.module';
import { StatesResolver } from './guards-states/states.resolver';


const materialModels = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [
    StatesComponent,
    StatesFormComponent
  ],
  imports: [
    CommonModule,
    StatesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    materialModels
  ],
  exports: [
    materialModels
  ],
  providers: [
    StatesResolver,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class StatesModule { }
