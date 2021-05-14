import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LeaderByPhasesService } from 'src/app/services/leader-by-phases.service';
import { PmoAssignedByPhaseByPhasesService } from 'src/app/services/pmo-assigned-by-phases.service';
import { PmoAssistantByPhasesService } from 'src/app/services/pmo-assistant-by-phases.service';
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
    private sponsorByPhasesService:SponsorByPhasesService,
    private leaderByPhasesService:LeaderByPhasesService,
    private pmoAssignedByPhasesService:PmoAssignedByPhaseByPhasesService,
    private pmoAssistantByPhasesService:PmoAssistantByPhasesService
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
        } , (err) => {
          this.openSnackBar(false, "No se ha podido hacer la asignación correctamente", "");
        });
    } else if(this.type_resource == 'Líder Funcional') {
      let newLeaderByPhase = {
        phase_by_project_id: this.idPhase,
        functional_lead_id: this.idResource,
        dedication: this.group.get('dedication')?.value,
      }
      this.leaderByPhasesService.addLeaderByPhase(newLeaderByPhase)
        .subscribe(res => {
          this.openSnackBar(true, "Tiempo de dedicación asignado correctamente", "");
        }, (err) => {
          this.openSnackBar(false, "No se ha podido hacer la asignación correctamente", "");
        });
    } else if(this.type_resource == 'Pmo Asignado') {
      let newPmoByPhase = {
        phase_by_project_id: this.idPhase,
        pmo_id: this.idResource,
        dedication: this.group.get('dedication')?.value,
      }
      this.pmoAssignedByPhasesService.addPmoAssignedByPhaseByPhase(newPmoByPhase)
        .subscribe(res => {
          this.openSnackBar(true, "Tiempo de dedicación asignado correctamente", "");
        }, (err) => {
          this.openSnackBar(false, "No se ha podido hacer la asignación correctamente", "");
        });
    } else if(this.type_resource == 'Pmo de Apoyo') {
      let newPmoByPhase = {
        phase_by_project_id: this.idPhase,
        pmo_assistant_id: this.idResource,
        dedication: this.group.get('dedication')?.value,
      }
      this.pmoAssistantByPhasesService.addPmoAssistantByPhaseByPhase(newPmoByPhase)
        .subscribe(res => {
          this.openSnackBar(true, "Tiempo de dedicación asignado correctamente", "");
        }, (err) => {
          this.openSnackBar(false, "No se ha podido hacer la asignación correctamente", "");
        });
    }
  }

  edit() {
    if(this.type_resource == 'Sponsor') {
      let newSponsorByPhase = {
        dedication: this.group.get('dedication')?.value,
      }
      this.sponsorByPhasesService.updateSponsorByPhase(newSponsorByPhase, this.idResourceByPhase)
        .subscribe(res => {
          this.openSnackBar(true, "Tiempo de dedicación asignado correctamente", "");
        }, (err) => {
          this.openSnackBar(false, "No se ha podido hacer la asignación correctamente", "");
        });
    } else if(this.type_resource == 'Líder Funcional') {
      let newLeaderByPhase = {
        dedication: this.group.get('dedication')?.value,
      }
      this.leaderByPhasesService.updateLeaderByPhase(newLeaderByPhase, this.idResourceByPhase)
        .subscribe(res => {
          this.openSnackBar(true, "Tiempo de dedicación asignado correctamente", "");
        }, (err) => {
          this.openSnackBar(false, "No se ha podido hacer la asignación correctamente", "");
        });
    } else if(this.type_resource == 'Pmo Asignado') {
      let newPmoByPhase = {
        dedication: this.group.get('dedication')?.value,
      }
      this.pmoAssignedByPhasesService.updatePmoAssignedByPhase(newPmoByPhase, this.idResourceByPhase)
        .subscribe(res => {
          this.openSnackBar(true, "Tiempo de dedicación asignado correctamente", "");
        }, (err) => {
          this.openSnackBar(false, "No se ha podido hacer la asignación correctamente", "");
        });
    } else if(this.type_resource == 'Pmo de Apoyo') {
      let newPmoByPhase = {
        dedication: this.group.get('dedication')?.value,
      }
      this.pmoAssistantByPhasesService.updatePmoAssistantByPhase(newPmoByPhase, this.idResourceByPhase)
        .subscribe(res => {
          this.openSnackBar(true, "Tiempo de dedicación asignado correctamente", "");
        }, (err) => {
          this.openSnackBar(false, "No se ha podido hacer la asignación correctamente", "");
        });
    }
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
