import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Area } from 'src/app/models/area';
import { VicePresidency } from 'src/app/models/vice-presidency';
import { AreasService } from 'src/app/services/areas.service';
import { VicePresidenciesService } from 'src/app/services/vice-presidencies.service';
import { environment } from 'src/environments/environment';

export interface DialogData {
  id: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-areas-form',
  templateUrl: './areas-form.component.html',
  styleUrls: ['./areas-form.component.scss']
})
export class AreasFormComponent implements OnInit {
  showBtnClose: boolean = true;
  areasGroup!: FormGroup;
  pluralOption: string = "Áreas";
  singularOption: string = "Área";
  isButtonReset: boolean = false;
  selectVicepresidency!: VicePresidency [];

  fButtonDisabled: boolean = false;

  area!: any;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private areasService: AreasService,
    private vicePresidenciesService: VicePresidenciesService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    environment.consoleMessage(this.data, "++++++++++");
    this.areasGroup = this.fb.group({
      title: [null, Validators.required],
      description: null,
      vice_presidency_id: [null, Validators.required],
      is_active: true
    });
    if (this.data.mode == 'edit') {

      await this.getSelectVicepresidencies();
      this.areasService.getAreasId(this.data.id)
        .subscribe((res: Area) => {
          this.area = res;
          this.areasGroup.patchValue({
            title: this.area.title,
            description: this.area.description,
            vice_presidency_id: this.area.vice_presidency.id,            
            is_active: this.area.is_active
          });
        });
    }
  }
  
  onSubmit() {
    environment.consoleMessage(this.areasGroup, "OnSubmit areas: ");
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
    this.areasGroup.patchValue({
      title: null,
      description: null,
      vice_presidency_id: null,
      is_active: true
    });
  }

  createRegister() {
    environment.consoleMessage(this.areasGroup.value, "createRegister: ");
    this.areasService.addAreas(this.areasGroup.value)
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
    environment.consoleMessage(this.areasGroup, `updateRegister para registro con id ${this.data.id}: `);

    this.areasService.updateAreasId(
      this.areasGroup.value,
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

  onClickSelectVicepresidency() {
    environment.consoleMessage("", "Cargar info de managers");
    this.getSelectVicepresidencies();
  }

  getSelectVicepresidencies() {
    this.vicePresidenciesService.getVicePresidenciesSelect()
      .subscribe((res: VicePresidency []) => this.selectVicepresidency = res);
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

    if (this.areasGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

}
