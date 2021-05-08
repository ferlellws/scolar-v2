import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {

  @Input() id_phase!: any;
  @Input() id_project!: any;
  @Input() title: string = "";
  @Input() start_date: string = "";
  @Input() end_date: string = "";

  group!: FormGroup;
  flagDate: string = "asignar";

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,    
    public datepipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.group = this.fb.group({
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
    });

    if(this.start_date == "null" || this.end_date == "null") {
      this.flagDate = "asignar";
    } else {
      this.flagDate = "editar";
      this.group.get('start_date')?.setValue(new Date(this.start_date));
      this.group.get('end_date')?.setValue(new Date(this.end_date));
    }
  }

  add() {
    if(this.flagDate == "asignar") {

    }else if(this.flagDate == "editar") {

    }
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

  getMessageError(field: string, labelField: string): string {
    let message!: string;
    if (this.group.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }
    return message;
  }

}
