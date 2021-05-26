import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhaseByProjectsService } from 'src/app/services/phase-by-projects.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {

  @Input() id_phase!: any;
  @Input() id_project!: any;
  @Input() title: string = "";
  @Input() start_date: string = "";
  @Input() end_date: string = "";
  @Input() idEdit!: any;

  group!: FormGroup;
  flagDate: string = "asignar";

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,    
    public datepipe: DatePipe,
    private phaseByProjectsService: PhaseByProjectsService
  ) { }

  ngOnInit(): void {
    this.group = this.fb.group({
      start_date: [null, Validators.required],
      end_date: [null, Validators.required],
    });
    environment.consoleMessage(this.start_date, "Fecha Nula???");

    if(this.start_date == "" || this.end_date == "") {
      this.flagDate = "asignar";
    } else {
      this.flagDate = "editar";
      this.group.get('start_date')?.setValue(new Date(this.start_date));
      this.group.get('end_date')?.setValue(new Date(this.end_date));
    }
  }

  add() {
    if(this.flagDate == "asignar") {
      if (this.group.get('end_date')!.value < this.group.get('start_date')!.value) {
        this.openSnackBar(false, "La fecha de finalización debe ser mayor a la fecha de inicio", "");
      } else {
        let phase_date= {
          project_id: this.id_project,
          phase_id: this.id_phase,
          start_date: this.group.get('start_date')?.value,
          end_date: this.group.get('end_date')?.value,
        };
        this.phaseByProjectsService.addPhaseByProjects(phase_date)
          .subscribe(data => {
            this.openSnackBar(true, "Asignación correcta", "");
            this.flagDate = "editar";
            this.idEdit = data.id;
          }, (err) => {
            this.openSnackBar(false, "No se ha podido asignar una fecha para la fase", "");
          });
      }
    } else if(this.flagDate == "editar") {
      if (this.group.get('end_date')!.value < this.group.get('start_date')!.value) {
        this.openSnackBar(false, "La fecha de finalización debe ser mayor a la fecha de inicio", "");
      } else {
        let phase_date= {
          project_id: this.id_project,
          phase_id: this.id_phase,
          start_date: this.group.get('start_date')?.value,
          end_date: this.group.get('end_date')?.value,
        };
        this.phaseByProjectsService.updatePhaseByProject(phase_date, this.idEdit)
          .subscribe(data => {
            this.openSnackBar(true, "Asignación correcta", "");
          } ,(err) => {
          this.openSnackBar(false, "No se ha podido realizar la edición", "");
        });
      }
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
    if (this.group.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }
    return message;
  }

}
