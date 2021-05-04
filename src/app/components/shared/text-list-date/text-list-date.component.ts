import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'tecno-text-list-date',
  templateUrl: './text-list-date.component.html',
  styleUrls: ['./text-list-date.component.scss']
})
export class TextListDateComponent implements OnInit {

  @Input() items: any[] = [];
  @Input() name: string = "";
  @Input() titleClass: string = "txt-primary";
  @Input() placeHolderText: string = "";
  @Input() placeHolderDate: string = "";
  @Output() emitChange: EventEmitter<any[]> = new EventEmitter();
  
  inpuText = '';
  datePicker: any;  
  
  constructor(
    public datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    for (let index = 0; index < this.items.length; index++) {
      this.items[index].date = this.getToStringDate(new Date(`${(this.items[index].date).substring(0,10)}:00:00`));
    }
  }

  add(){
    this.items.push({
      description: this.inpuText,
      date: this.getToStringDate((`${(this.datePicker)}`))
    });
      //date: `${this.datePicker.getDate()}-${this.datePicker.getMonth()}-${this.datePicker.getFullYear()}`});
    this.inpuText = "";
    this.datePicker = null;
    this.emitChange.emit(this.items);    
  }

  delete(index: number){
    this.items.splice(index, 1);
    this.emitChange.emit(this.items);
  }

  getToStringDate(date: any): string {
    if (date == '' || date == undefined || date == null){
      return '';
    }
    if (date + "" != "Invalid Date" ){
      let d!: Date;
      try {
        d = new Date(date);
      } catch {
        d = new Date();
      } finally {
          return `${this.datepipe.transform( d, 'dd-MM-yyyy')}`;
      }
    } else {
      return "";
    }
  }

}
