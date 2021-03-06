import { DataSource } from '@angular/cdk/collections';
import { DatePipe } from '@angular/common';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions } from 'src/app/models/actions';
import { ApplicationByProject } from 'src/app/models/application-by-project';
import { AreaByProject } from 'src/app/models/area-by-project';
import { Benefit } from 'src/app/models/benefit';
import { CompanyByProject } from 'src/app/models/company-by-project';
import { DesviationCause } from 'src/app/models/desviation-cause';
import { Goal } from 'src/app/models/goal';
import { Highlight } from 'src/app/models/highlight';
import { Kpi } from 'src/app/models/kpi';
import { NextActivity } from 'src/app/models/next-activity';
import { Observation } from 'src/app/models/observation';
import { Risk } from 'src/app/models/risk';
import { Week } from 'src/app/models/week';
import { BenefitsService } from 'src/app/services/benefits.service';
import { DesviationCausesService } from 'src/app/services/desviation-causes.service';
import { GoalsService } from 'src/app/services/goals.service';
import { HighlightsService } from 'src/app/services/highlights.service';
import { InterrelationsService } from 'src/app/services/interrelations.service';
import { KpisService } from 'src/app/services/kpis.service';
import { MainService } from 'src/app/services/main.service';
import { NextActivitiesService } from 'src/app/services/next-activities.service';
import { ObservationsService } from 'src/app/services/observations.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { RisksService } from 'src/app/services/risks.service';
import { WeeksService } from 'src/app/services/weeks.service';
import { environment } from 'src/environments/environment';
import { ProjectsFormComponent } from '../projects/projects-form/projects-form.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { DesviationCausesFormComponent } from './desviation-causes-form/desviation-causes-form.component';
import { InterrelationsFormComponent } from './interrelations-form/interrelations-form.component';
import { ValoremFormComponent } from './valorem-form/valorem.component';
import { WeekFormComponent } from './week-form/week-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhaseManagementComponent } from './phase-management/phase-management.component';
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
  actions!: Actions;
  project: any;
  applicationsByProject: any[] = [];
  areasByProject: any[] = [];
  companiesByProject: any[] = [];
  testUsersByProject: any[] = [];
  sponsorsByProject: any[] = [];
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
  desviationCausesGeneral: any;
  desviationCauses: DesviationCause [] =[];
  dedicationResources: any;
  
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

  desviationId: number = 0;  

  semanal_hours = 40;
  labelAssignment = "Sin asignar";
  labelTotalInterrelation = "No hay relaciones";
  panelOpenState = false;
  userID: any;
  profileID: any;

  interrelations: any;

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
    private desviationCausesService: DesviationCausesService,
    private interrelationsService:InterrelationsService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initialInfo();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  initialInfo() {
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }
    this.userID = JSON.parse(localStorage.user).person_id;
    this.profileID = JSON.parse(localStorage.user).profile_id;

    this.mainService.showLoading();

    this.route.data.subscribe((data: any) => {
      this.project = data.project;
      this.modificationData(data.project);

      var desviationGeneral: any = data.desviationsByProject;
      this.desviationCausesGeneral = desviationGeneral.general_data;
      this.desviationCauses = desviationGeneral.desviation_causes;
      this.desviationId = this.desviationCauses.length - 1;
      
      this.interrelations = data.interrelations.interrelations;

      if (data.weeksByProject != null) {
        data.weeksByProject.map((data: any) => {
          var mes = Number(this.getToStringDate(new Date(`${(data.start_date).substring(0,10)}:00:00`)).split("-")[1]);
          
          data.month = this.meses[mes-1].mes;
  
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
        data.date = this.getToStringDate(new Date(`${(data.date).substring(0,10)}:00:00`));
      });

      data.nextActivitiesByWeek.map((data: any) => {
        data.date = this.getToStringDate(new Date(`${(data.date).substring(0,10)}:00:00`));
      });

      //Semanas
      this.weeksByProject = data.weeksByProject;

      this.weeksByProject.map((data: any) =>{
        var mes = Number(this.getToStringDate(new Date(`${(data.start_date).substring(0,10)}:00:00`)).split("-")[1]) - 1;
        var a??o = Number(this.getToStringDate(new Date(`${(data.start_date).substring(0,10)}:00:00`)).split("-")[0]);
        data.month = this.meses[mes].mes;
        data.year = a??o;

        if (data.year != this.meses[mes].year) {
          this.meses[mes].nReg = 0;
          this.year = data.year;
        }

        this.meses[mes].nReg++;
        data.nReg = this.meses[mes].nReg;
        this.meses[mes].year = data.year;
      });

      this.weekId = this.weeksByProject.length-1;

      //Aplicaciones Impactadas
      this.applicationsByProject = data.applicationsByProject;

      //Areas Relacionadas
      this.areasByProject = data.areasByProject;

      //Provedores
      this.companiesByProject = data.companiesByProject;

      //Recursos Funcionales de Prueba
      this.testUsersByProject = data.testUsersByProject;

      //Sponsors
      this.sponsorsByProject = data.sponsors;

      //Beneficios
      this.benefitsByProject = data.benefitsByProject;

      //Hitos
      this.highlightsByProject = data.highlightsByProject;

      //Kpis
      this.kpisByProject = data.kpisByProject;

      //Riesgos
      this.risksByProject = data.risksByProject;

      //Logros
      this.goalsAll = data.goalsByWeeks;

      //Dedicaci??n Recursos Comit?? sin Sponsors
      this.dedicationResources = data.dedicationResources;

      this.goalsByWeeks = this.goalsAll.filter((goals: Goal) => {
        if (this.weeksByProject.length == 0){
          return false
        }
        return goals.week!.id == this.weeksByProject[this.weekId].id
      })

      //Prixomas Actividades
      this.nextActivitiesAll = data.nextActivitiesByWeek;

      this.nextActivitiesByWeek = data.nextActivitiesByWeek.filter((next_activity: NextActivity) => {
        if (this.weeksByProject.length == 0){
          return false
        }
        return next_activity.week!.id == this.weeksByProject[this.weekId].id
      })

      //Observaciones
      this.obseravtionsAll = data.obseravtionsByWeek;

      this.obseravtionsByWeek = data.obseravtionsByWeek.filter((observation: Observation) => {
        if (this.weeksByProject.length == 0){
          return false
        }
        return observation.week!.id == this.weeksByProject[this.weekId].id
      })
      
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });
    
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
        var a??o = new Date(res.start_date).getFullYear();
        res.month = this.meses[mes].mes;
        res.year = a??o;

        if (res.year != this.meses[mes].year) {
          this.meses[mes].nReg = 0;
          this.year = res.year;
        }

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


    this.desviationCausesService.emitNew.subscribe( data => {
      this.desviationCausesGeneral.cost_variation += data.cost_variation;
      this.desviationCausesGeneral.impacts_time += data.impacts_time;
      this.desviationCausesGeneral.total++;
      this.desviationCauses.push(data);
      this.desviationId = this.desviationCauses.length - 1;
    });
    
  }

  onValorem(project_id: number){
    this.router.navigate([`/project-progress-create/${project_id}`])
  }

  onProjectEdit(){
    const dialogRef = this.dialog.open(ProjectsFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true,
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
          window.location.reload();
        }
      });
  }

  onWeek(){
    const dialogRef = this.dialog.open(WeekFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true,
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
          window.location.reload();
        }
      }
    );
  }

  onWeeekEdit(id: number) {
    const dialogRef = this.dialog.open(WeekFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true,
      data: {   
        idProject: this.project.id,
        idWeek: id,
        mode: 'edit',
        labelAction: 'Editar'
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( data =>
      {
        if (data == 'close'){
          dialogRef.close();
          window.location.reload();
        }
      }
    );
  }

  onDesviation(){
    const dialogRef = this.dialog.open(DesviationCausesFormComponent, {
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

  onDesviationEdit(id: number){
    const dialogRef = this.dialog.open(DesviationCausesFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true,
      data: {   
        idProject: this.project.id,
        idCausal: id, 
        mode: 'edit',
        labelAction: 'Editar'
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( data =>
      {
        if (data == 'close'){
          dialogRef.close();
          this.desviationCausesService.getDesviationCausesByProject(this.project.id).subscribe(deviations =>
            {
              var desviationGeneral: any = deviations;
              environment.consoleMessage(deviations, ">>>>>>>>>>>>>>>>>>" )
              this.desviationCausesGeneral = desviationGeneral.general_data;
              this.desviationCauses = desviationGeneral.desviation_causes;
              this.desviationId = this.desviationCauses.length - 1;
            }
          );
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

  beforeDesviation(){
    this.desviationId--;
  }

  nextDesviation(){
    this.desviationId++;
  }

  onInterrelations(id: number) {
    const dialogRef = this.dialog.open(InterrelationsFormComponent, {
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
          window.location.reload();
        }
      }
    );
  }

  onOperationResources(project_id: number) {
    this.router.navigate([`/operation-resources/${project_id}`]);
  }
  
  onPhaseManagements(id: number) {
    const dialogRef = this.dialog.open(PhaseManagementComponent, {
      width: environment.widthFormsLittleModal,
      disableClose: true,
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
    data.percentage = ((((data.pmo_hours*60)+(data.pmo_minutes)) / (this.semanal_hours*60)) * 100).toFixed(2)
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
      data.percentageAssistant = ((((data.pmo_assistant_hours*60)+(data.pmo_assistant_minutes)) / (this.semanal_hours*60)) * 100).toFixed(2)
    }
    
    this.project = data;
  }

  numberToCOP(num: number){
    var res = new Intl.NumberFormat('en-US').format( num)
    res = res + ' COP'
    return res;
  }
  

  editInterrelation(id: number) {
    const dialogRef = this.dialog.open(InterrelationsFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {   
        idProject: this.project.id,
        idInterrelation: id,
        mode: 'edit',
        labelAction: 'Editar'
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( data =>
      {
        if (data == 'close'){
          dialogRef.close();
          window.location.reload();
        }
      }
    );
  }

  deleteInterrelation(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "400px",
      data: {
        title: "Confirmaci??n para eliminar registro",
        info: "??Est?? seguro que desea eliminar este registro?",
        //value: 
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( (data: any) => {
      if (data == 'si') {
        this.interrelationsService.deleteInterrelation(id)
          .subscribe(res => {
            this.openSnackBar(true, "Registro eliminado satisfactoriamente", "");
            dialogRef.close();
            window.location.reload();
          });
      } else {
        dialogRef.close();
        window.location.reload();
      }
    });
  }

  openSnackBar(succes: boolean, message: string, action: string, duration: number = 3000) {
    var panelClass = "succes-snack-bar";
    if(!succes){
      panelClass  = "error-snack-bar";
    }
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }
}
