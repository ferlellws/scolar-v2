import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatesByPhasesComponent } from './states-by-phases.component';

// MATERIAL
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

// MODULES
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatesByPhasesRoutingModule } from './states-by-phases-routing.module';
import { StatesByPhasesFormComponent } from './states-by-phases-form/states-by-phases-form.component';
import { StateByPhasesResolver } from './guards-state-by-phases/state-by-phases.resolver';

const materialModels = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [
    StatesByPhasesComponent,
    StatesByPhasesFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    StatesByPhasesRoutingModule,
    materialModels
  ],
  exports: [
    materialModels
  ],
  providers: [
    StateByPhasesResolver,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class StatesByPhasesModule { }
