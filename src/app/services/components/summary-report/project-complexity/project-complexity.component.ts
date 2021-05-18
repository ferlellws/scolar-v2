import { Component, Input, OnInit } from '@angular/core';
import { ProjectComplexityService } from 'src/app/services/summary-report/project-complexity.service';

@Component({
  selector: 'tecno-project-complexity',
  templateUrl: './project-complexity.component.html',
  styleUrls: ['./project-complexity.component.scss']
})
export class ProjectComplexityComponent implements OnInit {

  @Input() data: Array<any>;
  @Input() template_id: number;
  buttons: any;

  constructor(
    private _projectComplexityService: ProjectComplexityService
  ) { }

  ngOnInit(): void {
    console.log("data", this.data);
    this.buttons = [
      { name: "1A", color: "accent", value: "q_year" },
      { name: "6M", color: "", value: "q_six_month" },
      { name: "4M", color: "", value: "q_four_month" },
      { name: "3M", color: "", value: "q_three_month" },
      { name: "1M", color: "", value: "q_one_month" },
      { name: "15D", color: "", value: "q_fifteen_days" },
    ];

    console.log("complejidadProyecto", this.data);
  }
  onFilterDateEvent(rangeDate, graph: string) {
    var dateFrom = rangeDate[0];
    var dateTo = rangeDate[1];

    var objDate = {
      reception_date_from: dateFrom,
      reception_date_to: dateTo
    }

    this._projectComplexityService.getProjectComplexityTable(objDate)
      .subscribe(data => {
        this.data = data;
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

    this._projectComplexityService.getProjectComplexityTable(objDate)
      .subscribe(data => {
        this.data = data;
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
