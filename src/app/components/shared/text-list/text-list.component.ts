import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'tecno-text-list',
  templateUrl: './text-list.component.html',
  styleUrls: ['./text-list.component.scss']
})
export class TextListComponent implements OnInit {

  items: string[] = [];
  inpuText = '';

  constructor(
  ) { }
  @Input() name: string = "";

  @Output() emitChange: EventEmitter<string[]> = new EventEmitter();

  ngOnInit(): void {
  }

  add(){
    this.items.push(this.inpuText);
    this.inpuText = "";
    this.emitChange.emit(this.items);
  }

  delete(index: number){
    this.items.splice(index, 1);
    this.emitChange.emit(this.items);
  }

}
