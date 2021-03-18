import { DataSource } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationByProject } from 'src/app/models/application-by-project';
import { AreaByProject } from 'src/app/models/area-by-project';
import { Benefit } from 'src/app/models/benefit';
import { CompanyByProject } from 'src/app/models/company-by-project';
import { Goal } from 'src/app/models/goal';
import { Highlight } from 'src/app/models/highlight';
import { Kpi } from 'src/app/models/kpi';
import { NextActivity } from 'src/app/models/next-activity';
import { Observation } from 'src/app/models/observation';
import { Risk } from 'src/app/models/risk';
import { Week } from 'src/app/models/week';
import { BenefitsService } from 'src/app/services/benefits.service';
import { GoalsService } from 'src/app/services/goals.service';
import { HighlightsService } from 'src/app/services/highlights.service';
import { KpisService } from 'src/app/services/kpis.service';
import { MainService } from 'src/app/services/main.service';
import { NextActivitiesService } from 'src/app/services/next-activities.service';
import { ObservationsService } from 'src/app/services/observations.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { RisksService } from 'src/app/services/risks.service';
import { WeeksService } from 'src/app/services/weeks.service';
import { environment } from 'src/environments/environment';
import { ProjectsFormComponent } from '../projects/projects-form/projects-form.component';
import { ValoremFormComponent } from './valorem-form/valorem.component';
import { WeekFormComponent } from './week-form/week-form.component';

export interface Indicator {
  name: string;
  color: string;
}
@Component({
  selector: 'tecno-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})

export class ProjectDetailsComponent implements OnInit {

  project: any;
  applicationsByProject: any[] = [];
  areasByProject: any[] = [];
  companiesByProject: any[] = [];
  testUsersByProject: any[] = [];
  benefitsByProject: any[] = [];
  highlightsByProject: any[] = [];
  kpisByProject: any[] = [];
  risksByProject: any[] = [];
  weeksByProject: any[] = [];
  goalsByWeeks: any[] = [];
  goalsAll: any[] = [];
  nextActivitiesAll: any[] = [];
  obseravtionsAll: any[] = [];
  nextActivitiesByWeek: any[] = [];
  obseravtionsByWeek: any[] = [];
  year: number = -1;
  
  meses = [
    {mes: "Enero", nReg: 0, year: -1},
    {mes: "Febrero", nReg: 0, year: -1},
    {mes: "Marzo", nReg: 0, year: -1},
    {mes: "Abril", nReg: 0, year: -1},
    {mes: "Mayo", nReg: 0, year: -1},
    {mes: "Junio", nReg: 0, year: -1},
    {mes: "Julio", nReg: 0, year: -1},
    {mes: "Agosto", nReg: 0, year: -1},
    {mes: "Septiembre", nReg: 0, year: -1},
    {mes: "Octubre", nReg: 0, year: -1},
    {mes: "Noviembre", nReg: 0, year: -1},
    {mes: "Diciembre", nReg: 0, year: -1}
  ];

  indicator: Indicator | null = null;
  weekId!: number;  

  semanal_hours = 40;
  labelAssignment = "Sin asignar";
  panelOpenState = false;

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private mainService: MainService,
    private router: Router,
    public datepipe: DatePipe,
    private projectsService:ProjectsService,
    private benefitsService:BenefitsService,
    private highlightsService:HighlightsService,
    private kpisService:KpisService,
    private risksService:RisksService,
    private weeksService:WeeksService,
    private goalsService:GoalsService,
    private nextActivitiesService:NextActivitiesService,
    private observationsService:ObservationsService,
  ) { }

  ngOnInit(): void {
    this.mainService.showLoading();
    this.route.data.subscribe((data: any) => {
      this.modificationData(data.project);

      if (data.weeksByProject != null) {
        data.weeksByProject.map((data: any) => {
          var mes = new Date(data.start_date).getMonth(); 
          data.month = this.meses[mes].mes;
  
          if (data.advance_spected != null && data.advance_real != null) {
            data.deviation_indicator = Math.abs(data.advance_spected - data.advance_real)
            if(data.deviation_indicator >= 0 &&  data.deviation_indicator <=5){
              data.deviation_indicator_color = '#8BC34A';
              data.deviation_indicator_name = 'Bajo';
            } else if(data.deviation_indicator > 5 &&  data.deviation_indicator <= 9){
              data.deviation_indicator_color = '#FFEB3B';
              data.deviation_indicator_name = 'Medio';
            } else if(data.deviation_indicator > 9 ){
              data.deviation_indicator_color = '#FF5722';
              data.deviation_indicator_name = 'Alto';
            }
          }
        });
      }

      data.weeksByProject.map((data: any) => {
        data.start_date = this.getToStringDate(new Date(`${(data.start_date).substring(0,10)}:00:00`));
        data.end_date = this.getToStringDate(new Date(`${(data.end_date).substring(0,10)}:00:00`));
      });

      data.goalsByWeeks.map((data: any) => {
        data.date = this.getToStringDate(data.date);
      });

      data.nextActivitiesByWeek.map((data: any) => {
        data.date = this.getToStringDate(data.date);
      });

      this.weeksByProject = data.weeksByProject.filter((weeks: Week) => 
        weeks.project!.id == data.project.id
      );

      this.weeksByProject.map((data: any) =>{
        var mes = new Date(data.start_date).getMonth(); 
        var año = new Date(data.start_date).getFullYear();
        data.month = this.meses[mes].mes;
        data.year = año;

        if (data.year != this.meses[mes].year) {
          this.meses[mes].nReg = 0;
          this.year = data.year;
        }

        this.meses[mes].nReg++;
        data.nReg = this.meses[mes].nReg;
        this.meses[mes].year = data.year;
      });

      this.weekId = this.weeksByProject.length-1;
      
      this.project = data.project;
      console.log("Datos Proyecto",this.project);

      //Aplicaciones Impactadas
      this.applicationsByProject = data.applicationsByProject.filter((apps: ApplicationByProject) => 
        apps.project!.id == data.project.id
      )

      //Areas Relacionadas
      this.areasByProject = data.areasByProject.filter((areas: AreaByProject) => 
        areas.project!.id == data.project.id
      )

      //Provedores
      this.companiesByProject = data.companiesByProject.filter((companies: CompanyByProject) => 
        companies.project!.id == data.project.id
      )

      //Recursos Funcionales de Prueba
      this.testUsersByProject = data.testUsersByProject.filter((users: CompanyByProject) => 
        users.project!.id == data.project.id
      )

      //Beneficios
      this.benefitsByProject = data.benefitsByProject.filter((benefits: Benefit) => 
        benefits.project!.id == data.project.id
      )

      //Hitos
      this.highlightsByProject = data.highlightsByProject.filter((highlights: Highlight) => 
        highlights.project!.id == data.project.id
      )

      //Kpis
      this.kpisByProject = data.kpisByProject.filter((kpis: Kpi) => 
        kpis.project!.id == data.project.id
      )

      //Riesgos
      this.risksByProject = data.risksByProject.filter((risks: Risk) => 
        risks.project!.id == data.project.id
      )

      //Semanas
      this.weeksByProject = data.weeksByProject.filter((weeks: Week) => 
        weeks.project!.id == data.project.id
      )

      //Logros
      this.goalsAll = data.goalsByWeeks.filter((goals: Goal) => {
        return goals.week!.project!.id == data.project.id
      })

      this.goalsByWeeks = this.goalsAll.filter((goals: Goal) => {
        return goals.week!.id == this.weeksByProject[this.weekId].id
      })

      //Prixomas Actividades
      this.nextActivitiesAll = data.nextActivitiesByWeek.filter((next_activity: Goal) => {
        return next_activity.week!.project!.id == data.project.id
      })

      this.nextActivitiesByWeek = data.nextActivitiesByWeek.filter((next_activity: NextActivity) => {
        return next_activity.week!.id == this.weeksByProject[this.weekId].id
      })

      //Observaciones
      this.obseravtionsAll = data.obseravtionsByWeek.filter((observations: Goal) => {
        return observations.week!.project!.id == data.project.id
      })

      this.obseravtionsByWeek = data.obseravtionsByWeek.filter((observation: Observation) => {
        return observation.week!.id == this.weeksByProject[this.weekId].id
      })

      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });

    // this.projectsService.emitDataTable
    //   .subscribe((res: any) => {
    //     true; //environment.consoleMessage(res, "l>>>>>>>>>>>>>>>>>>>>>                                          >>>>>>>>>>>>>>>>>>");
    //     this.modificationData(res.location);
    //     this.project = res.location;
    //     this.dialog.closeAll();
    //   });
    
    this.benefitsService.emitBenefits
      .subscribe((res: any) => {
        this.benefitsByProject.push(res);
      });
    
    this.benefitsService.emitDeleteBenefits
      .subscribe((res: any) => {
        this.benefitsService.getBenefits()
          .subscribe((data) => {
            this.benefitsByProject = data.filter((benefits: Benefit) => {
              return benefits.project!.id == this.project.id
            })        
          })
      });

    this.highlightsService.emitHighlights
      .subscribe((res: any) => {
        this.highlightsByProject.push(res);
      });

    this.highlightsService.emitDeleteHighlights
      .subscribe((res: any) => {
        this.highlightsService.getHighlights()
          .subscribe((data) => {
            this.highlightsByProject = data.filter((highlights: Highlight) => {
              return highlights.project!.id == this.project.id
            })
          })
      });

    this.kpisService.emitKpis
      .subscribe((res: any) => {
        this.kpisByProject.push(res);
      });
    
    this.kpisService.emitDeleteKpis
      .subscribe((res: any) => {
        this.kpisService.getKpis()
          .subscribe((data) => {
            this.kpisByProject = data.filter((kpis: Kpi) => {
              return kpis.project!.id == this.project.id
            })
          })
      });

    this.risksService.emitRisks
      .subscribe((res: any) => {
        this.risksByProject.push(res);
      });

    this.risksService.emitDeleteRisks
      .subscribe((res: any) => {
        this.risksService.getRisks()
          .subscribe((data) => {
            this.risksByProject = data.filter((risks: Risk) => {
              return risks.project!.id == this.project.id
            })
          })
      });
    
    this.goalsService.emitGoal
      .subscribe((res: any) => {
        res.date = this.getToStringDate(new Date(`${(res.date).substring(0,10)}:00:00`));
        this.goalsByWeeks.push(res);
      });

    this.goalsService.emitGoalDelete
      .subscribe((res: any) => {
        this.goalsService.getGoalsAll()
          .subscribe((data) => {
            this.goalsByWeeks = data.filter((goals: Goal) => {
              return goals.week!.project!.id == this.project.id
            })
          })
      });
    
    this.nextActivitiesService.emitNextActivities
      .subscribe((res: any) => {
        res.date = this.getToStringDate(new Date(`${(res.date).substring(0,10)}:00:00`));
        this.nextActivitiesByWeek.push(res);
      });

    this.nextActivitiesService.emitNextActivitiesDelete
      .subscribe((res: any) => {
        this.nextActivitiesService.getNextActivitiesAll()
          .subscribe((data) => {
            this.nextActivitiesByWeek = data.filter((next_activities: NextActivity) => {
              return next_activities.week!.project!.id == this.project.id
            })
          })
      });
    
    this.observationsService.emitObservations
      .subscribe((res: any) => {
        this.obseravtionsByWeek.push(res);
      });

    this.observationsService.emitObservationsDelete
      .subscribe((res: any) => {
        this.observationsService.getObservationsAll()
          .subscribe((data) => {
            this.obseravtionsByWeek = data.filter((observations: Observation) => {
              return observations.week!.project!.id == this.project.id
            })
          })
      });

    this.weeksService.emitWeek
      .subscribe((res: any) => {
        res.start_date = this.getToStringDate(new Date(`${(res.start_date).substring(0,10)}:00:00`));
        res.end_date = this.getToStringDate(new Date(`${(res.end_date).substring(0,10)}:00:00`));

        var mes = new Date(res.start_date).getMonth(); 
        var año = new Date(res.start_date).getFullYear();
        res.month = this.meses[mes].mes;
        res.year = año;

        true; //environment.consoleMessage(this.year, "YEAR");
        if (res.year != this.meses[mes].year) {
          this.meses[mes].nReg = 0;
          this.year = res.year;
        }
        true; //environment.consoleMessage(this.year, "YEAR");

        this.meses[mes].nReg++;
        res.nReg = this.meses[mes].nReg;
        this.meses[mes].year = res.year;

        if (res.advance_spected != null && res.advance_real != null) {
          res.deviation_indicator = Math.abs(res.advance_spected - res.advance_real)
          if(res.deviation_indicator >= 0 &&  res.deviation_indicator <=5){
            res.deviation_indicator_color = '#8BC34A';
            res.deviation_indicator_name = 'Bajo';
          } else if(res.deviation_indicator > 5 &&  res.deviation_indicator <= 9){
            res.deviation_indicator_color = '#FFEB3B';
            res.deviation_indicator_name = 'Medio';
          } else if(res.deviation_indicator > 9 ){
            res.deviation_indicator_color = '#FF5722';
            res.deviation_indicator_name = 'Alto';
          }
        }

        this.weeksByProject.push(res);
        this.nextWeek();
      });

  }

  onValorem(){
    true;//environment.consoleMessage("onValorem");
    const dialogRef = this.dialog.open(ValoremFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {
        mode: 'create',
        labelAction: 'Crear',
        idProject: this.project.id
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( data =>
      {
        if (data == 'close'){
          dialogRef.close();
        }
      }
    );
  }

  onProjectEdit(){
    const dialogRef = this.dialog.open(ProjectsFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {   
        id: this.project.id,
        mode: 'edit',
        labelAction: 'Editar'
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( data =>
      {
        if (data == 'close'){
          dialogRef.close();
        }
      }
    );
  }

  onWeek(){
    const dialogRef = this.dialog.open(WeekFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {   
        idProject: this.project.id,
        mode: 'create',
        labelAction: 'Crear'
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( data =>
      {
        if (data == 'close'){
          dialogRef.close();
        }
      }
    );
  }

  nextWeek(){
    this.weekId++;
    this.goalsByWeeks = this.goalsAll.filter((goals: Goal) => {
      return goals.week!.id == this.weeksByProject[this.weekId].id
    }) 
    this.nextActivitiesByWeek = this.nextActivitiesAll.filter((next_activity: NextActivity) => {
      return next_activity.week!.id == this.weeksByProject[this.weekId].id
    })   
    this.obseravtionsByWeek = this.obseravtionsAll.filter((observation: Observation) => {
      return observation.week!.id == this.weeksByProject[this.weekId].id
    }) 
  }

  beforeWeek(){
    this.weekId--;
    this.goalsByWeeks = this.goalsAll.filter((goals: Goal) => {
      return goals.week!.id == this.weeksByProject[this.weekId].id
    }) 
    this.nextActivitiesByWeek = this.nextActivitiesAll.filter((next_activity: NextActivity) => {
      return next_activity.week!.id == this.weeksByProject[this.weekId].id
    })   
    this.obseravtionsByWeek = this.obseravtionsAll.filter((observation: Observation) => {
      return observation.week!.id == this.weeksByProject[this.weekId].id
    }) 
  }

  getToStringDate(date: any): string {
    if (date == '' || date == undefined || date == null){
      return '';
    }
    if (date + "" != "Invalid Date" ){
      let d!: Date;
      try {
        d = new Date(date);
      } catch {
        d = new Date();
      } finally {
          return `${this.datepipe.transform( d, 'yyyy-MM-dd')}`;
      }
    } else {
      return "";
    }
  }

  modificationData(data: any) {
    true; //environment.consoleMessage(data, "PROJ");
    data.percentage = ((((data.pmo_hours*60)+(data.pmo_minutes)) / (this.semanal_hours*60)) * 100).toFixed(3)
    data.balance = new Intl.NumberFormat('en-US').format( data.budget_approved  - data.budget_executed );
    data.budget_executed = new Intl.NumberFormat('en-US').format( data.budget_executed);
    data.budget_approved = new Intl.NumberFormat('en-US').format( data.budget_approved);
    if(data.start_date != null){
      data.start_date = this.getToStringDate(new Date(`${(data.start_date).substring(0,10)}:00:00`));
    }
    if(data.due_date != null){
      data.due_date = this.getToStringDate(new Date(`${(data.due_date).substring(0,10)}:00:00`));
    }
    if(data.control_date != null){
      data.control_date = this.getToStringDate(new Date(`${(data.control_date).substring(0,10)}:00:00`));
    }
    data.reception_date = this.getToStringDate(new Date(`${(data.reception_date).substring(0,10)}:00:00`));
         
    if (data.test_log == true) {
      data.test_log = "Si"
    } else { data.test_log = "Si" }

    if (data.pmo_assitant != null) {
      data.percentageAssistant = ((((data.pmo_assistant_hours*60)+(data.pmo_assistant_minutes)) / (this.semanal_hours*60)) * 100).toFixed(3)
    }
    
    this.project = data;
  }
  
}
