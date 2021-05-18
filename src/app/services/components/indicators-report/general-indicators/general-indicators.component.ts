import { Component, Input, OnInit } from '@angular/core';
import { PieChartsComponent } from 'src/app/components/shared/google-charts/pie-charts/pie-charts.component';
import { TableData } from 'src/app/models/table-data';
import { IndicatorsReportService } from 'src/app/services/indicators-report/indicators-report.service';
import { ColumnChartsComponent } from '../../shared/google-charts/column-charts/column-charts.component';

@Component({
  selector: 'tecno-general-indicators',
  templateUrl: './general-indicators.component.html',
  styleUrls: ['./general-indicators.component.scss']
})
export class GeneralIndicatorsComponent implements OnInit {
  @Input() generalDevelopersIndicators: any;
  @Input() generalIndicatorsHoursDevelopers: any;
  @Input() generalIndicatorsReturns: any;
  dataPrueba: TableData;

  percentagesData: any [];
  percentagesDataPie: any [] = [];
  returnsPieData: any [];
  data: (string | number)[][];

  buttons:any;

  constructor(
    private _indicatorsReportService: IndicatorsReportService
  ) { }

  ngOnInit(): void {

    this.buttons = [
      { name: "1A", color: "accent", value: "q_year" },
      { name: "6M", color: "", value: "q_six_month" },
      { name: "4M", color: "", value: "q_four_month" },
      { name: "3M", color: "", value: "q_three_month" },
      { name: "1M", color: "", value: "q_one_month" },
      { name: "15D", color: "", value: "q_fifteen_days" },
    ];

    this.percentagesDataPie =  PieChartsComponent.footerToDataChart(this.generalDevelopersIndicators);
    this.returnsPieData = PieChartsComponent.footerToDataChart(this.generalIndicatorsReturns);
    this.data = ColumnChartsComponent.TableToChart(this.generalIndicatorsHoursDevelopers, ['estimated_hours', 'hours_worked']);
  }

  onFilterDateEvent(rangeDate, graph: string) {
    console.log(rangeDate);
    console.log(graph);
    
    var dateFrom = rangeDate[0];
    var dateTo = rangeDate[1];

    var objDate = {
      reception_date_from: dateFrom,
      reception_date_to: dateTo
    }

    if (graph == `generalDevelopersIndicators`) {
      this._indicatorsReportService.getGeneralDevelopersIndicators(objDate)
      .subscribe(data => {
        this.generalDevelopersIndicators = data.generalDevelopersIndicators;
        this.percentagesDataPie =  PieChartsComponent.footerToDataChart(data.generalDevelopersIndicators);
      });
    }

    if (graph == `generalIndicatorsHoursDevelopers`) {
      this._indicatorsReportService.getGeneralIndicatorsHoursDevelopers(objDate)
      .subscribe(data => {
        console.log(data);
        this.generalIndicatorsHoursDevelopers = data.generalIndicatorsHoursDevelopers;
        this.data = ColumnChartsComponent.TableToChart(data.generalIndicatorsHoursDevelopers, ['estimated_hours', 'hours_worked']);
      });
    }

    if (graph == `generalIndicatorsReturns`) {
      this._indicatorsReportService.getGeneralIndicatorsReturns(objDate)
      .subscribe(data => {
        console.log(data);
        this.generalIndicatorsReturns = data.generalIndicatorsHoursDevelopers;
        this.returnsPieData = PieChartsComponent.footerToDataChart(data.generalIndicatorsHoursDevelopers);
      });
    }

  }

  onFilterButtonEvent(buttonValue: string, graph: string) {
    console.log(buttonValue);
    console.log(graph);
    
    var dateFrom, dateTo;
    dateTo = new Date();

    if(buttonValue == "q_fifteen_days"){
      dateFrom = new Date(
      dateTo.getFullYear(),
      dateTo.getMonth(),
      (dateTo.getDate()-15)
      );
      console.log("fechaaaa",dateTo);
      console.log("fechaaaaFrom",dateFrom);

    } else if(buttonValue == "q_one_month"){
        dateFrom = new Date(
        dateTo.getFullYear(),
        (dateTo.getMonth()-1),
        dateTo.getDate()
      );
    } else if(buttonValue == "q_three_month"){
        dateFrom = new Date(
        dateTo.getFullYear(),
        (dateTo.getMonth()-3),
        dateTo.getDate()
      );
    } else if(buttonValue == "q_four_month") {
        dateFrom = new Date(
        dateTo.getFullYear(),
        (dateTo.getMonth()-4),
        dateTo.getDate()
      );
    } else if(buttonValue == "q_six_month") {
        dateFrom = new Date(
        dateTo.getFullYear(),
        (dateTo.getMonth()-6),
        dateTo.getDate()
      );
    } else if(buttonValue == "q_year") {
        dateFrom = new Date(
        (dateTo.getFullYear()-1),
        dateTo.getMonth(),
        dateTo.getDate()
      );
    }

    var objDate = {
      reception_date_from: this.getToStringDate(dateFrom),
      reception_date_to: this.getToStringDate(dateTo)
    }

    if (graph == `generalDevelopersIndicators`) {
      this._indicatorsReportService.getGeneralDevelopersIndicators(objDate)
      .subscribe(data => {
        this.generalDevelopersIndicators = data.generalDevelopersIndicators;
        this.percentagesDataPie =  PieChartsComponent.footerToDataChart(data.generalDevelopersIndicators);
      });
    }

    if (graph == `generalIndicatorsHoursDevelopers`) {
      this._indicatorsReportService.getGeneralIndicatorsHoursDevelopers(objDate)
      .subscribe(data => {
        console.log(data);
        this.generalIndicatorsHoursDevelopers = data.generalIndicatorsHoursDevelopers;
        this.data = ColumnChartsComponent.TableToChart(data.generalIndicatorsHoursDevelopers, ['estimated_hours', 'hours_worked']);
      });
    }

    if (graph == `generalIndicatorsReturns`) {
      this._indicatorsReportService.getGeneralIndicatorsReturns(objDate)
      .subscribe(data => {
        console.log(data);
        this.generalIndicatorsReturns = data.generalIndicatorsHoursDevelopers;
        this.returnsPieData = PieChartsComponent.footerToDataChart(data.generalIndicatorsHoursDevelopers);
      });
    }
    

    this.buttons.forEach(element => {
      if(element.value == buttonValue){
        element.color = "accent";        
      }
      else{
        element.color = "";
      }
    });
  
  }

  getToStringDate(date: Date){
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  }

}
