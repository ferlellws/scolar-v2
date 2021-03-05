import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/project';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';
import { ValoremFormComponent } from './valorem-form/valorem.component';

@Component({
  selector: 'tecno-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project: any;

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private mainService: MainService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.mainService.showLoading();
    this.route.data.subscribe((data: any) => {
      data.project.balance = new Intl.NumberFormat('en-US').format( data.project.budget_approved  - data.project.budget_executed );
      data.project.budget_executed = new Intl.NumberFormat('en-US').format( data.project.budget_executed);
      data.project.budget_approved = new Intl.NumberFormat('en-US').format( data.project.budget_approved);
      this.project = data.project;
      console.log("Datos Proyecto",this.project);
      
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });

  }

  onValorem(){
    environment.consoleMessage("onValorem");
    const dialogRef = this.dialog.open(ValoremFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {
        mode: 'create',
        labelAction: 'Crear',
        idProject: this.project.id
      }
    });
    dialogRef.componentInstance.emitClose.subscribe( data =>
      {
        if (data = 'close'){
          dialogRef.close();
        }
      }
    );
  }

  onValoremEdit(){
    environment.consoleMessage("onValorem");
    const dialogRef = this.dialog.open(ValoremFormComponent, {
      width: environment.widthFormsModal,
      disableClose: true, // Para mostrar o no el boton de cerrar (X) en la parte superior derecha
      data: {   
        idValorem: 1,     
        mode: 'edit',
        labelAction: 'Editar'
      }
    });
  }

  onWeek(){
    environment.consoleMessage("onWeek");
  }

}
