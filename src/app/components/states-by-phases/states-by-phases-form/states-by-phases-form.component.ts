import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Phase } from 'src/app/models/phase';
import { State } from 'src/app/models/state';
import { StateByPhase } from 'src/app/models/state-by-phase';
import { PhasesService } from 'src/app/services/phases.service';
import { StateByPhasesService } from 'src/app/services/state-by-phases.service';
import { StatesService } from 'src/app/services/states.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-states-by-phases-form',
  templateUrl: './states-by-phases-form.component.html',
  styleUrls: ['./states-by-phases-form.component.scss']
})
export class StatesByPhasesFormComponent implements OnInit {
  showBtnClose: boolean = true;
  stateByPhasesGroup!: FormGroup;
  pluralOption: string = "Fases por Estados ";
  singularOption: string = "Fase por Estado";
  isButtonReset: boolean = false;

  fButtonDisabled: boolean = false;

  stateByPhase!: StateByPhase;
  selectState!: State [];
  selectPhase!: Phase [];

    constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private stateByPhasesService: StateByPhasesService,
    private statesService: StatesService,
    private phasesService: PhasesService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    environment.consoleMessage(this.data, "++++++++++");
    this.stateByPhasesGroup = this.fb.group({
      state_id: [null, Validators.required],
      phase_id: [null, Validators.required],
      is_active: true
    });
    if (this.data.mode == 'edit') {

      this.stateByPhasesService.getStateByPhasesId(this.data.id)
        .subscribe((res: StateByPhase) => {
          this.stateByPhase = res;
          this.stateByPhasesGroup.patchValue({
            state: this.stateByPhase.state_id,
            phase_id: this.stateByPhase.phase_id,            
            is_active: this.stateByPhase.is_active
          });
        });
    }
  }
  
  onSubmit() {
    environment.consoleMessage(this.stateByPhasesGroup, "OnSubmit tipo de compañias: ");
    if (!this.isButtonReset) {
      this.fButtonDisabled = true;
      if (this.data.mode == 'create') {
        this.createRegister();
      } else {
        this.updateRegister();
      }
    }
  }

  onReset() {
    this.isButtonReset = true;
    this.stateByPhasesGroup.patchValue({
      state_id: null,
      phase_id: null,
      is_active: true
    });
  }

  createRegister() {
    environment.consoleMessage(this.stateByPhasesGroup.value, "createRegister: ");
    this.stateByPhasesService.addStateByPhases(this.stateByPhasesGroup.value)
      .subscribe((res) => {
        environment.consoleMessage(res, "<<<<<<<<>>>>>>");
        this.fButtonDisabled = false;
        if (res.status == 'created') {
          this.openSnackBar(true, "Registro creado satisfactoriamente", "");
        }
      }, (err) => {
        this.fButtonDisabled = false;
        let aErrors: any[] = [];
        for(let i in err.error) {
          aErrors = aErrors.concat(err.error[i])
        }

        let sErrors: string = "";
        aErrors.forEach((err) => {
          sErrors += "- " + err + "\n";
          environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
      });
  }

  updateRegister() {
    environment.consoleMessage(this.stateByPhasesGroup, `updateRegister para registro con id ${this.data.id}: `);

    this.stateByPhasesService.updateStateByPhasesId(
      this.stateByPhasesGroup.value,
      this.data.id
    )
      .subscribe((res) => {
        environment.consoleMessage(res, "<<<<<<<<>>>>>>");
        this.fButtonDisabled = false;
        if (res.status == 'updated') {
          this.openSnackBar(true, "Registro actualizado satisfactoriamente", "");
        }
      }, (err) => {
        this.fButtonDisabled = false;
        let aErrors: any[] = [];
        for(let i in err.error) {
          aErrors = aErrors.concat(err.error[i])
        }

        let sErrors: string = "";
        aErrors.forEach((err) => {
          sErrors += "- " + err + "\n";
          environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
      });
  }


  onClickSelectState() {
    environment.consoleMessage("", "Cargar info de managers");
    this.getSelectStates();
  }
  onClickSelectPhase() {
    environment.consoleMessage("", "Cargar info de managers");
    this.getSelectPhases();
  }

  getSelectStates() {
    this.statesService.getStatesSelect()
      .subscribe((res: State []) => this.selectState = res);
  }
  getSelectPhases() {
    this.phasesService.getPhasesSelect()
      .subscribe((res: State []) => this.selectPhase = res);
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

  getMessageError(field: string, labelField: string): string {
    let message!: string;

    if (this.stateByPhasesGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

}
