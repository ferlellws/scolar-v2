import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoGephiRoutingModule } from './demo-gephi-routing.module';
import { DemoGephiComponent } from './demo-gephi.component';


@NgModule({
  declarations: [DemoGephiComponent],
  imports: [
    CommonModule,
    DemoGephiRoutingModule
  ]
})
export class DemoGephiModule { }
