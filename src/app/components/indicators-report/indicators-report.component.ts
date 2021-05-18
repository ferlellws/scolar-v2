import { DatePipe } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from 'src/app/models/actions';
import { TableData } from 'src/app/models/table-data';
import { IndicatorsReportsService } from 'src/app/services/indicators-reports.service';
import { MainService } from 'src/app/services/main.service';
import { PersonsService } from 'src/app/services/persons.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { StatesService } from 'src/app/services/states.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ColumnChartsComponent } from '../shared/google-charts/column-charts/column-charts.component';
import { PieChartsComponent } from '../shared/google-charts/pie-charts/pie-charts.component';

@Component({
  selector: 'tecno-indicators-report',
  templateUrl: './indicators-report.component.html',
  styleUrls: ['./indicators-report.component.scss']
})
export class IndicatorsReportComponent implements OnInit {

  actions!: Actions;
  step = -1;

  indexTab = 0;
  
  labelStep = {
    back: "Atrás",
    next: "Siguiente"
  }

  labelButton = {
    remove: "Limpiar Filtros",
    filter: "Filtrar"
  }

  heightGraphic: string = "0px";

  statesGroup!: FormGroup;
  typificationsGroup!: FormGroup;
  prioritiesGroup!: FormGroup;
  vicepresidenciesGroup!: FormGroup;
  areasGroup!: FormGroup;
  programsGroup!: FormGroup;
  companiesGroup!: FormGroup;

  optionsYears: any[] = [];
  optionsStates: any[] = [];
  optionsPMOs: any[] = [];
  optionsStatus: any[] = [
    {
      id: "0",
      name: "Inactivo"
    },
    {
      id: "1",
      name: "Activo"
    }
  ];

  statesByVicepresidenciesTable: any;
  flagstates: boolean = false;

  typificationsByVicepresidencies: any;
  flagtypifications: boolean = false;

  priorities: any;
  flagpriorities: boolean = false;

  areas: any;
  flagAreas: boolean = false;

  advanceVicepresidencies: any;
  flagAdvanceVicepresidencies: boolean = false;

  programs!: any;
  flagprograms: boolean = false;

  companies: any;
  flagcompanies: boolean = false;

  pmosOccupation: any;
  flagPMOsOccupation: boolean = false;
  
  dataGraphicPriorities!: any;
  dataGraphicCompanies!: any;
  emptyGraphPriorities = false;
  emptyGraphCompanies = false;

  constructor(
    public dialog: MatDialog, 
    private router: Router,
    private mainService: MainService,
    public datepipe: DatePipe,
    private indicatorsReportsService: IndicatorsReportsService,
    private statesService: StatesService,
    private usersService: UserService,
    private personsService: PersonsService,
    private fg: FormBuilder ,
    private projectsService:ProjectsService
  ) {
    this.statesGroup = this.fg.group({
      yearsForm: [null],
    });
    this.typificationsGroup = this.fg.group({
      yearsForm: [null],
      statusForm: [null]
    });
    this.prioritiesGroup = this.fg.group({
      yearsForm: [null],
      statusForm: [null]
    });
    this.vicepresidenciesGroup = this.fg.group({
      yearsForm: [null],
      statesForm: [null]
    });
    this.areasGroup = this.fg.group({
      yearsForm: [null],
      statesForm: [null]
    });
    this.programsGroup = this.fg.group({
      yearsForm: [null],
      statesForm: [null],
      pmosForm: [null]
    });
    this.companiesGroup = this.fg.group({
      yearsForm: [null],
      statesForm: [null]
    });
  }

  ngOnInit(): void {
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }
    this.statesService.getStatesSelect()
      .subscribe((states: any) => {
        this.optionsStates = states;
      });

    this.personsService.getManagers()
      .subscribe((pmos: any) => {
        this.optionsPMOs = pmos;
      });
    
    this.projectsService.getYearsStartDate()
      .subscribe(res => {
        this.optionsYears = res.projects_start_date;
      });
  }

  openDesviationCauses() {
    environment.consoleMessage("","Entrando");
    this.router.navigate([`/desviation-causes/`]);
  }
  
  openInterrealtions() {
    environment.consoleMessage("Entrando");
    this.router.navigate([`/demo-gephi`]);
  }

  openStates(step: number) {
    this.setStep(step);

    if(this.statesByVicepresidenciesTable == null) {
      this.indicatorsReportsService.getTableStatesByVicepresidencies("")
        .subscribe((data: any) => {
          this.statesByVicepresidenciesTable = data.statesByVicepresidenciesTable;
          this.flagstates = true;
        })
    }
  }

  openTypifications(step: number) {
    this.setStep(step);
    
    if(this.typificationsByVicepresidencies == null) {
      this.indicatorsReportsService.getTableTypificationsByVicepresidencies("", "")
        .subscribe((data: any) => {
          this.typificationsByVicepresidencies = data.typificationsByVicepresidenciesTable;
          this.flagtypifications = true;
        })
    }
  }
  
  openPriorities(step: number) {
    this.setStep(step);

    if(this.priorities == null) {
      this.indicatorsReportsService.getTablePriorities("", "")
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
      this.indicatorsReportsService.getAdvancePercentagesByProjects("", "")
        .subscribe((data: any) => {
          this.advanceVicepresidencies = data.advancePercentagesByProjects[0].vicepresidencies;
          this.flagAdvanceVicepresidencies = true;
        });
      }
  }

  openAreas(step: number) {
    this.setStep(step);

    if(this.areas == null) {
      this.indicatorsReportsService.getAreas("","")
      .subscribe((data: any) => {
        this.areas = data;
        this.flagAreas = true;    
      });
    }
  }

  openPrograms(step: number) {
    this.setStep(step);
    if(this.programs == null) {
      this.indicatorsReportsService.getPrograms("", "", "")
        .subscribe((data: any) => {
          this.programs = data.programs;
          this.flagprograms = true;
        });
    }
  }
  
  openIndicatorsCompanies() {
    if(this.companies == null) {
      this.indicatorsReportsService.getTableCompanies("", "")
        .subscribe((data: any) => {
          let compAux = data.typificationsByVicepresidenciesTable.dataTable.filter((c:any) => c.totalProjects != 0);
          
          this.companies = data.typificationsByVicepresidenciesTable;
          this.companies.dataTable = compAux;

          if(this.companies.dataTable.length == 0) {
            this.emptyGraphCompanies = true;
          } else {
            this.dataGraphicCompanies = ColumnChartsComponent.TableToChart(this.companies, ['totalProjects'])
            this.emptyGraphCompanies = false;
            this.heightGraphic = this.companies.dataTable.length*32 + "px";
          }
          this.flagcompanies = true;
        });
    }
  }

  openPMOsOccupation(){
    if(this.pmosOccupation == null) {
      this.indicatorsReportsService.getPmoByOccupation("", "")
        .subscribe((data: any) => {
          this.pmosOccupation = data.pmoByOccupation.PMOs;
          this.flagPMOsOccupation = true;
        }
      );
    }
  }

  filter(group: FormGroup, nameGroup: string) {
    var years = this.arrayToString(group.get("yearsForm")!.value);

    if (nameGroup == "statesGroup") {
      this.indicatorsReportsService.getTableStatesByVicepresidencies(years)
        .subscribe((data: any) => {
          this.statesByVicepresidenciesTable = data.statesByVicepresidenciesTable;
          this.flagstates = true;
        });

    } else if (nameGroup == "typificationsGroup") {
      var status = this.arrayToString(group.get('statusForm')!.value);
      this.indicatorsReportsService.getTableTypificationsByVicepresidencies(years, status)
        .subscribe((data: any) => {
          this.typificationsByVicepresidencies = data.typificationsByVicepresidenciesTable;
          this.flagtypifications = true;
        });

    } else if (nameGroup == "prioritiesGroup") {
      var status = this.arrayToString(group.get("statusForm")!.value);
      this.indicatorsReportsService.getTablePriorities(years, status)
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

    }  else if (nameGroup == "vicepresidenciesGroup") {
      var states = this.arrayToString(group.get("statesForm")!.value);
      this.indicatorsReportsService.getAdvancePercentagesByProjects(years, states)
        .subscribe((data: any) => {
          this.advanceVicepresidencies = data.advancePercentagesByProjects[0].vicepresidencies;
          this.flagAdvanceVicepresidencies = true;
        });

    }  else if (nameGroup == "areasGroup") {
      var states = this.arrayToString(group.get("statesForm")!.value);
      this.indicatorsReportsService.getAreas(years,states)
        .subscribe((data: any) => {
          this.areas = data;
          this.flagAreas = true;
        });

    } else if (nameGroup == "programsGroup") {
    var states = this.arrayToString(group.get("statesForm")!.value);
    var pmos = this.arrayToString(group.get("pmosForm")!.value);
    this.indicatorsReportsService.getPrograms(years, states, pmos)
      .subscribe((data: any) => {
        this.programs = data.programs;
        this.flagprograms = true;
      });

    } else if (nameGroup == "companiesGroup") {
      var states = this.arrayToString(group.get("statesForm")!.value);
      this.indicatorsReportsService.getTableCompanies(years, states)
      .subscribe((data: any) => {
        let compAux = data.typificationsByVicepresidenciesTable.dataTable.filter((c:any) => c.totalProjects != 0);
        this.companies = data.typificationsByVicepresidenciesTable;
        this.companies.dataTable = compAux;
        //this.companies = data.typificationsByVicepresidenciesTable;
        if(this.companies.dataTable.length == 0) {
          this.emptyGraphCompanies = true;
        } else {
          this.dataGraphicCompanies = ColumnChartsComponent.TableToChart(this.companies, ['totalProjects'])
          this.emptyGraphCompanies = false;
        }
        this.flagcompanies = true;
      });

    } else if (nameGroup == "pmosGroup") {
      var states = this.arrayToString(group.get("statesForm")!.value);
      this.indicatorsReportsService.getPmoByOccupation(years, states)
        .subscribe((data: any) => {
          this.pmosOccupation = data.pmoByOccupation.PMOs;
          this.flagPMOsOccupation = true;
        }
      );
    }
    
  }

  removeValueGroup(group: FormGroup, nameGroup: string) {
    var keys: string[] = Object.keys(group.controls);
    for (let index = 0; index < keys.length; index++) {
      group.get(keys[index])?.setValue(null);
    }

    if(nameGroup == "statesGroup") {
      this.indicatorsReportsService.getTableStatesByVicepresidencies("")
        .subscribe((data: any) => {
          this.statesByVicepresidenciesTable = data.statesByVicepresidenciesTable;
          this.flagstates = true;
        })
    } else if(nameGroup == "typificationsGroup") {
      this.indicatorsReportsService.getTableTypificationsByVicepresidencies("", "")
        .subscribe((data: any) => {
          this.typificationsByVicepresidencies = data.typificationsByVicepresidenciesTable;
          this.flagtypifications = true;
        })
    } else if(nameGroup == "prioritiesGroup") {
      this.indicatorsReportsService.getTablePriorities("", "")
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
    } else if(nameGroup == "vicepresidenciesGroup") {
      this.indicatorsReportsService.getAdvancePercentagesByProjects("", "")
      .subscribe((data: any) => {
        this.advanceVicepresidencies = data.advancePercentagesByProjects[0].vicepresidencies;
        this.flagAdvanceVicepresidencies = true;
      });
    } else if(nameGroup == "areasGroup") {
      this.indicatorsReportsService.getAreas("","")
        .subscribe((data: any) => {
          this.flagAreas = true;    
        });
    } else if(nameGroup == "programsGroup") {
      this.indicatorsReportsService.getPrograms("", "", "")
      .subscribe((data: any) => {
        this.programs = data.programs;
        this.flagprograms = true;
      });
    } else if (nameGroup == "companiesGroup") {
      this.indicatorsReportsService.getTableCompanies("", "")
      .subscribe((data: any) => {
        let compAux = data.typificationsByVicepresidenciesTable.dataTable.filter((c:any) => c.totalProjects != 0);
        this.companies = data.typificationsByVicepresidenciesTable;
        this.companies.dataTable = compAux;
        //this.companies = data.typificationsByVicepresidenciesTable;
        if(this.companies.dataTable.length == 0) {
          this.emptyGraphCompanies = true;
        } else {
          this.dataGraphicCompanies = ColumnChartsComponent.TableToChart(this.companies, ['totalProjects'])
          this.emptyGraphCompanies = false;
        }
        this.flagcompanies = true;
      });
    } else if (nameGroup == "pmosGroup") {
      this.indicatorsReportsService.getPmoByOccupation("", "")
        .subscribe((data: any) => {
          this.pmosOccupation = data.pmoByOccupation.PMOs;
          this.flagPMOsOccupation = true;
        }
      );
    }
  }

  arrayToString(array: any[]) {
    var data:string = "";
    if(array != null) {
      for (let index = 0; index < array.length; index++) {
        data = data+array[index];
        if(index < array.length-1) {
          data = data+","
        }
      }
    }
    return data;
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
}
