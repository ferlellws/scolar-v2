import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { env } from 'node:process';
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
  selectAreas!: Area [];
  area!: any;

  fButtonDisabled: boolean = false;
  parentLabel: string = "Área a la que pertenece";


  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private areasService: AreasService,
    private vicePresidenciesService: VicePresidenciesService,
    private snackBar: MatSnackBar,
  ) { }

  async ngOnInit(): Promise<void> {
    this.areasGroup = this.fb.group({
      title: [null, Validators.required],
      description: null,
      vice_presidency_id: [null, Validators.required],
      parent_id: null,
      is_active: true
    });
    if (this.data.mode == 'edit') {
      await this.getSelectVicepresidencies();
      this.areasService.getAreasId(this.data.id)
        .subscribe((res: Area) => {
          this.area = res;
          let parentID;
          environment.consoleMessage(this.area, "AREA EDIT >>>>>>>>>>>");
          if(this.area.parent == null) {
            parentID = null
          } else {
            parentID = this.area.parent.id
          }
          this.areasGroup.patchValue({
            title: this.area.title,
            description: this.area.description,
            vice_presidency_id: this.area.vice_presidency.id,
            parent_id: parentID,
            is_active: this.area.is_active
          });
          this.validateLabels();
        });
    }
  }
  
  onSubmit() {
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
      parent_id: null,
      is_active: true
    });
    this.validateLabels();
  }

  createRegister() {
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
    this.areasService.updateAreasId(
      this.areasGroup.value,
      this.data.id
    )
      .subscribe((res) => {
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
        })

        this.openSnackBar(false, sErrors, "");
      });
  }

  onClickSelectVicepresidency() {
    this.getSelectVicepresidencies();
  }

  getSelectVicepresidencies() {
    this.selectAreas = [];
    return this.vicePresidenciesService.getVicePresidenciesSelect()
      .subscribe((res: VicePresidency []) => {
        this.selectVicepresidency = res;
        this.getSelectAreas();
      });
  }

  onClickSelectAreas(ev:boolean) {
    if(ev){
      this.getSelectAreas();
    }else{
      this.validateLabels();
    }
  }

  getSelectAreas() {    
    let vice: number = this.areasGroup.get('vice_presidency_id')!.value;
    if(vice != null) {
      this.areasService.getAreasByVicePresidency(vice)
        .subscribe((area: Area[]) => {
          this.selectAreas = area;
          environment.consoleMessage(this.selectAreas, "SELECT AREAS");
        });
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

  getMessageError(field: string, labelField: string): string {
    let message!: string;

    if (this.areasGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

  validateLabels(){
    if(this.areasGroup.value.parent_id == null){
      this.parentLabel = "Área a la que pertenece";
      this.singularOption = "Área";
    }else{
      this.parentLabel = "Área";
      this.singularOption = "Subárea";
    }
  }

}
