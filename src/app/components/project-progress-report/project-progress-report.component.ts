import { ProjectProgressReportService } from './../../services/project-progress-report.service';
import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { ProjectProgressReport } from 'src/app/models/project-progress-report';
import { StrategicGuidelines } from 'src/app/models/strategic-guidelines';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Actions } from 'src/app/models/actions';
import { environment } from 'src/environments/environment';

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
  // dataProjectProgressReport: any = [
  //   [ '1. WEB Proveedores  (TopGroup)', '', '#F44336', null, new Date(2020, 6, 5), new Date(2020, 6, 10) ],
  //   [ '1. WEB Proveedores  (TopGroup)', '', '#4472c3', null, new Date(2020, 7, 5), new Date(2020, 8, 5) ],
  //   [ '1. WEB Proveedores  (TopGroup)', '', '#3f3f3f', null, new Date(2020, 8, 6), new Date(2020, 9, 5) ],
  //   [ '1. WEB Proveedores  (TopGroup)', '', '#BDBDBD', null, new Date(2020, 9, 6), new Date(2020, 9, 20) ],
  //   [ '1. WEB Proveedores  (TopGroup)', '', '#548135', null, new Date(2020, 9, 21), new Date(2020, 10, 15) ],
  //   [ '1. WEB Proveedores  (TopGroup)', '', '#BDBDBD', null, new Date(2020, 10, 16), new Date(2020, 11, 1) ],
  //   [ '1. WEB Proveedores  (TopGroup)', '', '#3f3f3f', null, new Date(2020, 11, 2), new Date(2020, 11, 25) ],
  //   [ '1. WEB Proveedores  (TopGroup)', '', '#BDBDBD', null, new Date(2020, 11, 26), new Date(2021, 0, 25) ],
  //   [ '1. WEB Proveedores  (TopGroup)', '', '#548135', null, new Date(2021, 0, 26), new Date(2021, 1, 28) ],
  //   [ '1. WEB Proveedores  (TopGroup)', '', '#673AB7', "<div style='margin: 10px;'><strong>Detalle de Estado:</strong>Validación de nuevos reportes. Cierre a finales de Febrero. 16 proveedores en piloto 9 en factoring.</div>", new Date(2021, 8, 1), new Date(2021, 8, 7) ],

  //   [ '2. Programa Hermes - WMS', '', '#f4b083', null, new Date(2020, 7, 1), new Date(2020, 7, 15) ],
  //   [ '2. Programa Hermes - WMS', '', '#BDBDBD', null, new Date(2020, 7, 16), new Date(2020, 8, 15) ],
  //   [ '2. Programa Hermes - WMS', '', '#ffd965', null, new Date(2020, 8, 16), new Date(2020, 9, 15) ],
  //   [ '2. Programa Hermes - WMS', '', '#4472c3', null, new Date(2020, 9, 16), new Date(2021, 3, 5) ],
  //   [ '2. Programa Hermes - WMS', '', '#3f3f3f', null, new Date(2021, 3, 6), new Date(2021, 3, 31) ],
  //   [ '2. Programa Hermes - WMS', '', '#673AB7', "<div style='margin: 10px;'><strong>Detalle de Estado: </strong>Riesgo en integraciones. Se sumaron recursos para mitigarlo. Cambio de alcance integraciones Auditoria.</div>", new Date(2021, 8, 1), new Date(2021, 8, 7) ],

  //   [ '3. Programa Hermes – EDI (Fase 1, 2 y 3)', '', '#ffd965', null, new Date(2020, 8, 10), new Date(2020, 9, 15) ],
  //   [ '3. Programa Hermes – EDI (Fase 1, 2 y 3)', '', '#BDBDBD', null, new Date(2020, 9, 16), new Date(2021, 1, 28) ],
  //   [ '3. Programa Hermes – EDI (Fase 1, 2 y 3)', '', '#ffd965', null, new Date(2021, 2, 1), new Date(2021, 2, 15) ],
  //   [ '3. Programa Hermes – EDI (Fase 1, 2 y 3)', '', '#4472c3', null, new Date(2021, 2, 16), new Date(2021, 4, 25) ],
  //   [ '3. Programa Hermes – EDI (Fase 1, 2 y 3)', '', '#3f3f3f', null, new Date(2021, 4, 26), new Date(2021, 5, 31) ],
  //   [ '3. Programa Hermes – EDI (Fase 1, 2 y 3)', '', '#673AB7', "<div style='margin: 10px;'><strong>Detalle de Estado: </strong>Retraso por Contratos y estrategia de salida. Inicia Sidel este mes.</div>", new Date(2021, 8, 1), new Date(2021, 8, 7) ],

  //   [ '4. App Tiendas', '10', '#4472c3', null, new Date(2020, 7, 1), new Date(2020, 7, 31) ],
  //   [ '4. App Tiendas', '', '#548135', null, new Date(2020, 8, 1), new Date(2020, 8, 15) ],
  //   [ '4. App Tiendas', '', '#BDBDBD', null, new Date(2020, 8, 16), new Date(2020, 8, 31) ],
  //   [ '4. App Tiendas', '', '#4472c3', null, new Date(2020, 9, 1), new Date(2020, 10, 25) ],
  //   [ '4. App Tiendas', '', '#BDBDBD', null, new Date(2020, 10, 26), new Date(2020, 11, 10) ],
  //   [ '4. App Tiendas', 'Restantes', '#3f3f3f', null, new Date(2020, 11, 11), new Date(2021, 3, 15) ],
  //   [ '4. App Tiendas', '', '#673AB7', "<div style='margin: 10px;'><strong>Detalle de Estado: </strong>Proceso de entrega a soporte Operación, inicio pruebas notificaciones</div>", new Date(2021, 8, 1), new Date(2021, 8, 7) ],

  //   [ '5. Mejoramiento Wifi en tiendas', '400', '#4472c3', null, new Date(2020, 8, 1), new Date(2020, 9, 15) ],
  //   [ '5. Mejoramiento Wifi en tiendas', '', '#BDBDBD', null, new Date(2020, 10, 20), new Date(2020, 11, 15) ],
  //   [ '5. Mejoramiento Wifi en tiendas', '700', '#3f3f3f', null, new Date(2020, 11, 16), new Date(2021, 2, 15) ],
  //   [ '5. Mejoramiento Wifi en tiendas', '600 Fase 3', '#3f3f3f', null, new Date(2021, 2, 16), new Date(2021, 4, 25) ],
  //   [ '5. Mejoramiento Wifi en tiendas', '', '#673AB7', "<div style='margin: 10px;'><strong>Detalle de Estado: </strong>Falta regional Antioquia, en espera de compra de celulares.</div>", new Date(2021, 8, 1), new Date(2021, 8, 7) ],

  //   [ '6. Inventario físico en línea Tienda', '', '#f4b083', null, new Date(2020, 7, 1), new Date(2020, 8, 5) ],
  //   [ '6. Inventario físico en línea Tienda', '', '#BDBDBD', null, new Date(2020, 8, 6), new Date(2020, 8, 25) ],
  //   [ '6. Inventario físico en línea Tienda', '', '#ffd965', null, new Date(2020, 8, 26), new Date(2020, 9, 10) ],
  //   [ '6. Inventario físico en línea Tienda', '', '#BDBDBD', null, new Date(2020, 9, 11), new Date(2020, 9, 31) ],
  //   [ '6. Inventario físico en línea Tienda', '', '#4472c3', null, new Date(2020, 10, 1), new Date(2020, 10, 31) ],
  //   [ '6. Inventario físico en línea Tienda', '', '#3f3f3f', null, new Date(2020, 11, 1), new Date(2021, 0, 10) ],
  //   [ '6. Inventario físico en línea Tienda', '', '#BDBDBD', null, new Date(2021, 0, 11), new Date(2021, 0, 31) ],
  //   [ '6. Inventario físico en línea Tienda', '', '#548135', null, new Date(2021, 1, 1), new Date(2021, 1, 28) ],
  //   [ '6. Inventario físico en línea Tienda', 'Fase 2', '#4472c3', null, new Date(2021, 2, 1), new Date(2021, 2, 31) ],
  //   [ '6. Inventario físico en línea Tienda', '', '#548135', null, new Date(2021, 3, 1), new Date(2021, 3, 25) ],
  //   [ '6. Inventario físico en línea Tienda', '', '#673AB7', "<div style='margin: 10px;'><strong>Detalle de Estado: </strong>Capacitación equipos feb 9</div>", new Date(2021, 8, 1), new Date(2021, 8, 7) ],

  //   [ '7. MDM Stibo', '', '#ffd965', null, new Date(2020, 10, 1), new Date(2020, 11, 5) ],
  //   [ '7. MDM Stibo', '', '#4472c3', null, new Date(2020, 11, 6), new Date(2020, 11, 31) ],
  //   [ '7. MDM Stibo', '', '#BDBDBD', null, new Date(2021, 0, 1), new Date(2021, 1, 7) ],
  //   [ '7. MDM Stibo', '', '#4472c3', null, new Date(2021, 1, 8), new Date(2021, 1, 28) ],
  //   [ '7. MDM Stibo', '', '#3f3f3f', null, new Date(2021, 2, 1), new Date(2021, 2, 5) ],
  //   [ '7. MDM Stibo', '', '#4472c3', null, new Date(2021, 2, 6), new Date(2021, 4, 25) ],
  //   [ '7. MDM Stibo', '', '#548135', null, new Date(2021, 4, 26), new Date(2021, 5, 15) ],
  //   [ '7. MDM Stibo', '', '#673AB7', "<div style='margin: 10px;'><strong>Detalle de Estado: </strong>Marzo 29 salida en vivo dominio productos. Retraso en entrega de servidores e integración SBD (falta de capacidad)</div>", new Date(2021, 8, 1), new Date(2021, 8, 7) ],

  // ];

  dataProjectProgressReport!: any;
  dataInitial!: DataInitial;
  dataDeliveryStatuses!: any;
  datepipe: any;

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

    this.projectProgressReport.getDeliveryStatuses()
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
