import { environment } from 'src/environments/environment';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableData } from 'src/app/models/table-data';

@Component({
  selector: 'tecno-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent implements OnInit {

  @Input() objectsData!: TableData;
  @Input() headerClass!: string;
  @Input() footerClass!: string;
  @Input() headerTextColor!: string;
  @Input() footerTextColor!: string;
  @Input() customId!: string;

  @Output() emittEdit: EventEmitter<boolean> = new EventEmitter();

  fCheckOption: boolean = false;
  public cdRef!: ChangeDetectorRef;

  showFooter!: boolean;
  displayedColumns!: string [];
  dataSource =  new MatTableDataSource<any>();
  footer: any;
  constructor(cdRef: ChangeDetectorRef,) {

   }

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

  onClickStatus(value: boolean, id: number) {
    environment.consoleMessage(value, "value: ");
    environment.consoleMessage(id, "id: ");
    this.fCheckOption = value;
    this.changeCheckInDataTable(value, id);
  }

  changeCheckInDataTable(value: boolean, id: number) {
    let i = 0;
    this.objectsData.dataTable.find((e, index) => {
        if (e.idForOptions === id) {
          this.objectsData.dataTable[index].checkOption = value;
          i = index;
        }
      }
    );
    this.cdRef.detectChanges;
    console.log(this.objectsData.dataTable[i]);
    return value;
  }

}
