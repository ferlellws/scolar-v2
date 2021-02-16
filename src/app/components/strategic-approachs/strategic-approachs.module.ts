import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StrategicApproachsRoutingModule } from './strategic-approachs-routing.module';
import { StrategicApproachsComponent } from './strategic-approachs.component';


@NgModule({
  declarations: [StrategicApproachsComponent],
  imports: [
    CommonModule,
    StrategicApproachsRoutingModule
  ]
})
export class StrategicApproachsModule { }
