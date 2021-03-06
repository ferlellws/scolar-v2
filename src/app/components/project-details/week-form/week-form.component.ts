import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Goal } from 'src/app/models/goal';
import { NextActivity } from 'src/app/models/next-activity';
import { Observation } from 'src/app/models/observation';
import { Week } from 'src/app/models/week';
import { GoalsService } from 'src/app/services/goals.service';
import { NextActivitiesService } from 'src/app/services/next-activities.service';
import { ObservationsService } from 'src/app/services/observations.service';
import { WeeksService } from 'src/app/services/weeks.service';
import { environment } from 'src/environments/environment';
import { PhaseManagementComponent } from '../phase-management/phase-management.component';

export interface DialogData {
  idProject: number;
  idWeek: number;
  mode: string;
  labelAction: string;
}

export interface Indicator {
  balance: number;
  name: string;
  color: string;
}

@Component({
  selector: 'tecno-week-form',
  templateUrl: './week-form.component.html',
  styleUrls: ['./week-form.component.scss']
})
export class WeekFormComponent implements OnInit {

  @Output() emitClose: EventEmitter<string> = new EventEmitter();

  isButtonReset: boolean = false;
  pluralOption: string = "Seguimientos Semanales";
  singularOption: string = "Seguimiento Semanal";
  fButtonDisabled: boolean = false;
  showBtnClose: boolean = true;
  labels: any;
  indicator: Indicator | null = null;

  general!: FormGroup;

  goals: any[] = [];
  nextActivities: any[] = [];
  observations: any[] = []

  goalsAux: any[] = [];
  nextActivitiesAux: any[] = [];
  observationsAux: any[] = []

  disableEdit = false;
  mode = "create";
  project: any;

  constructor(
    private _fbG: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public datepipe: DatePipe,
    private _weeksService: WeeksService,
    private _goalsService: GoalsService,
    private _nextActivitiesService: NextActivitiesService,
    private _observationsService: ObservationsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog, 
  ) { 
    this.general = this._fbG.group({
      'start_date': [null, [Validators.required]],
      'end_date': [null, [Validators.required]],
      'advance_spected': [null, [Validators.required, Validators.max(100), Validators.min(0)]],
      'advance_real': [null, [Validators.required, Validators.max(100), Validators.min(0)]],
    });

    this.labels = {
      start_date: `Fecha de inicio`,
      end_date: `Fecha de finalizaci??n`,
      advance_spected: 'Avance esperado',
      advance_real: 'Avance real',
    }

  }

  ngOnInit(): void {
    this.disableEdit = true;
    if(this.data.mode == 'edit') {
      this.disableEdit = true;
      this.mode = "edit";
      this._weeksService.getWeeksId(this.data.idWeek)
       .subscribe(data => {
          this.general.patchValue({
            start_date: new Date(`${(data.start_date).substring(0,10)}:00:00`),
            end_date: new Date(`${(data.end_date).substring(0,10)}:00:00`),
            advance_spected: data.advance_spected,
            advance_real: data.advance_real
          });

          this.changeAdvance();
       });

      this._goalsService.getGoalsAll()
        .subscribe(goals => {
          this.goals = goals.filter((f:any) => f.week.id == this.data.idWeek)
          this.goals.map((m:any) => m.date = this.parseDate(new Date(`${(m.date).substring(0,10)}:00:00`)));
          
          this.goalsAux = goals.filter((f:any) => f.week.id == this.data.idWeek)
          this.goalsAux.map((m:any) => m.date = this.parseDate(new Date(`${(m.date).substring(0,10)}:00:00`)));
        });

      this._nextActivitiesService.getNextActivitiesAll()
        .subscribe(nextActivities => {
          this.nextActivities = nextActivities.filter((f:any) => f.week.id == this.data.idWeek)
          this.nextActivities.map((m:any) => m.date = this.parseDate(new Date(`${(m.date).substring(0,10)}:00:00`)));
          
          this.nextActivitiesAux = nextActivities.filter((f:any) => f.week.id == this.data.idWeek)
          this.nextActivitiesAux.map((m:any) => m.date = this.parseDate(new Date(`${(m.date).substring(0,10)}:00:00`)));
        });

      this._observationsService.getObservationsAll()
        .subscribe(observations => {
          this.observations = observations.filter((f:any) => f.week.id == this.data.idWeek)
          this.observationsAux = observations.filter((f:any) => f.week.id == this.data.idWeek)
        });
    }
  }

  managementPhases() {
    // this.emitClose.emit('close');
    const dialogRef = this.dialog.open(PhaseManagementComponent, {
      width: environment.widthFormsLittleModal,
      disableClose: true,
      data: {   
        idProject: this.data.idProject,
        mode: 'create',
        labelAction: 'Crear'
      }
    });
    dialogRef.componentInstance.emitClose
      .subscribe( (data :any) => {
        if (data == 'close'){
          dialogRef.close();
        }
      }
    );
  }

  editar() {
    //Week ..................................................................................
    var week: Week = {
      project_id: this.data.idProject,
      advance_real: this.general.get('advance_real')!.value,
      advance_spected: this.general.get('advance_spected')!.value,
      start_date: this.parseDate(this.general.get('start_date')!.value),
      end_date: this.parseDate(this.general.get('end_date')!.value),
      is_active: true,
      is_delete: false,
      user_creates_id: JSON.parse(localStorage.user).id,
    }
    this._weeksService.updateWeek(week, this.data.idWeek).subscribe((res) => {
      true;
    });

    //Goals .................................................................................
    for (let index = 0; index < this.goals.length; index++) {
      var goal: Goal = {
        week_id: this.data.idWeek,
        date: this.goals[index].date,
        description: this.goals[index].description,
        value_goal: false,
        is_active: true,
        is_delete: false,
      }
      if(this.goals[index].id == null) {
        this._goalsService.addGoal(goal).subscribe(data =>{
          true;
        });
      } else if(this.goals[index].id != null) {
        if(this.goals[index].edit != null) {
          this._goalsService.updateGoal(goal, this.goals[index].id).subscribe(data =>{
            true;
          });
        }
        
      }
    }
    for (let index = 0; index < this.goalsAux.length; index++) {
      let del = false;
      for (let index2 = 0; index2 < this.goals.length; index2++) {
        if(this.goalsAux[index].id == this.goals[index2].id) {
          del = true;
          break;
        }
      }
      if(del == false) {
        this._goalsService.deleteGoal(this.goalsAux[index].id)
          .subscribe(res => {
            true;
          });
      }
    }
    //Goals .................................................................................

    //Next Activities .................................................................................
    for (let index = 0; index < this.nextActivities.length; index++) {
      var nextActivity: NextActivity = {
        week_id: this.data.idWeek,
        date: this.nextActivities[index].date,
        description: this.nextActivities[index].description,
        is_active: true,
        is_delete: false,
      }
      if(this.nextActivities[index].id == null) {
        this._nextActivitiesService.addNextActivity(nextActivity).subscribe(data =>{
          true;
        });
      } else if(this.nextActivities[index].id != null) {
        if(this.nextActivities[index].edit != null) {
          this._nextActivitiesService.updateNextActivity(nextActivity, this.nextActivities[index].id).subscribe(data =>{
            true;
          });
        }
        
      }
    }
    for (let index = 0; index < this.nextActivitiesAux.length; index++) {
      let del = false;
      for (let index2 = 0; index2 < this.nextActivities.length; index2++) {
        if(this.nextActivitiesAux[index].id == this.nextActivities[index2].id) {
          del = true;
          break;
        }
      }
      if(del == false) {
        this._nextActivitiesService.deleteNextActivity(this.nextActivitiesAux[index].id)
          .subscribe(res => {
            true;
          });
      }
    }
    //Next Activities .................................................................................


    //Observations .................................................................................
    for (let index = 0; index < this.observations.length; index++) {
      var observation: Observation = {
        week_id: this.data.idWeek,
        description: this.observations[index].description,
        is_active: true,
        is_delete: false,
      }
      if(this.observations[index].id == null) {
        this._observationsService.addObservation(observation).subscribe(data =>{
          true;
        });
      } else if(this.observations[index].id != null) {
        if(this.observations[index].edit != null) {
          this._observationsService.updateObservation(observation, this.observations[index].id).subscribe(data =>{
            true;
          });
        }
        
      }
    }
    for (let index = 0; index < this.observationsAux.length; index++) {
      let del = false;
      for (let index2 = 0; index2 < this.observations.length; index2++) {
        if(this.observationsAux[index].id == this.observations[index2].id) {
          del = true;
          break;
        }
      }
      if(del == false) {
        this._observationsService.deleteObservation(this.observationsAux[index].id)
          .subscribe(res => {
            true;
          });
      }
    }
    //Observations .................................................................................

    this.emitClose.emit('close');
  }

  getMessageError(formGroup: FormGroup, field: string): string {
    let message!: string;
    if (formGroup.get(field)?.errors?.required) {
      message = `Campo ${this.labels[field]} es requerido`
    }
    if (formGroup.get(field)?.errors?.max) {
      message = `M??ximo ${formGroup.get(field)?.errors?.max.max}`
    }
    if (formGroup.get(field)?.errors?.min) {
      message = `M??nimo ${formGroup.get(field)?.errors?.min.min}`
    }

    return message;
  }

  changeAdvance(){
    if(this.general.get('advance_spected')!.value != null && this.general.get('advance_real')!.value != null){
      var diferencia: number = this.general.get('advance_spected')!.value - this.general.get('advance_real')!.value;
      diferencia < 0 ? diferencia = diferencia * (-1): true;
      if(diferencia >= 0 &&  diferencia <= 5){
        this.indicator = {
          balance: diferencia,
          color: '#8BC34A',
          name: 'Bajo'
        }
      } else if(diferencia > 5 &&  diferencia <= 9){
        this.indicator = {
          balance: diferencia,
          color: '#FFEB3B',
          name: 'Medio'
        }
      } else if(diferencia > 9 ){
        this.indicator = {
          balance: diferencia,
          color: '#FF5722',
          name: 'Alto'
        }
      }
    }else{
      this.indicator = null;
    }
  }

  onGoal(data: any){
    true; //environment.consoleMessage(data, "OnGoals");
  }
  onObservations(data: any){
    true; //environment.consoleMessage(data, "onObservation");
  }
  onNextActivities(data: any){
    true; //environment.consoleMessage(data, "onNextActivities");
  }


  onReset(){
    var controllers = Object.keys(this.general);
    for (let index = 0; index < controllers.length; index++) {
      this.general.get(controllers[index])?.setValue(null);
    }
    this.goals = [];
    this.nextActivities = [];
    this.observations = []
  }

  async crear(){
    var week: Week = {
      project_id: this.data.idProject,
      advance_real: this.general.get('advance_real')!.value,
      advance_spected: this.general.get('advance_spected')!.value,
      start_date: this.parseDate(this.general.get('start_date')!.value),
      end_date: this.parseDate(this.general.get('end_date')!.value),
      is_active: true,
      is_delete: false,
      user_creates_id: JSON.parse(localStorage.user).id,
    }
    await this._weeksService.addWeek(week).subscribe((res) => {
      for (let index = 0; index < this.goals.length; index++) {
        var goal: Goal = {
          week_id: res.id,
          date: this.goals[index].date,
          description: this.goals[index].description,
          value_goal: false,
          is_active: true,
          is_delete: false,
        } 
        this._goalsService.addGoal(goal).subscribe(data =>{
            true; //environment.consoleMessage(data, "goal")
          }, (err) => {
            this.fButtonDisabled = false;
            let aErrors: any[] = [];
            for(let i in err.error) {
              aErrors = aErrors.concat(err.error[i])
            }
      
            let sErrors: string = "";
            aErrors.forEach((err) => {
              sErrors += "- " + err + "\n";
              true; //environment.consoleMessage(err, "Error: ");
            })
      
            this.openSnackBar(false, sErrors, "");
          });
      }
      for (let index = 0; index < this.nextActivities.length; index++) {
        var nextActivity: NextActivity = {
          week_id: res.id,
          date: this.nextActivities[index].date,
          description: this.nextActivities[index].description,
          is_active: true,
          is_delete: false,
        } 
        this._nextActivitiesService.addNextActivity(nextActivity).subscribe(data =>{
          true; //environment.consoleMessage(data, "activity")
        }, (err) => {
            this.fButtonDisabled = false;
            let aErrors: any[] = [];
            for(let i in err.error) {
              aErrors = aErrors.concat(err.error[i])
            }
      
            let sErrors: string = "";
            aErrors.forEach((err) => {
              sErrors += "- " + err + "\n";
              true; //environment.consoleMessage(err, "Error: ");
            })
      
            this.openSnackBar(false, sErrors, "");
          });
      }
      for (let index = 0; index < this.observations.length; index++) {
        var observation: Observation = {
          week_id: res.id,
          description: this.observations[index].description,
          is_active: true,
          is_delete: false,
        } 
        this._observationsService.addObservation(observation).subscribe(data =>{
          true; //environment.consoleMessage(data, "observation")
        }, (err) => {
            this.fButtonDisabled = false;
            let aErrors: any[] = [];
            for(let i in err.error) {
              aErrors = aErrors.concat(err.error[i])
            }
      
            let sErrors: string = "";
            aErrors.forEach((err) => {
              sErrors += "- " + err + "\n";
              true; //environment.consoleMessage(err, "Error: ");
            })
      
            this.openSnackBar(false, sErrors, "");
          });
      }
      this.openSnackBar(true, "Seguimiento creado", "");
      this.emitClose.emit('close');
    }, (err) => {
      this.fButtonDisabled = false;
      let aErrors: any[] = [];
      for(let i in err.error) {
        aErrors = aErrors.concat(err.error[i])
      }

      let sErrors: string = "";
      aErrors.forEach((err) => {
        sErrors += "- " + err + "\n";
        true; //environment.consoleMessage(err, "Error: ");
      })

      this.openSnackBar(false, sErrors, "");
    });
  }

  parseDate(date: any): string {
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
