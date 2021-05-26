import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

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
  @Input() disableEdit: boolean = false;
  @Input() mode: string = "create";
  @Output() emitChange: EventEmitter<any[]> = new EventEmitter();
  
  id_reg: any;
  i_pos: any;
  clickEdit: boolean = false;
  deleteColor: string = "#f44336"

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
    let pos = this.i_pos;
    
    if(typeof this.id_reg == 'number') {
      this.items.push({
        id: this.items[pos].id,
        description: this.inpuText,
        date: this.datePicker,
        edit: true
      });
      this.items.splice(pos, 1);
      this.id_reg = null;
      this.i_pos = null;
    } else if (pos != null && typeof this.id_reg != 'number')  {
      this.items.push({
        id: null,
        description: this.inpuText,
        date: this.datePicker
      });
      this.items.splice(pos, 1);
      this.id_reg = null;
      this.i_pos = null;
    } else {
      this.items.push({
        id: null,
        description: this.inpuText,
        date: this.datePicker
      });
    }

    this.inpuText = "";
    this.datePicker = null;
    this.clickEdit = false;
    this.deleteColor = "#f44336"
    this.emitChange.emit(this.items);    
  }

  edit(id: number, i: number) {
    this.clickEdit = true;
    this.deleteColor = "#bdbdbd";

    this.id_reg = id;
    this.i_pos = i;
    this.inpuText = this.items[i].description;

    if(typeof this.items[i].date == 'object') {
      let day = this.getToStringDate(this.items[i].date).split("-")[0];
      let month = this.getToStringDate(this.items[i].date).split("-")[1];
      let year = this.getToStringDate(this.items[i].date).split("-")[2];
      let date = new Date(`${(year + "-" + month + "-" + day)}:00:00`)
      this.datePicker = date
    } else {
      let day = `${this.items[i].date.substring(0,10)}:00:00`.split("-")[0];
      let month = `${this.items[i].date.substring(0,10)}:00:00`.split("-")[1];
      let year = `${this.items[i].date.substring(0,10)}`.split("-")[2];
      let date = new Date(`${(day + "-" + month + "-" + year)}:00:00`)
      this.datePicker = date
    }
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
