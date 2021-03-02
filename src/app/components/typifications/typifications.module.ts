import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { TypificationsComponent } from './typifications.component';
import { TypificationsFormComponent } from './typifications-form/typifications-form.component';

// MATERIAL
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

// MODULES
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypificationsRoutingModule } from './typifications-routing.module';
import { TypificationsResolver } from './guards-typifications/typifications.resolver';

const materialModels = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [
    TypificationsComponent,
    TypificationsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TypificationsRoutingModule,
    materialModels
  ],
  exports: [
    materialModels
  ],
  providers: [
    TypificationsResolver,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ]
})
export class TypificationsModule { }
