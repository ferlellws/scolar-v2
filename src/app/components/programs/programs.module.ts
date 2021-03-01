import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MODULES
import { ProgramsRoutingModule } from './programs-routing.module';

// COMPONENTS
import { ProgramsComponent } from './programs.component';
import { ProgramsFormComponent } from './programs-form/programs-form.component';

// MATERIAL
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgramsResolver } from './guards-programs/programs.resolver';

const materialModels = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [
    ProgramsComponent,
    ProgramsFormComponent
  ],
  imports: [
    CommonModule,
    ProgramsRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    materialModels
  ],
  exports: [
    materialModels
  ],
  providers: [
    ProgramsResolver,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class ProgramsModule { }
