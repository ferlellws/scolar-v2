import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// MATERIAL
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

// COMPONENTS
import { ApplicationsComponent } from './applications.component';
import { ApplicationsFormComponent } from './applications-form/applications-form.component';

// MODULES
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsResolver } from './guards-applications/applications.resolver';


const materialModels = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [
    ApplicationsComponent,
    ApplicationsFormComponent
  ],
  imports: [
    CommonModule,
    ApplicationsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    materialModels
  ],
  exports: [
    materialModels
  ],
  providers: [
    ApplicationsResolver,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class ApplicationsModule { }
