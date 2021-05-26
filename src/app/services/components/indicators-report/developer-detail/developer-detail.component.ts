import { Component, Input, OnInit } from '@angular/core';
import { IndicatorsReportService } from 'src/app/services/indicators-report/indicators-report.service';
import { ColumnChartsComponent } from '../../shared/google-charts/column-charts/column-charts.component';
import { PieChartsComponent } from '../../shared/google-charts/pie-charts/pie-charts.component';

@Component({
  selector: 'tecno-developer-detail',
  templateUrl: './developer-detail.component.html',
  styleUrls: ['./developer-detail.component.scss']
})
export class DeveloperDetailComponent implements OnInit {

  @Input() devId;
  indicators: any; 
  indicatorsPie: any;
  indicatorsLateColumn: any;

  hours: any;
  hoursColumn:any;

  returns: any;
  returnsColumn: any;
  returnsPie: any;

  constructor(
    private _indicatorsReportService: IndicatorsReportService
  ) { }

  ngOnInit(): void {
    console.log(this.devId);
    this.indicators = this._indicatorsReportService.getIndividualDevelopersIndicators(this.devId);
    this.indicatorsPie =  PieChartsComponent.footerToDataChart(this.indicators);
    this.indicatorsLateColumn = ColumnChartsComponent.TableToChart(this.indicators, ['items_late_count']);

    this.hours = this._indicatorsReportService.getIndividualDevelopersHours(this.devId);
    this.hoursColumn = ColumnChartsComponent.TableToChart(this.hours, ['estimated_hours', 'hours_worked']);

    this.returns = this._indicatorsReportService.getIndividualDeveloperReturns(this.devId);
    this.returnsColumn = ColumnChartsComponent.TableToChart(this.returns);
    this.returnsPie =  PieChartsComponent.footerToDataChart(this.returns);
  }

}
