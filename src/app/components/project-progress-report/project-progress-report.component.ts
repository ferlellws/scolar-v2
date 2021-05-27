import { ProjectProgressReportService } from './../../services/project-progress-report.service';
import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { ProjectProgressReport } from 'src/app/models/project-progress-report';
import { StrategicGuidelines } from 'src/app/models/strategic-guidelines';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Actions } from 'src/app/models/actions';
import { environment } from 'src/environments/environment';
import {PageEvent} from '@angular/material/paginator';

export interface DataInitial {
  start_date: any;
  externalCompanyStates: any;
  externalCompanySchedules: any;
  strategicGuidelines: StrategicGuidelines[]
}
@Component({
  selector: 'tecno-project-progress-report',
  templateUrl: './project-progress-report.component.html',
  styleUrls: ['./project-progress-report.component.scss']
})
export class ProjectProgressReportComponent implements OnInit {
  actions!: Actions;

  dataProjectProgressReport!: any;
  dataInitial!: DataInitial;
  dataDeliveryStatuses!: any;
  datepipe: any;

  // MatPaginator Inputs
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 50, 100];

  constructor(
    private mainService: MainService,
    private projectProgressReport: ProjectProgressReportService,
  ) { }

  ngOnInit(): void {
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }

    this.projectProgressReport.getDataInitial()
    .subscribe((data: DataInitial) => {
      this.dataInitial = data;

      this.projectProgressReport.getDataProjectProgressReport(this.dataInitial.strategicGuidelines[0].id)
      .subscribe((data: ProjectProgressReport) => {
        this.dataProjectProgressReport = this.getFormatData(data);
      });
    });

    this.projectProgressReport.getDeliveryStatusesVisible()
    .subscribe((data: DataInitial) => {
      this.dataDeliveryStatuses = data;
      this.dataDeliveryStatuses.ecDeliveredProducts = this.dataDeliveryStatuses.ecDeliveredProducts.filter((r:any) => r.is_visible == 1);
      this.dataDeliveryStatuses.ecProductsInProgresses = this.dataDeliveryStatuses.ecProductsInProgresses.filter((r:any) => r.is_visible == 1);
      this.dataDeliveryStatuses.ecOverdueProducts = this.dataDeliveryStatuses.ecOverdueProducts.filter((r:any) => r.is_visible == 1);
      
      for (let index = 0; index < this.dataDeliveryStatuses.ecDeliveredProducts.length; index++) {
        this.dataDeliveryStatuses.ecDeliveredProducts[index].date = this.dataDeliveryStatuses.ecDeliveredProducts[index].date!.substring(0,10);
      }
      for (let index = 0; index < this.dataDeliveryStatuses.ecProductsInProgresses.length; index++) {
        this.dataDeliveryStatuses.ecProductsInProgresses[index].date = this.dataDeliveryStatuses.ecProductsInProgresses[index].date!.substring(0,10);
      }
      for (let index = 0; index < this.dataDeliveryStatuses.ecOverdueProducts.length; index++) {
        this.dataDeliveryStatuses.ecOverdueProducts[index].date = this.dataDeliveryStatuses.ecOverdueProducts[index].date!.substring(0,10);
      }
    });

    setTimeout(() => {this.mainService.hideLoading()}, 1000);
  }
  
  paginator(event: PageEvent) {
    this.projectProgressReport.getDataProjectProgressReport(this.dataInitial.strategicGuidelines[0].id)
      .subscribe((data: ProjectProgressReport) => {
        this.dataProjectProgressReport = this.getFormatData(data);
      });
  }

  getToStringDate(date: any): string {
    if (date == '' || date == undefined || date == null){
      return '';
    }
    if (date + "" != "Invalid Date" ){
      let d!: Date;
      try {
        d = new Date(date);
      } catch {
        d = new Date();
      } finally {
          return `${this.datepipe.transform( d, 'yyyy-MM-dd')}`;
      }
    } else {
      return "";
    }
  }

  onTabChanged(event: MatTabChangeEvent) {
    this.projectProgressReport.getDataProjectProgressReport(this.dataInitial.strategicGuidelines[event.index].id)
      .subscribe((data: ProjectProgressReport) => {
        this.dataProjectProgressReport = this.getFormatData(data);
      });
  }

  getFormatData(dataReport: ProjectProgressReport): any {
    let dataTable: any;

    dataTable = {
      strategicGuideline: dataReport.strategicGuideline,
      dataChart: []
    }
    dataReport.dataChart.forEach((data: any) => {
      dataTable.dataChart.push([
        data.projectName,
        data.textBox,
        data.color,
        data.statusDetail == "" ? null : `<div style='margin: 10px; font-size: 1.2em;'><strong>Detalle de Estado: </strong> ${data.statusDetail} </div>`,
        new Date(data.startDate.year, data.startDate.month, data.startDate.day),
        new Date(data.dueDate.year, data.dueDate.month, data.dueDate.day)
      ])

    });
    return dataTable;
  }

}
