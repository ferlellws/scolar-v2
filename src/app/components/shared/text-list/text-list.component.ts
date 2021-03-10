import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'tecno-text-list',
  templateUrl: './text-list.component.html',
  styleUrls: ['./text-list.component.scss']
})
export class TextListComponent implements OnInit {

  @Input() items: string[] = [];
  inpuText = '';

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  @Input() name: string = "";
  @Input() titleClass: string = "txt-primary";
  @Output() emitChange: EventEmitter<string[]> = new EventEmitter();

  ngOnInit(): void {
  }

  add(){
    if(this.items.includes(this.inpuText)){
      this.openSnackBar(false, `${this.name} ya contiene el elemento`, "");

    }else{
      this.items.push(this.inpuText);
      this.inpuText = "";
      this.emitChange.emit(this.items);
    }
  }

  delete(index: number){
    this.items.splice(index, 1);
    this.emitChange.emit(this.items);
  }

  openSnackBar(succes: boolean, message: string, action: string, duration: number = 3000) {
    var panelClass = "succes-snack-bar";
    if(!succes){
      panelClass  = "error-snack-bar";
    }
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }

}
