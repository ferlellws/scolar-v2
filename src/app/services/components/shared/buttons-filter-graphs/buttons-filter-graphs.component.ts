import { formatDate } from '@angular/common';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import {
//   MAT_MOMENT_DATE_FORMATS,
//   MomentDateAdapter,
//   MAT_MOMENT_DATE_ADAPTER_OPTIONS,
// } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

export interface ButtonsObject {
  name: string;
  color: string;
  value: string;
}
@Component({
  selector: 'tecno-buttons-filter-graphs',
  templateUrl: './buttons-filter-graphs.component.html',
  styleUrls: ['./buttons-filter-graphs.component.scss'],
  // providers: [
  //   // The locale would typically be provided on the root module of your application. We do it at
  //   // the component level here, due to limitations of our example generation script.
  //   {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},

  //   // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
  //   // `MatMomentDateModule` in your applications root module. We provide it at the component level
  //   // here, due to limitations of our example generation script.
  //   // {
  //   //   provide: DateAdapter,
  //   //   useClass: MomentDateAdapter,
  //   //   deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   // },
  //   // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  // ],
})
export class ButtonsFilterGraphsComponent implements OnInit {
  // INPUTS
  @Input() buttons: ButtonsObject[];
  @Input() flagShowDateForm: boolean = false;
  @Input() sTextLabel: string = 'Ingrese un rango de fecha';

  // OUTPUTS
  @Output() onFilterButtonEvent = new EventEmitter<string>();
  @Output() onFilterDateEvent = new EventEmitter<string[]>();

  aDataRange: string [] = [];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor() { }

  ngOnInit(): void {
  }

  onFilterButton(value: string) {
    this.onFilterButtonEvent.emit(value);
  }

  onFilterDate(event: MatDatepickerInputEvent<Date>, index: number) {
    if (event.value != null) {
      console.log(index);
      this.aDataRange[index] = formatDate(event.value, "yyyy-MM-dd", 'en-US');

      if (this.aDataRange.length == 2) {
        this.onFilterDateEvent.emit(this.aDataRange);
      }
    }
  }

}
