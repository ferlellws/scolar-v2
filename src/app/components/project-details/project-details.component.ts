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
      data.project.percentage = ((((data.project.pmo_hours*60)+(data.project.pmo_minutes)) / (this.semanal_hours*60)) * 100).toFixed(3)
      data.project.balance = new Intl.NumberFormat('en-US').format( data.project.budget_approved  - data.project.budget_executed );
      data.project.budget_executed = new Intl.NumberFormat('en-US').format( data.project.budget_executed);
      data.project.budget_approved = new Intl.NumberFormat('en-US').format( data.project.budget_approved);
      if(data.project.start_date != null){
        data.project.start_date = this.getToStringDate(new Date(`${(data.project.start_date).substring(0,10)}:00:00`));
      }
      if(data.project.due_date != null){
        data.project.due_date = this.getToStringDate(new Date(`${(data.project.due_date).substring(0,10)}:00:00`));
      }
      if(data.project.control_date != null){
        data.project.control_date = this.getToStringDate(new Date(`${(data.project.control_date).substring(0,10)}:00:00`));
      }
      data.project.reception_date = this.getToStringDate(new Date(`${(data.project.reception_date).substring(0,10)}:00:00`));
           
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

        environment.consoleMessage(this.year, "YEAR");
        if (data.year != this.meses[mes].year) {
          this.meses[mes].nReg = 0;
          this.year = data.year;
        }
        environment.consoleMessage(this.year, "YEAR");

        this.meses[mes].nReg++;
        data.nReg = this.meses[mes].nReg;
        this.meses[mes].year = data.year;
      });

      environment.consoleMessage(this.meses, "ARREGLO MESES");

      this.weekId = this.weeksByProject.length-1;
      environment.consoleMessage(this.weekId, ">>>>>>>>>> WEEK ID <<<<<<<<<<");
      
      environment.consoleMessage(this.weeksByProject.length, "WEEKS LENGTH");
      environment.consoleMessage(this.weeksByProject, "WEEKS PROJECT");

      if (data.project.test_log == true) {
        data.project.test_log = "Si"
      } else { data.project.test_log = "Si" }

      if (data.project.pmo_assitant != null) {
        data.project.percentageAssistant = ((((data.project.pmo_assistant_hours*60)+(data.project.pmo_assistant_minutes)) / (this.semanal_hours*60)) * 100).toFixed(3)
      }
      
      this.project = data.project;
      console.log("Datos Proyecto",this.project);

      //Aplicaciones Impactadas
      environment.consoleMessage(data.applicationsByProject, "data app");
      this.applicationsByProject = data.applicationsByProject.filter((apps: ApplicationByProject) => 
        apps.project!.id == data.project.id
      )
      //this.applicationsByProject = data.applicationsByProject;
      environment.consoleMessage(this.applicationsByProject, "APPS")
      

      //Areas Relacionadas
      environment.consoleMessage(data.areasByProject, "data areas");
      this.areasByProject = data.areasByProject.filter((areas: AreaByProject) => 
        areas.project!.id == data.project.id
      )
      environment.consoleMessage(this.areasByProject, "AREAS ")


      //Provedores
      environment.consoleMessage(data.companiesByProject, "data companies");
      this.companiesByProject = data.companiesByProject.filter((companies: CompanyByProject) => 
        companies.project!.id == data.project.id
      )
      environment.consoleMessage(this.companiesByProject, "COMPAÑIAS ")


      //Recursos Funcionales de Prueba
      environment.consoleMessage(data.testUsersByProject, "data test users");
      this.testUsersByProject = data.testUsersByProject.filter((users: CompanyByProject) => 
        users.project!.id == data.project.id
      )
      environment.consoleMessage(this.testUsersByProject, "TEST USERS ")


      //Beneficios
      environment.consoleMessage(data.benefitsByProject, "data benefits");
      this.benefitsByProject = data.benefitsByProject.filter((benefits: Benefit) => 
        benefits.project!.id == data.project.id
      )
      environment.consoleMessage(this.benefitsByProject, "BENEFITS ")


      //Hitos
      environment.consoleMessage(data.highlightsByProject, "data highlights");
      this.highlightsByProject = data.highlightsByProject.filter((highlights: Highlight) => 
        highlights.project!.id == data.project.id
      )
      environment.consoleMessage(this.highlightsByProject, "HIGHLIGHTS ")


      //Kpis
      environment.consoleMessage(data.kpisByProject, "data kpis");
      this.kpisByProject = data.kpisByProject.filter((kpis: Kpi) => 
        kpis.project!.id == data.project.id
      )
      environment.consoleMessage(this.kpisByProject, "KPIS ")


      //Riesgos
      environment.consoleMessage(data.risksByProject, "data risks");
      this.risksByProject = data.risksByProject.filter((risks: Risk) => 
        risks.project!.id == data.project.id
      )
      environment.consoleMessage(this.risksByProject, "KPIS ")


      //Semanas
      environment.consoleMessage(data.weeksByProject , "data weeks");
      this.weeksByProject = data.weeksByProject.filter((weeks: Week) => 
        weeks.project!.id == data.project.id
      )
      environment.consoleMessage(this.weeksByProject, "WEEKS ")


      //Logros  >>>>>>>>>>>>>>>>>>>  FALTA FILTRO POR SEMANA  <<<<<<<<<<<<<<<<<<<<<<<<<<<
      environment.consoleMessage(data.goalsByWeeks, "data goals");
      this.goalsByWeeks = data.goalsByWeeks.filter((goals: Goal) => 
        goals.week!.project!.id == data.project.id
      )
      environment.consoleMessage(this.goalsByWeeks, "GOALS ")


      //Prixomas Actividades  >>>>>>>>>>>>>>>>>>>  FALTA FILTRO POR SEMANA  <<<<<<<<<<<<<<<<<<<<<<<<<<<
      environment.consoleMessage(data.nextActivitiesByWeek, "data next_activities");    
      this.nextActivitiesByWeek = data.nextActivitiesByWeek.filter((next_activity: NextActivity) => 
        next_activity.week!.project!.id == data.project.id
      )
      environment.consoleMessage(this.nextActivitiesByWeek, "NEXT ACTIVITIES ")


      //Observaciones  >>>>>>>>>>>>>>>>>>>  FALTA FILTRO POR SEMANA  <<<<<<<<<<<<<<<<<<<<<<<<<<<
      environment.consoleMessage(data.obseravtionsByWeek, "data observations");
      this.obseravtionsByWeek = data.obseravtionsByWeek.filter((observation: Observation) => 
        observation.week!.project!.id == data.project.id
      )
      environment.consoleMessage(this.obseravtionsByWeek, "OBSERVATIONS ")
      

      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });

    // this.projectsService.emitDataTable
    //   .subscribe((res: any) => {
    //     environment.consoleMessage(res, "l>>>>>>>>>>>>>>>>>>>>>");
    //     this.project = res.data;
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

        environment.consoleMessage(this.year, "YEAR");
        if (res.year != this.meses[mes].year) {
          this.meses[mes].nReg = 0;
          this.year = res.year;
        }
        environment.consoleMessage(this.year, "YEAR");

        this.meses[mes].nReg++;
        res.nReg = this.meses[mes].nReg;
        this.meses[mes].year = res.year;


        this.weeksByProject.push(res);
      });

  }

  onValorem(){
    environment.consoleMessage("onValorem");
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
      environment.consoleMessage("nextWeek");
      environment.consoleMessage(this.weekId,"weekId");
      this.weekId++;
      environment.consoleMessage(this.weekId,"weekId");
  }

  beforeWeek(){
    
      environment.consoleMessage("beforeWeek");
      environment.consoleMessage(this.weekId,"weekId");
      this.weekId--;
      environment.consoleMessage(this.weekId,"weekId");
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

}
