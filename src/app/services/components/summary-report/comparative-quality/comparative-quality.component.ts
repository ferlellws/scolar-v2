import { Component, Input, OnInit } from '@angular/core';
import { SummaryReportService } from 'src/app/services/summary-report/summary-report.service';

export interface TableData {
  headers: string[];
  data_table: any;
}
@Component({
  selector: 'tecno-comparative-quality',
  templateUrl: './comparative-quality.component.html',
  styleUrls: ['./comparative-quality.component.scss']
})
export class ComparativeQualityComponent implements OnInit {

  @Input() multi_chart1: any[];
  @Input() table1: TableData;
  view: any[];

  // options
  chartOptions = {
    chart1: {
      legend: true,
      showLabels: true,
      animations: true,
      xAxis: true,
      yAxis: true,
      showYAxisLabel: false,
      showXAxisLabel: true,
      xAxisLabel: '',
      yAxisLabel: '',
      legendTitle: '',
      timeline: false,
      legendPosition: 'below'
    }
  }

  colorScheme = {
    chart1: {
      domain: ['#2196f3', '#f44336', '#ffc107', '#4caf50']
    }
  };

  totals: any[];
  data1: any[];
  data2: any[];
  buttons: any;

  ngOnInit(): void {

    this.buttons = [
      { name: "1A", color: "accent", value: "q_year" },
      { name: "6M", color: "", value: "q_six_month" },
      { name: "4M", color: "", value: "q_four_month" },
      { name: "3M", color: "", value: "q_three_month" },
      { name: "1M", color: "", value: "q_one_month" },
      { name: "15D", color: "", value: "q_fifteen_days" },
    ];

    console.log("data",this.table1);
    
  }

  constructor(private _summaryReportService: SummaryReportService) {  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
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

    this._summaryReportService.getComparativeQualityIndicators(objDate)
      .subscribe(data => {
        this.multi_chart1 = data.comparative_quality.graphic_comparative_quality_indicators;
        this.table1 = data.comparative_quality.data_table_comparative_quality;
      });
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
        (dateTo.getFullYear()),
        dateTo.getMonth()-11,
        dateTo.getDate()
      );
    }

    var objDate = {
      reception_date_from: this.getToStringDate(dateFrom),
      reception_date_to: this.getToStringDate(dateTo)
    }

    this._summaryReportService.getComparativeQualityIndicators(objDate)
      .subscribe(data => {        
        this.multi_chart1 = data.comparative_quality.graphic_comparative_quality_indicators;
        this.table1 = data.comparative_quality.data_table_comparative_quality;
      });

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