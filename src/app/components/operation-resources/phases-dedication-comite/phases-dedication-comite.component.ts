import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResourceByPhasesService } from 'src/app/services/resource-by-phases.service';
import { SponsorByPhasesService } from 'src/app/services/sponsor-by-phases.service';
import { environment } from 'src/environments/environment';
import { DialogData } from '../resource-form/resource-form.component';

@Component({
  selector: 'tecno-phases-dedication-comite',
  templateUrl: './phases-dedication-comite.component.html',
  styleUrls: ['./phases-dedication-comite.component.scss']
})
export class PhasesDedicationComiteComponent implements OnInit {

  group!: FormGroup;
  
  @Input() idResourceByPhase!: any;
  @Input() idPhase!: any;
  @Input() idResource!: any;
  @Input() phaseTitle!: any;
  @Input() flagMode: any = "create";
  @Input() dedication!: any;
  @Input() type_resource!: string;

  disabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private resourceByPhasesService: ResourceByPhasesService,
    private sponsorByPhasesService:SponsorByPhasesService
  ) { }

  ngOnInit(): void {
    this.group = this.fb.group({
      dedication: [null, Validators.required],
    });
    this.group.get('dedication')?.setValue(this.dedication);
  }

  add() {
    if(this.type_resource == 'Sponsor') {
      let newSponsorByPhase = {
        phase_by_project_id: this.idPhase,
        operation_sponsor_id: this.idResource,
        dedication: this.group.get('dedication')?.value,
      }

      this.sponsorByPhasesService.addSponsorByPhase(newSponsorByPhase)
        .subscribe(res => {
          this.openSnackBar(true, "Tiempo de dedicación asignado correctamente", "");
        });
    }

    // let newReg = {
    //   phase_by_project_id: this.idPhase,
    //   support_resource_id: this.idResource,
    //   dedication: this.group.get('dedication')?.value,
    // }
    // if((this.dedication == "") && (this.flagMode == "create")) {
    //   this.resourceByPhasesService.addResourceByPhase(newReg)
    //     .subscribe(data => {
    //       this.openSnackBar(true, "Asignado correctamente", "");
    //       this.flagMode = "adit";
    //       this.idResourceByPhase = data.id;
    //     }, (err) => {
    //       this.openSnackBar(false, "No se han podido asignar los datos", "");
    //     });
    // } else {
    //   this.resourceByPhasesService.updateResourceByPhase(newReg, this.idResourceByPhase)
    //     .subscribe(data => {
    //       this.openSnackBar(true, "Registro actualizado correctamente", "");
    //     }, (err) => {
    //       this.openSnackBar(false, "No se ha podido actualziar el registro", "");
    //     });
    // }
  }

  edit() {
    environment.consoleMessage("EDITANDO");
    // let newReg = {
    //   phase_by_project_id: this.idPhase,
    //   support_resource_id: this.idResource,
    //   dedication: this.group.get('dedication')?.value,
    // }
    // if((this.flagMode == "edit") && this.idResourceByPhase != ""){
    //   this.resourceByPhasesService.updateResourceByPhase(newReg, this.idResourceByPhase)
    //   .subscribe(data => {
    //     this.openSnackBar(true, "Registro actualizado correctamente", "");
    //   }, (err) => {
    //     this.openSnackBar(false, "No se ha podido actualziar el registro", "");
    //   });
    // } else {
    //   this.resourceByPhasesService.addResourceByPhase(newReg)
    //     .subscribe(data => {
    //       this.openSnackBar(true, "Asignado correctamente", "");
    //       this.flagMode = "edit";
    //       this.idResourceByPhase = data.id;
    //     }, (err) => {
    //       this.openSnackBar(false, "No se han podido asignar los datos", "");
    //     });
    // }
  }

  getMessageError(field: string, labelField: string): string {
    let message!: string;
    if (this.group.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }
    return message;
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
