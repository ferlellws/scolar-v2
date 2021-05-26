import { Component, Input, OnInit } from '@angular/core';
import { SummaryReportService } from 'src/app/services/summary-report/summary-report.service';

// MODELS
import { Project } from 'src/app/models/project';

export interface SummaryProject {
  project: Project;
  statuses: [
    {
      name: string;
      value: number;
    }
  ];
}

class DataTableSummary {
  project: string;
  closed: number;
  development: number;
  deployment: number;
  qa_tests: number;
  user_tests: number;
  grand_total: number;

  constructor() {
    this.project = "";
    this.closed = 0;
    this.development = 0;
    this.deployment = 0;
    this.qa_tests = 0;
    this.user_tests = 0;
    this.grand_total = 0;
  }
}

@Component({
  selector: 'tecno-summary-projects',
  templateUrl: './summary-projects.component.html',
  styleUrls: ['./summary-projects.component.scss']
})
export class SummaryProjectsComponent implements OnInit {

  displayedColumns = [
    'project',
    'closed',
    'development',
    'deployment',
    'qa_tests',
    'user_tests',
    'grand_total'
  ];

  // displayedColumns = [
  //   'project',
  //   'closed'
  // ];

  projectsName: string [] = [];
  dataTableSummary: any [] = [];
  grandTotal: number [] = [0, 0, 0, 0, 0, 0];

  @Input() summaryProjects: SummaryProject[];
  buttons: any;
  selected: any;

  constructor(
    private _summaryReportService: SummaryReportService
  ) { }

  ngOnInit(): void {
    this.getDataTableSummary(this.summaryProjects);

    this.buttons = [
      { name: "1A", color: "accent", value: "q_year" },
      { name: "6M", color: "", value: "q_six_month" },
      { name: "4M", color: "", value: "q_four_month" },
      { name: "3M", color: "", value: "q_three_month" },
      { name: "1M", color: "", value: "q_one_month" },
      { name: "15D", color: "", value: "q_fifteen_days" },
    ];  

  }

  getDataTableSummary(summaryProjects: SummaryProject[]) {
    this.projectsName = [];
    this.dataTableSummary = [];
    this.grandTotal = [0, 0, 0, 0, 0, 0];

    // console.log(">>>>>>>>>>>>", summaryProjects);
    // summaryProjects.forEach((summaryProject: SummaryProject) => this.projects.push(summaryProject.project.title));
    summaryProjects.forEach((summaryProject: SummaryProject) => {
      this.projectsName.push(summaryProject.project.title)
    });

    summaryProjects.forEach((summaryProject: SummaryProject, index) => {
      this.dataTableSummary[index] = new DataTableSummary();
      this.dataTableSummary[index].project = summaryProject.project.title;
      let i = 1;
      summaryProject.statuses.forEach(status => {
        this.dataTableSummary[index][this.displayedColumns[i]] = status.value;
        this.grandTotal[i-1] += status.value;
        if (i == summaryProject.statuses.length) {
          i = 1;
        }
        i++;
      });
    });
  }

  /** Gets the total cost of all transactions. */
  // getTotalCost() {
  //   return this.summaryProjects.map(t => t.statuses.map(status => status.value)).reduce((acc, value) => acc + value, 0);
  // }

  onFilterDateEvent(rangeDate, graph: string) {
    var dateFrom = rangeDate[0];
    var dateTo = rangeDate[1];

    var objDate = {
      reception_date_from: dateFrom,
      reception_date_to: dateTo
    }

    this._summaryReportService.getProjectsSummaryGraphs(objDate)
      .subscribe(data => {
        this.summaryProjects = data.summary_project
        this.getDataTableSummary(this.summaryProjects);
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

    this._summaryReportService.getProjectsSummaryGraphs(objDate)
      .subscribe(data => {
        this.summaryProjects = data.summary_project
        this.getDataTableSummary(this.summaryProjects);
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