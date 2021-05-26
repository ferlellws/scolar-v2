import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IndictorsHoursGraphService } from 'src/app/services/summary-report/indictors-hours-graph.service';

@Component({
  selector: 'tecno-hours-by-project',
  templateUrl: './hours-by-project.component.html',
  styleUrls: ['./hours-by-project.component.scss']
})
export class HoursByProjectComponent implements OnInit {

  @Input() data: Array<any>;
  @Input() template_id: number;
  columns_labels: string[] = ['Proyecto'];
  columns_footers: string[] = ['Total'];
  displayedColumns: string[] = [ 'project_label'];
  dataSource =  new MatTableDataSource<any>();
  buttons: any;

  constructor(
    private _indicaatorsHoursGraphService: IndictorsHoursGraphService
  ) { }

  ngOnInit(): void {
    this.fillTable(this.template_id);
    this.buttons = [
      { name: "1A", color: "accent", value: "q_year" },
      { name: "6M", color: "", value: "q_six_month" },
      { name: "4M", color: "", value: "q_four_month" },
      { name: "3M", color: "", value: "q_three_month" },
      { name: "1M", color: "", value: "q_one_month" },
      { name: "15D", color: "", value: "q_fifteen_days" },
    ];
  }

  fillTable(selected: number){
    this.columns_labels = ['Aplicación'];
    this.columns_footers = ['Total'];
    this.displayedColumns = [ 'component_label'];
    this.dataSource =  new MatTableDataSource<any>();
    var template_data = this.data[selected]; 
    var data = [];
    for (let index = 0; index < template_data.projects.length; index++) {
      //llenado de columnas
      if(index == 0){
        var severities: any[] = template_data.projects[index].item_severities_project;
        for (let j = 0; j < severities.length; j++) {
          this.columns_labels.push(`${severities[j].severity.title}`);
          this.displayedColumns.push(`${severities[j].severity.id}`);
          
        }
        this.displayedColumns.push(`total`);
        this.columns_labels.push('Total');
      }
      
      //lenado de data
      
      var row: any = {};
      row[this.displayedColumns[0]] = template_data.projects[index].project.title;
      for (let j = 1; j < this.displayedColumns.length - 1; j++) {
        var hours_severity = template_data.projects[index].item_severities_project.filter(item_severity=> item_severity.severity.id == parseInt(this.displayedColumns[j]))[0].hours_severity;
        row[this.displayedColumns[j]] = `${hours_severity.hours}:${this.formatMinutes(hours_severity.minutes)}`;
      }
      row[this.displayedColumns[this.displayedColumns.length - 1]] = `${template_data.projects[index].hours_project.hours}:${this.formatMinutes(template_data.projects[index].hours_project.minutes)}`;
      data.push(row);
    }
    this.dataSource.data = data;
    //footer
    var total_todo = 0;
    for (let j = 1; j < this.displayedColumns.length - 1; j++) {
      
      var hours_severity_total = template_data.severities.filter(severity_template => severity_template.severity.id == parseInt(this.displayedColumns[j]))[0].hours_severity;
      this.columns_footers.push( `${hours_severity_total.hours}:${this.formatMinutes(hours_severity_total.minutes)}`);
      total_todo += (hours_severity_total.hours * 60) + hours_severity_total.minutes;
    }
    this.columns_footers.push((total_todo/60).toFixed(2));
  }

  formatMinutes(entrada: number): string{
    var result = `${entrada}`;
    if(result.length < 2){
      result = "0" + result;
    }
    return result;
  }
  onFilterDateEvent(rangeDate, graph: string) {
    var dateFrom = rangeDate[0];
    var dateTo = rangeDate[1];

    var objDate = {
      reception_date_from: dateFrom,
      reception_date_to: dateTo
    }

    this._indicaatorsHoursGraphService.getHoursItems(objDate)
      .subscribe(data => {
        this.data = data.hours_by_project;
        this.fillTable(this.template_id);
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

    this._indicaatorsHoursGraphService.getHoursItems(objDate)
      .subscribe(data => {
        this.data = data.hours_by_project;
        this.fillTable(this.template_id);
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
