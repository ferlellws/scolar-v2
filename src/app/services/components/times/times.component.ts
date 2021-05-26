import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TimeTypesService } from 'src/app/services/time-types.service';
import { TimesFilterService } from 'src/app/services/times-filter.service';

@Component({
  selector: 'tecno-times',
  templateUrl: './times.component.html',
  styleUrls: ['./times.component.scss']
})
export class TimesComponent implements OnInit {

  displayedColumns: string[] = [
    'user_id',
    'date_work',
    'item_id',
    'item_title',
    'time_type',
    'description',
    'user_creates_name',
    'project_title',
    'time',
    'user_updates_name'
  ];

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
    private _timeTypesService: TimeTypesService,
    private _timesFilterService: TimesFilterService,
  ) { }

  ngOnInit(): void {

    this._timeTypesService.getTimeTypes()
      .subscribe(timeTypes => this.timeTypes = timeTypes)

    this._timesFilterService.emitFilter.
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

  getType(id: number): string{
    let result = this.timeTypes.filter(type => type.id == id)[0];
    if(result != null){
      return `${result.title}`
    }else{
      return "";
    }
  }

  getTiempo(horas, minutos): string{
    minutos = `${minutos}`;
    if(minutos.length < 2){
      minutos = `0${minutos}`;
    }
    horas = `${horas}`;
    if(horas.length < 2){
      horas = `0${horas}`;
    }
    return `${horas}:${minutos}`
  }

  download(){
    this._timesFilterService.getFilteredTimes(this.paramsDownload)
  }

  lleno(): boolean{
    return this.dataSource.data.length > 0;
  }

}
