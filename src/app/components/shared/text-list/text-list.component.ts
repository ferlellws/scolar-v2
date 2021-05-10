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
  @Input() name: string = "";
  @Input() titleClass: string = "txt-primary";
  @Input() items: any[] = [];
  @Input() disableEdit: boolean = false;
  @Input() mode: string = "create";
  @Output() emitChange: EventEmitter<string[]> = new EventEmitter();
  
  inpuText = '';

  id_reg: any;
  i_pos: any;
  clickEdit: boolean = false;
  deleteColor: string = "#f44336"

  constructor(
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  add(){
    let pos = this.i_pos;

    if(typeof this.id_reg == 'number') {
      this.items.push({
        id: this.items[pos].id,
        description: this.inpuText,
        edit: true
      });
      this.items.splice(pos, 1);
      this.id_reg = null;
      this.i_pos = null;
      this.clickEdit = false;
      this.deleteColor = "#f44336"
      this.emitChange.emit(this.items);
      this.inpuText = "";
    }else if(pos != null && typeof this.id_reg != 'number') {
      this.items.push({
        id: null,
        description: this.inpuText,
        edit: true
      });
      this.items.splice(pos, 1);
      this.id_reg = null;
      this.i_pos = null;
      this.clickEdit = false;
      this.deleteColor = "#f44336"
      this.emitChange.emit(this.items);
      this.inpuText = "";
    } else {
      if(this.items.includes(this.inpuText)){
        this.openSnackBar(false, `${this.name} ya contiene el elemento`, "");
      }else{
        this.items.push({
          id: null,
          description: this.inpuText,
        });
        this.inpuText = "";
        this.emitChange.emit(this.items);
      }
    }
  }

  edit(id: number, i: number) {
    this.clickEdit = true;
    this.deleteColor = "#bdbdbd";

    this.id_reg = id;
    this.i_pos = i;
    this.inpuText = this.items[i].description;
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
