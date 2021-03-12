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
  @Output() emitChange: EventEmitter<any[]> = new EventEmitter();
  
  inpuText = '';
  datePicker: any;  
  
  constructor(
  ) { }

  ngOnInit(): void {
  }

  add(){
    this.items.push({
      description: this.inpuText,
      date: `${this.datePicker.getDate()}-${this.datePicker.getMonth()}-${this.datePicker.getFullYear()}`});
    this.inpuText = "";
    this.datePicker = null;
    this.emitChange.emit(this.items);    
  }

  delete(index: number){
    this.items.splice(index, 1);
    this.emitChange.emit(this.items);
  }

}
