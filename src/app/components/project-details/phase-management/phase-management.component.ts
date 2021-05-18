import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emit } from 'node:process';
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

  close() {
    this.emitClose.emit('close');
  }
}
