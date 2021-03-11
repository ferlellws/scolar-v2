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
import { Project } from 'src/app/models/project';
import { Risk } from 'src/app/models/risk';
import { Week } from 'src/app/models/week';
import { ApplicationsByProjectService } from 'src/app/services/applications-by-project.service';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';
import { ProjectsFormComponent } from '../projects/projects-form/projects-form.component';
import { ValoremFormComponent } from './valorem-form/valorem.component';

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
  applicationsByProject!: any[];
  areasByProject!: any[];
  companiesByProject!: any[];
  testUsersByProject!: any[];
  benefitsByProject!: any[];
  highlightsByProject!: any[];
  kpisByProject!: any[];
  risksByProject!: any[];
  weeksByProject!: any[];
  goalsByWeeks!: any[];
  nextActivitiesByWeek!: any[];
  obseravtionsByWeek!: any[];
  weeksByMonths!: any[12][];
  
  meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

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
  ) { }

  ngOnInit(): void {
    this.mainService.showLoading();
    this.route.data.subscribe((data: any) => {
      data.project.percentage = ((((data.project.pmo_hours*60)+(data.project.pmo_minutes)) / (this.semanal_hours*60)) * 100).toFixed(3)
      data.project.balance = new Intl.NumberFormat('en-US').format( data.project.budget_approved  - data.project.budget_executed );
      data.project.budget_executed = new Intl.NumberFormat('en-US').format( data.project.budget_executed);
      data.project.budget_approved = new Intl.NumberFormat('en-US').format( data.project.budget_approved);
      data.project.start_date = this.getToStringDate(data.project.start_date);
      data.project.due_date = this.getToStringDate(data.project.due_date);
      data.project.control_date = this.getToStringDate(data.project.control_date);
      data.project.reception_date = this.getToStringDate(data.project.reception_date);
           
      if (data.weeksByProject != null) {
        data.weeksByProject.map((data: any) => {
          var mes = new Date(data.start_date).getMonth(); 
          data.month = this.meses[mes];
  
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
        data.start_date = this.getToStringDate(data.start_date);
        data.end_date = this.getToStringDate(data.end_date);
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
        goals.week.project.id == data.project.id
      )
      environment.consoleMessage(this.goalsByWeeks, "GOALS ")


      //Prixomas Actividades  >>>>>>>>>>>>>>>>>>>  FALTA FILTRO POR SEMANA  <<<<<<<<<<<<<<<<<<<<<<<<<<<
      environment.consoleMessage(data.nextActivitiesByWeek, "data next_activities");
      this.nextActivitiesByWeek = data.nextActivitiesByWeek.filter((next_activity: NextActivity) => 
        next_activity.week.project.id == data.project.id
      )
      environment.consoleMessage(this.nextActivitiesByWeek, "NEXT ACTIVITIES ")


      //Observaciones  >>>>>>>>>>>>>>>>>>>  FALTA FILTRO POR SEMANA  <<<<<<<<<<<<<<<<<<<<<<<<<<<
      environment.consoleMessage(data.obseravtionsByWeek, "data observations");
      this.obseravtionsByWeek = data.obseravtionsByWeek.filter((observation: Observation) => 
        observation.week.project.id == data.project.id
      )
      environment.consoleMessage(this.obseravtionsByWeek, "OBSERVATIONS ")
      

      setTimeout(() => {this.mainService.hideLoading()}, 1000);
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
        if (data = 'close'){
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
        if (data = 'close'){
          dialogRef.close();
        }
      }
    );
  }

  onWeek(){
    environment.consoleMessage("onWeek");
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
