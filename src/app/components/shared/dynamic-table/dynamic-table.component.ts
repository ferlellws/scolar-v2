import { environment } from 'src/environments/environment';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TableData } from 'src/app/models/table-data';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'tecno-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTableComponent implements OnInit {

  @Input()  objectsData!: TableData;
  @Input()  headerClass: string = 'bg-primary';
  @Input()  footerClass: string = 'bg-primary';
  @Input()  headerTextColor: string = 'white';
  @Input()  footerTextColor: string = 'white';
  @Input()  customId: string = 'dynamic_table';
  @Input()  maxHeight: string = '1000px';

  @Output() emittEdit: EventEmitter<boolean> = new EventEmitter();

  fCheckOption: boolean = false;
  public cdRef!: ChangeDetectorRef;

  showFooter!: boolean;
  displayedColumns!: string [];
  dataSource =  new MatTableDataSource<any>();
  footer: any;
  constructor() {

   }

   ngOnInit(): void {
    console.log("ObjData Dynamic",this.objectsData);
    this.updateTable();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.objectsData = changes.objectsData.currentValue;
    this.updateTable();
    environment.consoleMessage("on change", "");
  }

  updateTable() {
    this.displayedColumns = Object.keys(this.objectsData.dataTable[0]);
    this.dataSource.data = this.objectsData.dataTable;
    this.footer = this.objectsData.footer;
    this.showFooter = this.footer != null;
  }

  onEdit() {
    this.emittEdit.emit(true);
  }

  onClickStatus($event: MatSlideToggleChange, id: number) {
    // environment.consoleMessage(value, "value: ");
    // environment.consoleMessage(id, "id: ");
    let value: boolean = $event.checked;
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
    //this.cdRef.detectChanges;
    //console.log(this.objectsData.dataTable[i]);
    return value;
  }

}
