import { Component, OnInit, Input } from '@angular/core';
import { SummaryReportService } from 'src/app/services/summary-report/summary-report.service';

export interface TableData {
  headers: string[];
  data_table: any;
}

@Component({
  selector: 'tecno-opportunity-behavior',
  templateUrl: './opportunity-behavior.component.html',
  styleUrls: ['./opportunity-behavior.component.scss']
})

export class OpportunityBehaviorComponent implements OnInit {
  @Input() multi_chart1: any[];
  view: any[];

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
      domain: ['#4caf50']
    }
  };

  displayedColumns1: string[];
  displayedColumns2: string[];
  columnsToDisplay1: string[];
  columnsToDisplay2: string[];
  totals: any[];
  data1: any[];
  data2: any[];
  buttons: any;

  constructor(private _summaryReportService: SummaryReportService) { }

  ngOnInit(): void {
    // this.getDataTable2(this.table2);

    this.buttons = [
      { name: "1A", color: "", value: "q_year" },
      { name: "6M", color: "", value: "q_six_month" },
      { name: "4M", color: "accent", value: "q_four_month" },
      { name: "3M", color: "", value: "q_three_month" },
      { name: "1M", color: "", value: "q_one_month" },
      { name: "15D", color: "", value: "q_fifteen_days" },
    ];
  }
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

    this._summaryReportService.getOpportunityBehavior(objDate)
      .subscribe(data => {
        this.multi_chart1 = data.delivery_oportunity.management_unit_behavior_graph;
      });

    this.buttons.forEach(element => {
      element.color = "";
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

    this._summaryReportService.getOpportunityBehavior(objDate)
      .subscribe(data => {        
        this.multi_chart1 = data.delivery_oportunity.management_unit_behavior_graph;
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