import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions } from 'src/app/models/actions';
import { Phase } from 'src/app/models/phase';
import { PhaseByProjectsService } from 'src/app/services/phase-by-projects.service';
import { PhasesService } from 'src/app/services/phases.service';

export interface DialogData {
  idProject: number;
  idInterrelation: number;
  mode: string;
  labelAction: string;
}

@Component({
  selector: 'tecno-phase-management',
  templateUrl: './phase-management.component.html',
  styleUrls: ['./phase-management.component.scss']
})
export class PhaseManagementComponent implements OnInit {
  
  @Output() emitClose: EventEmitter<string> = new EventEmitter();
  actions!: Actions;
  
  singularOption: string = "Gestionar Phases";
  isButtonReset: boolean = false;
  fButtonDisabled: boolean = false;
  showBtnClose: boolean = true;
  datePhases: any[] = [];

  // datePhases = [
  //   {
  //     reg_id: 6,
  //     phase_id: 1,
  //     phase_name: "Factibilidad",
  //     start_date: "2021-05-10:00:00",
  //     end_date: "2021-06-10:00:00",
  //   },
  //   {
  //     reg_id: 6,
  //     phase_id: 2,
  //     phase_name: "Inicio",
  //     start_date: "null",
  //     end_date: "null",
  //   },
  //   {
  //     reg_id: 6,
  //     phase_id: 3,
  //     phase_name: "Planeación",
  //     start_date: "null",
  //     end_date: "null",
  //   },
  //   {
  //     reg_id: 6,
  //     phase_id: 4,
  //     phase_name: "Ejecución",
  //     start_date: "null",
  //     end_date: "null",
  //   },
  //   {
  //     reg_id: 6,
  //     phase_id: 5,
  //     phase_name: "Cierre",
  //     start_date: "null",
  //     end_date: "null",
  //   },
  //   {
  //     reg_id: 6,
  //     phase_id: 6,
  //     phase_name: "BAU",
  //     start_date: "null",
  //     end_date: "null",
  //   },
  // ];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,    
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    public datepipe: DatePipe,
    private phasesService: PhasesService,
    private phaseByProjectsService: PhaseByProjectsService
  ) { }

  ngOnInit(): void {
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }

    this.phaseByProjectsService.getPhaseByProjectId(this.data.idProject)
      .subscribe(res => {
        this.datePhases = res.datePhases;
      });
  }
}
