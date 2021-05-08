import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions } from 'src/app/models/actions';
import { Phase } from 'src/app/models/phase';
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

  datePhases = [
    {
      phase_id: 1,
      phase_name: "Factibilidad",
      project_id: 2,
      start_date: "2021/05/07",
      end_date: "2021/05/10",
    },
    {
      phase_id: 2,
      phase_name: "Inicio",
      project_id: 2,
      start_date: "2021/05/11",
      end_date: "2021/06/10",
    },
    {
      phase_id: 3,
      phase_name: "Planeación",
      project_id: 2,
      start_date: "2021/06/10",
      end_date: "2021/08/10",
    },
    {
      phase_id: 4,
      phase_name: "Ejecución",
      project_id: 2,
      start_date: "null",
      end_date: "null",
    },
    {
      phase_id: 5,
      phase_name: "Cierre",
      project_id: 2,
      start_date: "null",
      end_date: "null",
    },
    {
      phase_id: 6,
      phase_name: "BAU",
      project_id: 2,
      start_date: "null",
      end_date: "null",
    },
  ];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,    
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    public datepipe: DatePipe,
    private phasesService: PhasesService
  ) { }

  ngOnInit(): void {
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }
  }
}
