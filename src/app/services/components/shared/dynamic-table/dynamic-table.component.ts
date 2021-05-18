import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SingleSeries } from '@swimlane/ngx-charts';
import { TableData } from 'src/app/models/table-data';

@Component({
  selector: 'tecno-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {

  @Input()  objectsData: TableData;
  @Input()  headerClass: string = 'bg-primary';
  @Input()  footerClass: string = 'bg-primary';
  @Input()  headerTextColor: string = 'white';
  @Input()  footerTextColor: string = 'white';
  @Input()  customId: string = 'dynamic_table';
  @Input()  maxHeight: string = '1000px';

  showFooter: boolean;
  displayedColumns: string [];
  dataSource =  new MatTableDataSource<any>();
  footer: any;

  constructor() { }

  ngOnInit(): void {
    console.log("ObjData Dynamic",this.objectsData);
    
    this.displayedColumns = Object.keys(this.objectsData.dataTable[0]);
    this.dataSource.data = this.objectsData.dataTable;
    this.footer = this.objectsData.footer;
    this.showFooter = this.footer != null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.objectsData = changes.objectsData.currentValue;
    this.displayedColumns = Object.keys(this.objectsData.dataTable[0]);
    this.dataSource.data = this.objectsData.dataTable;
    this.footer = this.objectsData.footer;
    this.showFooter = this.footer != null;
  }

}
