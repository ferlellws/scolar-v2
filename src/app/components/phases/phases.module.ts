import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

// COMPONENTS
import { PhasesComponent } from './phases.component';
import { PhasesFormComponent } from './phases-form/phases-form.component';

// MODULES
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhasesRoutingModule } from './phases-routing.module';
import { PhasesResolver } from './guards-phases/phases.resolver';


const materialModels = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [
    PhasesComponent,
    PhasesFormComponent
  ],
  imports: [
    CommonModule,
    PhasesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    materialModels
  ],
  exports: [
    materialModels
  ],
  providers: [
    PhasesResolver,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class PhasesModule { }
