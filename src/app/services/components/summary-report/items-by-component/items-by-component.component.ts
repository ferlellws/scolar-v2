import { SimpleChanges } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorsService } from 'src/app/services/colors.service';
import { TotalItemsGraphService } from 'src/app/services/summary-report/total-items-graph.service';

@Component({
  selector: 'tecno-items-by-component',
  templateUrl: './items-by-component.component.html',
  styleUrls: ['./items-by-component.component.scss']
})
export class ItemsByComponentComponent implements OnInit {

  @Input() data: Array<any>;
  @Input() template_id: number;
  chartData: any[] = [];
  colors: Color[];
  colorScheme: any;
  buttons: any;

  constructor(
    private _colorsService: ColorsService,
    private _totalItemsGraphService: TotalItemsGraphService
  ) { }

  ngOnInit(): void {
    this.colors = this._colorsService.getColors();
    this.fillChart(this.template_id);

    this.buttons = [
      { name: "1A", color: "accent", value: "q_year" },
      { name: "6M", color: "", value: "q_six_month" },
      { name: "4M", color: "", value: "q_four_month" },
      { name: "3M", color: "", value: "q_three_month" },
      { name: "1M", color: "", value: "q_one_month" },
      { name: "15D", color: "", value: "q_fifteen_days" },
    ];

    console.log("items", this.data);
  }

  getColor(name: string): string {
    return this.colors.filter(color => color.name == name)[0].value;
  }

  fillChart(selected: number){
    this.chartData = [];
    var template_req = this.data[selected];
    this.colorScheme = {
      domain:[]
    }
    for (let index = 0; index < this.colors.length; index++) {
      this.colorScheme.domain.push(this.getColor(this.colors[index].name));
    }
   
    for (let index = 0; index < template_req.components.length; index++) {
      this.chartData.push(
        {
          name: template_req.components[index].component.title,
          value: template_req.components[index].percent
        }
      );
    }
    console.log("data", this.chartData);
    console.log("color", this.colorScheme);
  }

  onFilterDateEvent(rangeDate, graph: string) {
    var dateFrom = rangeDate[0];
    var dateTo = rangeDate[1];

    var objDate = {
      reception_date_from: dateFrom,
      reception_date_to: dateTo
    }

    this._totalItemsGraphService.getTotalItems(objDate)
      .subscribe(data => {
        this.data = data.items_by_component;
        this.fillChart(this.template_id);
      });
    
    this.buttons.forEach(element => {
      element.color = "";
    });
  }
  
  onFilterButtonEvent(buttonValue: string, graph: string) {
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

    this._totalItemsGraphService.getTotalItems(objDate)
      .subscribe(data => {
        this.data = data.items_by_component;
        this.fillChart(this.template_id);
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
