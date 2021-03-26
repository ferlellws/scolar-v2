import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { TableData } from 'src/app/models/table-data';
import { IndicatorsReportsService } from 'src/app/services/indicators-reports.service';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';
import { ColumnChartsComponent } from '../shared/google-charts/column-charts/column-charts.component';
import { PieChartsComponent } from '../shared/google-charts/pie-charts/pie-charts.component';

@Component({
  selector: 'tecno-indicators-report',
  templateUrl: './indicators-report.component.html',
  styleUrls: ['./indicators-report.component.scss']
})
export class IndicatorsReportComponent implements OnInit {

  step = -1;

  indexTab = 0;
  
  labelStep = {
    back: "Atrás",
    next: "Siguiente"
  }


  statesByVicepresidenciesTable: any;
  flagstates: boolean = false;

  typificationsByVicepresidencies: any;
  flagtypifications: boolean = false;

  priorities: any;
  flagpriorities: boolean = false;

  advanceVicepresidencies: any;
  flagAdvanceVicepresidencies: boolean = false;

  pmosOccupation: any;
  flagPMOsOccupation: boolean = false;

  programs!: any;
  flagprograms: boolean = false;

  companies: any;
  flagcompanies: boolean = false;
  
  dataGraphicPriorities!: any;
  dataGraphicCompanies!: any;
  emptyGraphPriorities = false;
  emptyGraphCompanies = false;

  // programs: any = [
  //   {
  //     name: "Hermes",
  //     advance_spected: "15%",
  //     advance_real: "12%",
  //     desviation: {
  //       color: "green",
  //       value: "3%"
  //     },
  //     vicepresidencies: [
  //       {
  //         name: "Presidencia",
  //         advance_spected: "15%",
  //         advance_real: "12%",
  //         desviation: {
  //           color: "green",
  //           value: "3%"
  //         },
  //         tableData: {
  //           headers: [
  //             "Proyecto",
  //             "Avance Esperado",
  //             "Avance Real",
  //             "Desviación",
  //           ],
  //           dataTable: [
  //             {
  //               name: "BCT",
  //               advance_spected: "15%",
  //               advance_real: "12%",
  //               desviation: {
  //                 color: "green",
  //                 value: "3%"
  //               },
  //             },
  //             {
  //               name: "KOBAProject",
  //               advance_spected: "15%",
  //               advance_real: "50%",
  //               desviation: {
  //                 color: "red",
  //                 value: "45%"
  //               },
  //             },
  //           ]
  //         }
  //       },
  //       {
  //         name: "Vp Financiera",
  //         advance_spected: "35%",
  //         advance_real: "32%",
  //         desviation: {
  //           color: "red",
  //           value: "1%"
  //         },
  //         tableData: {
  //           headers: [
  //             "Proyecto",
  //             "Avance Esperado",
  //             "Avance Real",
  //             "Avance Real",
  //             "Desviación",
  //           ],
  //           dataTable: [
  //             {
  //               name: "D1Web",
  //               advance_spected: "15%",
  //               advance_real: "12%",
  //               desviation: {
  //                 color: "green",
  //                 value: "3%"
  //               },
  //             },
  //             {
  //               name: "Niff16",
  //               advance_spected: "15%",
  //               advance_real: "40%",
  //               desviation: {
  //                 color: "yellow",
  //                 value: "45%"
  //               },
  //             },
  //           ]
  //         }
  //       },
  //     ],
  //   },

  //   {
  //     name: "Compacto",
  //     advance_spected: "15%",
  //     advance_real: "12%",
  //     desviation: {
  //       color: "red",
  //       value: "50%"
  //     },
  //     vicepresidencies: [
  //       {
  //         name: "Presidencia",
  //         advance_spected: "15%",
  //         advance_real: "12%",
  //         desviation: {
  //           color: "green",
  //           value: "3%"
  //         },
  //         tableData: {
  //           headers: [
  //             "Proyecto",
  //             "Avance Esperado",
  //             "Avance Real",
  //             "Avance Real",
  //             "Desviación",
  //           ],
  //           dataTable: [
  //             {
  //               name: "BCT",
  //               advance_spected: "15%",
  //               advance_real: "12%",
  //               desviation: {
  //                 color: "green",
  //                 value: "3%"
  //               },
  //             },
  //             {
  //               name: "KOBAProject",
  //               advance_spected: "15%",
  //               advance_real: "50%",
  //               desviation: {
  //                 color: "red",
  //                 value: "45%"
  //               },
  //             },
  //           ]
  //         }
  //       },
  //     ],
  //   }
  // ]

  constructor(
    public dialog: MatDialog, 
    private router: Router,
    private mainService: MainService,
    public datepipe: DatePipe,
    private indicatorsReportsService:IndicatorsReportsService,
  ) { }

  ngOnInit(): void {
  }

  openStates(step: number) {
    this.setStep(step);

    if(this.statesByVicepresidenciesTable == null) {
      this.indicatorsReportsService.getTableStatesByVicepresidencies()
        .subscribe((data: any) => {
          this.statesByVicepresidenciesTable = data.statesByVicepresidenciesTable;
          this.flagstates = true;
        })
    }
  }

  openTypifications(step: number) {
    this.setStep(step);
    if(this.typificationsByVicepresidencies == null) {
      this.indicatorsReportsService.getTableTypificationsByVicepresidencies()
        .subscribe((data: any) => {
          this.typificationsByVicepresidencies = data.typificationsByVicepresidenciesTable;
          this.flagtypifications = true;
        })
    }
  }
  
  openPriorities(step: number) {
    this.setStep(step);

    if(this.priorities == null) {
    this.indicatorsReportsService.getTablePriorities()
      .subscribe((data: any) => {
        this.priorities = data.priorities;
        if(this.priorities.dataTable.length == 0) {
          this.emptyGraphPriorities = true;
        } else {
          this.dataGraphicPriorities = PieChartsComponent.TableToChart(this.priorities, ['total'])
          this.emptyGraphPriorities = false;
        }
        this.flagpriorities = true;
      });
    }
  }

  openVicepresidencies(step: number) {
    this.setStep(step);

    if(this.advanceVicepresidencies == null) {
    this.indicatorsReportsService.getAdvancePercentagesByProjects()
      .subscribe((data: any) => {
        this.advanceVicepresidencies = data.advancePercentagesByProjects[0].vicepresidencies;
        this.flagAdvanceVicepresidencies = true;
      });
    }
  }

  openPrograms(step: number) {
    this.setStep(step);

    // this.indicatorsReportsService.getPrograms()
    //   .subscribe((data: any) => {
    //     this.programs = data;
    //     this.flagprograms = true;
    //   });
    //   this.flagprograms = true;
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    this.indexTab =  tabChangeEvent.index;
    if(this.indexTab == 1) {
      this.openIndicatorsCompanies();
    }
    if(this.indexTab == 2) {
      this.openPMOsOccupation();
    }
  }

  openDesviatoinCauses() {
    this.router.navigate([`/desviation-causes/`]);
  }

  openIndicatorsCompanies() {
    this.indicatorsReportsService.getTableCompanies()
      .subscribe((data: any) => {
        this.companies = data.typificationsByVicepresidenciesTable;
        if(this.companies.dataTable.length == 0) {
          this.emptyGraphCompanies = true;
        } else {
          this.dataGraphicCompanies = ColumnChartsComponent.TableToChart(this.companies, ['pr1', 'pr2', 'pr3', 'pr4'])
          this.emptyGraphCompanies = false;
        }
        this.flagcompanies = true;
      });
  }

  openPMOsOccupation(){
    if(this.pmosOccupation == null) {
      this.indicatorsReportsService.getPmoByOccupation()
        .subscribe((data: any) => {
          this.pmosOccupation = data.pmoByOccupation.PMOs;
          this.flagPMOsOccupation = true;
        }
      );
    }
  }
}
