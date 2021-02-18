import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableData } from 'src/app/models/table-data';

@Component({
  selector: 'tecno-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {

  @Input() objectsData!: TableData;
  @Input() headerClass!: string;
  @Input() footerClass!: string;
  @Input() headerTextColor!: string;
  @Input() footerTextColor!: string;
  @Input() customId!: string;

  @Output() emittEdit: EventEmitter<boolean> = new EventEmitter();

  showFooter!: boolean;
  displayedColumns!: string [];
  dataSource =  new MatTableDataSource<any>();
  footer: any;
  constructor() { }

  ngOnInit(): void {
    this.displayedColumns = Object.keys(this.objectsData.dataTable[0]);
    this.dataSource.data = this.objectsData.dataTable;
    this.footer = this.objectsData.footer;
    this.showFooter = this.footer != null;

    if(this.headerClass == null || this.headerClass == ''){
      this.headerClass = 'bg-primary';
    }
    if(this.footerClass == null || this.footerClass == ''){
      this.footerClass = 'bg-primary';
    }
    if(this.footerTextColor == null || this.footerTextColor == ''){
      this.footerTextColor = 'white';
    }
    if(this.headerTextColor == null || this.headerTextColor == ''){
      this.headerTextColor = 'white';
    }
    if(this.customId == null || this.customId == ''){
      this.customId = 'dynamic_table';
    }
  }

  onEdit() {
    this.emittEdit.emit(true);
  }

}
