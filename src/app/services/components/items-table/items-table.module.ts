import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ItemsTableComponent } from './items-table.component';
import { ItemsTableRoutingModule } from './items-table-routing.module';

const materialModules = [
  MatGridListModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatTableModule,
  MatInputModule,
  MatPaginatorModule,
  MatCardModule,
  MatIconModule
];

@NgModule({
  declarations: [ItemsTableComponent],
  imports: [
    CommonModule,
    materialModules,
    ScrollingModule,
    ReactiveFormsModule,
    ItemsTableRoutingModule
  ],
  exports: [
    materialModules,
    ScrollingModule,
    ReactiveFormsModule
  ]
})
export class ItemsTableModule { }
