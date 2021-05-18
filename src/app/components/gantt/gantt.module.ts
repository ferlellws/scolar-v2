import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GanttRoutingModule } from './gantt-routing.module';
import { GanttComponent } from './gantt.component';


@NgModule({
  declarations: [GanttComponent],
  imports: [
    CommonModule,
    GanttRoutingModule
  ]
})
export class GanttModule { }
