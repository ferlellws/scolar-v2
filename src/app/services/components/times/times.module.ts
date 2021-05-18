import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesComponent } from './times.component';
import { TimesFilterComponent } from './times-filter/times-filter.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TimesRoutingModule } from './times-routing.module';


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
  MatIconModule,
  MatPaginatorModule
];

@NgModule({
  declarations: [TimesComponent, TimesFilterComponent],
  exports: [
    materialModules,
    ScrollingModule,
    ReactiveFormsModule,
     
  ],
  imports: [
    CommonModule,
    materialModules,
    ScrollingModule,
    ReactiveFormsModule,
    TimesRoutingModule
  ]
})
export class TimesModule { }
