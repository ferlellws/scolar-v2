import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { State } from 'src/app/models/state';
import { StatesService } from 'src/app/services/states.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-states-form',
  templateUrl: './states-form.component.html',
  styleUrls: ['./states-form.component.scss']
})
export class StatesFormComponent implements OnInit {
  showBtnClose: boolean = true;
  statesGroup!: FormGroup;
  pluralOption: string = "Estados";
  singularOption: string = "Estado";
  isButtonReset: boolean = false;

  fButtonDisabled: boolean = false;

  state!: State;

  selectStatus: any = [
    {
      id: 0,
      title: "Inactivo"
    },
    {
      id: 1,
      title: "Activo"
    },
  ]

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private statesService: StatesService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    true;//environment.consoleMessage(this.data, "++++++++++");
    this.statesGroup = this.fb.group({
      title: [null, Validators.required],
      description: null,
      status: null,
      is_active: true
    });
    
    if (this.data.mode == 'edit') {

      this.statesService.getStatesId(this.data.id)
        .subscribe((res: State) => {
          this.state = res;
          this.statesGroup.patchValue({
            title: this.state.title,
            description: this.state.description,
            status: this.state.status,          
            is_active: this.state.is_active
          });
        });
    }
  }
  
  onSubmit() {
    true;//environment.consoleMessage(this.statesGroup, "OnSubmit estados: ");
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
    this.statesGroup.patchValue({
      title: null,
      description: null,

      is_active: true
    });
  }

  createRegister() {
    true;//environment.consoleMessage(this.statesGroup.value, "createRegister: ");
    this.statesService.addStates(this.statesGroup.value)
      .subscribe((res) => {
        true;//environment.consoleMessage(res, "<<<<<<<<>>>>>>");
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
          true;//environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
      });
  }

  updateRegister() {

    environment.consoleMessage(this.statesGroup.value, "UPDATEEEEEE");
    this.statesService.updateStatesId(
      this.statesGroup.value,
      this.data.id
    )
      .subscribe((res) => {
        true;//environment.consoleMessage(res, "<<<<<<<<>>>>>>");
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
          true;//environment.consoleMessage(err, "Error: ");
        })

        this.openSnackBar(false, sErrors, "");
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

  getMessageError(field: string, labelField: string): string {
    let message!: string;

    if (this.statesGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

  onClickSelectStatus() {

  }

}
