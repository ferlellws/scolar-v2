import { Component, Input, OnInit } from '@angular/core';
import { SummaryReportService } from 'src/app/services/summary-report/summary-report.service';

export interface TableData {
  headers: string[];
  data_table: any;
}
@Component({
  selector: 'tecno-evolution-performance-indicators',
  templateUrl: './evolution-performance-indicators.component.html',
  styleUrls: ['./evolution-performance-indicators.component.scss']
})
export class EvolutionPerformanceIndicatorsComponent implements OnInit {

  @Input() multi_chart1: any[];
  @Input() multi_chartOnTime: any[];
  @Input() multi_chartCalidad: any[];
  @Input() multi_chartGestion: any[];
  @Input() table1: TableData;
  view: any[];

  // options
  chartOptions = {
    chart1: {
      legend: true,
      legendPosition: 'below',
      showLabels: true,
      animations: true,
      xAxis: true,
      yAxis: true,
      showYAxisLabel: false,
      showXAxisLabel: true,
      xAxisLabel: '',
      yAxisLabel: '',
      legendTitle: '',
      timeline: true,
    },
    chart2: {
      legend: true,
      legendPosition: 'below',
      showLabels: true,
      animations: true,
      xAxis: true,
      yAxis: true,
      showYAxisLabel: false,
      showXAxisLabel: true,
      xAxisLabel: '',
      yAxisLabel: '',
      legendTitle: '',
      timeline: true,
    },
    chart3: {
      legend: true,
      legendPosition: 'below',
      showLabels: true,
      animations: true,
      xAxis: true,
      yAxis: true,
      showYAxisLabel: false,
      showXAxisLabel: true,
      xAxisLabel: '',
      yAxisLabel: '',
      legendTitle: '',
      timeline: true,
    },
    chartTable: {
      xAxisLabel: 'Evolución Indicadores de Desempeño',
    }
  }

  colorScheme = {
    chart1: {
      domain: ['#2196f3']
    },
    chart2: {
      domain: ['#f44336']
    },
    chart3: {
      domain: ['#ffc107']
    }
  };

  totals: any[];
  data1: any[];
  buttons: any;

  ngOnInit(): void {

    this.buttons = [
      { name: "1A", color: "accent", value: "q_year" }, //arreglo tpf172
      { name: "6M", color: "", value: "q_six_month" },
      { name: "4M", color: "", value: "q_four_month" },
      { name: "3M", color: "", value: "q_three_month" },
      { name: "1M", color: "", value: "q_one_month" },
      { name: "15D", color: "", value: "q_fifteen_days" },
    ];

    this.multi_chartOnTime = JSON.parse("["+JSON.stringify(this.multi_chart1[0])+"]");
    this.multi_chartCalidad = JSON.parse("["+JSON.stringify(this.multi_chart1[1])+"]");
    this.multi_chartGestion = JSON.parse("["+JSON.stringify(this.multi_chart1[2])+"]");
    
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

    this._summaryReportService.getEvolutionPerformanceIndicators(objDate)
      .subscribe(data => {
        this.multi_chart1 = data.evolutionPerformanceIndicators.graphic_evolution_performance_indicators;
        this.table1 = data.evolutionPerformanceIndicators.data_table_evolution_performance_indicators;
        this.multi_chartOnTime = JSON.parse("["+JSON.stringify(this.multi_chart1[0])+"]");
        this.multi_chartCalidad = JSON.parse("["+JSON.stringify(this.multi_chart1[1])+"]");
        this.multi_chartGestion = JSON.parse("["+JSON.stringify(this.multi_chart1[2])+"]");

        /*
        var gestion = data.evolutionPerformanceIndicators.graphic_evolution_performance_indicators.filter(gestion => gestion.name == "Gestion")[0];

        for (let index = 0; index < gestion.series.length; index++) {
          gestion.series[index].value = (gestion.series[index].value)*20 + 200;
        }
        */
        
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

    this._summaryReportService.getEvolutionPerformanceIndicators(objDate)
      .subscribe(data => {        
        this.multi_chart1 = data.evolutionPerformanceIndicators.graphic_evolution_performance_indicators;
        this.table1 = data.evolutionPerformanceIndicators.data_table_evolution_performance_indicators;
        this.multi_chartOnTime = JSON.parse("["+JSON.stringify(this.multi_chart1[0])+"]");
        this.multi_chartCalidad = JSON.parse("["+JSON.stringify(this.multi_chart1[1])+"]");
        this.multi_chartGestion = JSON.parse("["+JSON.stringify(this.multi_chart1[2])+"]");
        
        /*var gestion = data.evolutionPerformanceIndicators.graphic_evolution_performance_indicators.filter(gestion => gestion.name == "Gestion")[0];
        console.log("GESTION",gestion);
        
        for (let index = 0; index < gestion.series.length; index++) {
          gestion.series[index].value = (gestion.series[index].value)*20 + 200;
        }

        */
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