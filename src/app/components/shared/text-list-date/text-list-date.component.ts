import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'tecno-text-list-date',
  templateUrl: './text-list-date.component.html',
  styleUrls: ['./text-list-date.component.scss']
})
export class TextListDateComponent implements OnInit {

  items: any[] = [];
  inpuText = '';
  datePicker: any;
  
  constructor(
  ) { }

  @Input() name: string = "";

  @Output() emitChange: EventEmitter<any[]> = new EventEmitter();

  ngOnInit(): void {
  }

  add(){
    this.items.push({
      text: this.inpuText,
      date: `${'fecha: '}${this.datePicker.getDate()}-${this.datePicker.getMonth()}-${this.datePicker.getFullYear()}`});
    this.inpuText = "";
    this.datePicker = null;
    this.emitChange.emit(this.items);
  }

  delete(index: number){
    this.items.splice(index, 1);
    this.emitChange.emit(this.items);
  }

}
