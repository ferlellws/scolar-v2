import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementsRoutingModule } from './managements-routing.module';
import { ManagementsComponent } from './managements.component';


@NgModule({
  declarations: [ManagementsComponent],
  imports: [
    CommonModule,
    ManagementsRoutingModule
  ]
})
export class ManagementsModule { }
