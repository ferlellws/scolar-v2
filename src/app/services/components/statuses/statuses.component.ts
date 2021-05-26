import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemHistoriesFilterService } from 'src/app/services/items/item-histories-filter.service';
import { TimeTypesService } from 'src/app/services/time-types.service';
import { TimesFilterService } from 'src/app/services/times-filter.service';

@Component({
  selector: 'tecno-statuses',
  templateUrl: './statuses.component.html',
  styleUrls: ['./statuses.component.scss']
})
export class StatusesComponent implements OnInit {

  displayedColumns: string[] = [ 'item_id', 'item_title', 'item_status', 'date_change', 'project_title', 'user_updates_name'];
  dataSource =  new MatTableDataSource<any>(); ;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    mp._intl.itemsPerPageLabel = 'Elementos en pantalla:';
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;  
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  datos: any[] = [];
  timeTypes: any[];
  paramsDownload: any;

  constructor(
    private _itemHistoriesFilterService: ItemHistoriesFilterService,
  ) { }

  ngOnInit(): void {

    this._itemHistoriesFilterService.emitFilter.
      subscribe((filteredData: any) =>
      {
        var data = [];
        for (let index = 0; index < filteredData.data.length; index++) {
          data.push(filteredData.data[index]);
        }
        this.dataSource.data = data;
        this.paramsDownload = filteredData.params;
        this.paramsDownload.format = 'excel';
      });
  }

  download(){
    this._itemHistoriesFilterService.getFilteredStatus(this.paramsDownload)
  }

  lleno(): boolean{
    return this.dataSource.data.length > 0;
  }


}
