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
  @Input()  isUserProfile: boolean = false;

  labelDelete: string = "Enviar a papelera 2";
  deleteIcon: string = "delete"

  @Output() emitEdit: EventEmitter<number> = new EventEmitter();
  @Output() emitStatusChange: EventEmitter<any> = new EventEmitter();
  @Output() emitDelete: EventEmitter<any> = new EventEmitter();
  @Output() emitDeleteLogic: EventEmitter<any> = new EventEmitter();

  fCheckOption: boolean = false;
  public cdRef!: ChangeDetectorRef;

  showFooter!: boolean;
  displayedColumns!: string [];
  dataSource =  new MatTableDataSource<any>();
  footer: any;
  render: boolean = false;

  constructor() {

   }

   ngOnInit(): void {
    console.log("ObjData Dynamic",this.objectsData);
    this.updateTable();    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.objectsData = changes.objectsData.currentValue;
    this.updateTable();
    environment.consoleMessage(this.objectsData, "On change");
  }

  updateTable() {
    if(this.objectsData.dataTable.length == 0) {
      this.render = false;
    } else {
      this.render = true;
    }
    environment.consoleMessage(`${this.isUserProfile}`)
    if (this.isUserProfile) {
      this.labelDelete = "Eliminar definitivamente";
      this.deleteIcon = "delete_forever";
    } else {
      this.labelDelete = "Enviar a papelera";
      this.deleteIcon = "delete";
    }
    this.displayedColumns = Object.keys(this.objectsData.dataTable[0]);
    this.dataSource.data = this.objectsData.dataTable;
    this.footer = this.objectsData.footer;
    this.showFooter = this.footer != null;
  }

  onEdit(id: number) {
    this.emitEdit.emit(id);
  }

  onDelete(id: number) {
    this.emitDelete.emit(id);
  }

  onDeleteLogic(id: number) {
    this.emitDeleteLogic.emit(id);
  }

  onClickStatus($event: MatSlideToggleChange, id: number) {
    // environment.consoleMessage(value, "value: ");
    // environment.consoleMessage(id, "id: ");
    let value: boolean = $event.checked;
    this.fCheckOption = value;
    this.changeCheckInDataTable(value, id);

    // this.objectsData.dataTable.find((row, index) => {
    //             if (row.idForOptions === id) {
    //               this.objectsData.dataTable[index].checkOption = value;
    //             }
    //           });
    // environment.consoleMessage(this.objectsData, "onClickStatus: ");

  }

  changeCheckInDataTable(value: boolean, id: number) {
    this.objectsData.dataTable.find((e, index) => {
        if (e.idForOptions === id) {
          this.objectsData.dataTable[index].checkOption = value;
        }
      }
    );

    this.emitStatusChange.emit({
      id: id,
      value: value
    });
  }

}
