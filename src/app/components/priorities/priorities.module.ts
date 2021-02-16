import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrioritiesRoutingModule } from './priorities-routing.module';
import { PrioritiesComponent } from './priorities.component';


@NgModule({
  declarations: [PrioritiesComponent],
  imports: [
    CommonModule,
    PrioritiesRoutingModule
  ]
})
export class PrioritiesModule { }
