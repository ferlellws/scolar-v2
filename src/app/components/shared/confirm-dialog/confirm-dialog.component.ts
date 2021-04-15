import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertDialog } from 'src/app/models/alert-dialog';

@Component({
  selector: 'tecno-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  title!: any;
  description!: any;
  value!: any;
  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertDialog) { }

  ngOnInit(): void {
    this.title = this.data.title;
    this.description = this.data.info;
  }

  onNoClick() {
    this.emitClose.emit('no');
  }

  onSiClick() {
    this.emitClose.emit('si');
  }
}
