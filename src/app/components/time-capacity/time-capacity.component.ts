import { type } from '@amcharts/amcharts4/core';
import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { Actions } from 'src/app/models/actions';
import { Area } from 'src/app/models/area';
import { Person } from 'src/app/models/person';
import { Project } from 'src/app/models/project';
import { MainService } from 'src/app/services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-time-capacity',
  templateUrl: './time-capacity.component.html',
  styleUrls: ['./time-capacity.component.scss']
})
export class TimeCapacityComponent implements OnInit {

  constructor(
    public dialog: MatDialog, 
    private route: ActivatedRoute,
    private mainService: MainService,
    public datepipe: DatePipe,
    private fg: FormBuilder 
  ) {
    this.filtersGroup = this.fg.group({
      areas: [null],
      resources: [null],
      start_date: null,
      end_date: null
    });
  }

  filtersGroup!: FormGroup;
  labelButton = {
    remove: "Limpiar Filtros",
    filter: "Filtrar"
  }

  indexTab = 0;

  projectsControl = new FormControl();
  filterProjects!: Observable<Project[]>;
  projects: any[] = [];

  areasControl = new FormControl();
  filterAreas!: Observable<Project[]>;
  areas: any[] = [];

  resourcesControl = new FormControl();
  filterResources!: Observable<Person[]>;
  resources: any[] = [];

  areasFilter: Area[] = [];

  generalData:any = [
    {
      project_name: 'Tiempos y Turnos Fase 1', 
      months: {
        month_1: 'Ene-21',
        month_2: 'Feb-21',
        month_3: 'Mar-21',
        month_4: 'Abr-21',
        month_5: 'May-21',
        month_6: 'Jun-21',
      },
      dataSource: [
        {
          name: 'David Fernando Guerrero Alvarez',
          position: 'Director Logística',
          profile: 'Sponsor',
          month_1: {
            sem2: { dedication: '25%', color: '#4285F4' },
            sem4: { dedication: '25%', color: '#4285F4' }
          },
          month_2: {
            sem2: { dedication: '25%', color: '#02B7AC' },
            sem4: { dedication: '25%', color: '#02B7AC' }
          },
          month_3: {
            sem2: { dedication: '25%', color: '#02B7AC' },
            sem4: { dedication: '25%', color: '#02B7AC' }
          },
          month_4: {
            sem2: { dedication: '27%', color: '#02B7AC' },
            sem4: { dedication: '27%', color: '#F4B400' }
          },
          month_5: {
            sem2: { dedication: '27%', color: '#F4B400' },
            sem4: { dedication: '27%', color: '#F4B400' }
          },
          month_6: {
            sem2: { dedication: '27%', color: '#F4B400' },
            sem4: { dedication: '27%', color: '#F4B400' }
          }
        },
        {
          name: 'Denis Alexander Rodriguez Venegas',
          position: 'Gestor de Proyectos',
          profile: 'Líder Funcional',
          month_1: {
            sem2: { dedication: '30%', color: '#4285F4' },
            sem4: { dedication: '30%', color: '#4285F4' }
          },
          month_2: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '35%', color: '#02B7AC' }
          },
          month_3: {
            sem2: { dedication: '35%', color: '#02B7AC' },
            sem4: { dedication: '40%', color: '#02B7AC' }
          },
          month_4: {
            sem2: { dedication: '25%', color: '#02B7AC' },
            sem4: { dedication: '27%', color: '#F4B400' }
          },
          month_5: {
            sem2: { dedication: '27%', color: '#F4B400' },
            sem4: { dedication: '27%', color: '#F4B400' }
          },
          month_6: {
            sem2: { dedication: '27%', color: '#F4B400' },
            sem4: { dedication: '27%', color: '#F4B400' }
          }
        },
        {
          name: 'David Humberto Rodriguez Venegas',
          position: 'Gestor de Proyectos',
          profile: 'Pmo Asignado',
          month_1: {
            sem2: { dedication: '0%', color: '#4285F4' },
            sem4: { dedication: '0%', color: '#4285F4' }
          },
          month_2: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_3: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_4: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_5: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_6: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          }
        },
        {
          name: 'David Humberto Rodriguez Venegas',
          position: 'Gestor de Proyectos',
          profile: 'Pmo Apoyo',
          month_1: {
            sem2: { dedication: '0%', color: '#4285F4' },
            sem4: { dedication: '0%', color: '#4285F4' }
          },
          month_2: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_3: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_4: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_5: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_6: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          }
        },
        {
          name: 'David Humberto Rodriguez Venegas',
          position: 'Gestor de Proyectos',
          profile: 'Recurso Funcional',
          month_1: {
            sem2: { dedication: '0%', color: '#4285F4' },
            sem4: { dedication: '0%', color: '#4285F4' }
          },
          month_2: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_3: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_4: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_5: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_6: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          }
        },
        {
          name: 'Gabriel Enrique Cardenas Santana',
          position: 'Gestor de Proyectos',
          profile: 'Recurso Funcional',
          month_1: {
            sem2: { dedication: '0%', color: '#4285F4' },
            sem4: { dedication: '0%', color: '#4285F4' }
          },
          month_2: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_3: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_4: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_5: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_6: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          }
        },
        {
          name: 'David Humberto Rodriguez Venegas',
          position: 'Gestor de Proyectos',
          profile: 'Recurso Funcional',
          month_1: {
            sem2: { dedication: '0%', color: '#4285F4' },
            sem4: { dedication: '0%', color: '#4285F4' }
          },
          month_2: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_3: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_4: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_5: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_6: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          }
        },
        {
          name: 'David Humberto Rodriguez Venegas',
          position: 'Gestor de Proyectos',
          profile: 'Recurso Funcional',
          month_1: {
            sem2: { dedication: '0%', color: '#4285F4' },
            sem4: { dedication: '0%', color: '#4285F4' }
          },
          month_2: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_3: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_4: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_5: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_6: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          }
        }
      ]
    },
    {
      project_name: 'EDI', 
      months: {
        month_1: 'Ene-21',
        month_2: 'Feb-21',
        month_3: 'Mar-21',
        month_4: 'Abr-21',
        month_5: 'May-21',
        month_6: 'Jun-21'
      },
      dataSource: [
        {
          name: 'David Fernando Guerrero Alvarez',
          position: 'Director Logística',
          profile: 'Sponsor',
          month_1: {
            sem2: { dedication: '25%', color: '#4285F4' },
            sem4: { dedication: '25%', color: '#4285F4' }
          },
          month_2: {
            sem2: { dedication: '25%', color: '#02B7AC' },
            sem4: { dedication: '25%', color: '#02B7AC' }
          },
          month_3: {
            sem2: { dedication: '25%', color: '#02B7AC' },
            sem4: { dedication: '25%', color: '#02B7AC' }
          },
          month_4: {
            sem2: { dedication: '27%', color: '#02B7AC' },
            sem4: { dedication: '27%', color: '#F4B400' }
          },
          month_5: {
            sem2: { dedication: '27%', color: '#F4B400' },
            sem4: { dedication: '27%', color: '#F4B400' }
          },
          month_6: {
            sem2: { dedication: '27%', color: '#F4B400' },
            sem4: { dedication: '27%', color: '#F4B400' }
          }
        },
        {
          name: 'Denis Alexander Rodriguez Venegas',
          position: 'Gestor de Proyectos',
          profile: 'Líder Funcional',
          month_1: {
            sem2: { dedication: '30%', color: '#4285F4' },
            sem4: { dedication: '30%', color: '#4285F4' }
          },
          month_2: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '35%', color: '#02B7AC' }
          },
          month_3: {
            sem2: { dedication: '35%', color: '#02B7AC' },
            sem4: { dedication: '40%', color: '#02B7AC' }
          },
          month_4: {
            sem2: { dedication: '25%', color: '#02B7AC' },
            sem4: { dedication: '27%', color: '#F4B400' }
          },
          month_5: {
            sem2: { dedication: '27%', color: '#F4B400' },
            sem4: { dedication: '27%', color: '#F4B400' }
          },
          month_6: {
            sem2: { dedication: '27%', color: '#F4B400' },
            sem4: { dedication: '27%', color: '#F4B400' }
          }
        },
        {
          name: 'David Humberto Rodriguez Venegas',
          position: 'Gestor de Proyectos',
          profile: 'Pmo Asignado',
          month_1: {
            sem2: { dedication: '0%', color: '#4285F4' },
            sem4: { dedication: '0%', color: '#4285F4' }
          },
          month_2: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_3: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_4: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_5: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_6: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          }
        },
        {
          name: 'David Humberto Rodriguez Venegas',
          position: 'Gestor de Proyectos',
          profile: 'Pmo Apoyo',
          month_1: {
            sem2: { dedication: '0%', color: '#4285F4' },
            sem4: { dedication: '0%', color: '#4285F4' }
          },
          month_2: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_3: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_4: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_5: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_6: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          }
        },
        {
          name: 'David Humberto Rodriguez Venegas',
          position: 'Gestor de Proyectos',
          profile: 'Recurso Funcional',
          month_1: {
            sem2: { dedication: '0%', color: '#4285F4' },
            sem4: { dedication: '0%', color: '#4285F4' }
          },
          month_2: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_3: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_4: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_5: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_6: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          }
        },
        {
          name: 'Gabriel Enrique Cardenas Santana',
          position: 'Gestor de Proyectos',
          profile: 'Recurso Funcional',
          month_1: {
            sem2: { dedication: '0%', color: '#4285F4' },
            sem4: { dedication: '0%', color: '#4285F4' }
          },
          month_2: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_3: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '30%', color: '#02B7AC' }
          },
          month_4: {
            sem2: { dedication: '30%', color: '#02B7AC' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_5: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          },
          month_6: {
            sem2: { dedication: '0%', color: '#F4B400' },
            sem4: { dedication: '0%', color: '#F4B400' }
          }
        }
      ]
    },
  ]

  phases: any = [
    {
      name: 'Factibilidad',
      color: '#4285F4'
    },
    {
      name: 'Inicio',
      color: '#02B7AC'
    },
    {
      name: 'Planeación',
      color: '#F4B400'
    },
    {
      name: 'Ejecución',
      color: '#04C200'
    },
    {
      name: 'Cierre',
      color: '#E1675D'
    },
    {
      name: 'BAU',
      color: '#EB8E01'
    },
  ]

  userID: any;
  profileID: any;
  actions!: Actions;

  ngOnInit(): void {
    this.actions = JSON.parse(localStorage.access_to_accions);
    if (this.actions == null){
      this.actions = new Actions();
    }
    this.userID = JSON.parse(localStorage.user).id;
    this.profileID = JSON.parse(localStorage.user).profile_id;
    
    this.mainService.showLoading();

    this.route.data.subscribe((data: any) => {
      this.projects = data.projects;
      this.areas = data.areas;
      this.resources = data.resources;
      this.filters();
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });
  }
  
  filters() {
    this.filterProjects = this.projectsControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ||  value == null? value : value!.title),
      map(name => name ? this._filter(name, 'project') : this.projects.slice())
    );

    this.filterAreas = this.areasControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ||  value == null ? value : value!.title),
      map(name => name ? this._filter(name, 'area') : this.areas.slice())
    );

    this.filterResources = this.resourcesControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ||  value == null ? value : value!.full_name),
      map(name => name ? this._filter(name, 'resource') : this.resources.slice())
    );
  }

  displayProject(project: Project): string {
    return project && project.title ? project.title : '';
  }

  displayAreas(area: Area): string {
    return area && area.title ? area.title : '';
  }

  displayResources(resource: Person): string {
    return resource && resource.full_name ? resource.full_name : '';
  }

  private _filter(value: string, type: string): string[] {
    const filterValue = value.toLowerCase();
    if(type == 'project') {
      return this.projects.filter((project :any) => project.title.toLowerCase().indexOf(filterValue) === 0);
    } else if(type == 'resource') {
      return this.resources.filter((resource :any) => resource.full_name.toLowerCase().indexOf(filterValue) === 0);
    } else if(type == 'area') {
      return this.areas.filter((area :any) => area.title.toLowerCase().indexOf(filterValue) === 0);
    } else {
      return [];
    }
  }
  
  filter() {
    let project = "";
    let area = ""
    let resource = "";
    let start_date = "";
    let end_date = "";

    if(typeof this.projectsControl.value == 'object' && this.projectsControl.value != null) {
      environment.consoleMessage(this.projectsControl.value, "Proyecto Seleccionado");
      project = this.projectsControl.value.id;
    }

    if(typeof this.areasControl.value == 'object' && this.areasControl.value != null) {
      environment.consoleMessage(this.areasControl.value, "Área Seleccionada");
      area = this.areasControl.value.id;
    }

    if(typeof this.resourcesControl.value == 'object' && this.resourcesControl.value != null) {
      environment.consoleMessage(this.resourcesControl.value, "Recurso Seleccionado");
      resource = this.resourcesControl.value.id;
    }

    if(this.filtersGroup.get('start_date')?.value != '' && this.filtersGroup.get('start_date')?.value != null){
      environment.consoleMessage(this.parseDate(this.filtersGroup.get('start_date')?.value),"Fecha inicio");
      start_date = this.parseDate(this.filtersGroup.get('start_date')?.value);
    }

    if(this.filtersGroup.get('end_date')?.value != '' && this.filtersGroup.get('end_date')?.value != null){
      environment.consoleMessage(this.parseDate(this.filtersGroup.get('end_date')?.value),"Fecha fin");
      end_date = this.parseDate(this.filtersGroup.get('end_date')?.value);
    }

    environment.consoleMessage(project, "Id Project");
    environment.consoleMessage(area, "Id Area");
    environment.consoleMessage(resource, "Id Resource");
    environment.consoleMessage(start_date + " - " + end_date, "Rango fecha");
  }

  removeValueGroup() {
    this.projectsControl.reset();
    this.areasControl.reset();
    this.resourcesControl.reset();
    this.filtersGroup.reset();

    this.filters();
  }

  getMessageError(field: string, labelField: string): string {
    let message!: string;

    if (this.filtersGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    this.indexTab =  tabChangeEvent.index;
    if(this.indexTab == 1) {
      this.openAnalytics();
    }
  }
  
  openAnalytics() {

  }

  parseDate(date: any): string {
    if (date == '' || date == undefined || date == null){
      return '';
    }
    if (date + "" != "Invalid Date" ){
      let d!: Date;
      try {
        d = new Date(date);
      } catch {
        d = new Date();
      } finally {
          return `${this.datepipe.transform( d, 'yyyy-MM-dd')}`;
      }
    } else {
      return "";
    }
  }
}