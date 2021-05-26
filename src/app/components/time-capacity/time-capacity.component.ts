import { type } from '@amcharts/amcharts4/core';
import { DatePipe } from '@angular/common';
import { Component, NgZone, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { Actions } from 'src/app/models/actions';
import { Area } from 'src/app/models/area';
import { Person } from 'src/app/models/person';
import { Project } from 'src/app/models/project';
import { VicePresidency } from 'src/app/models/vice-presidency';
import { MainService } from 'src/app/services/main.service';
import { PersonsService } from 'src/app/services/persons.service';
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
    private fg: FormBuilder ,
    private personsService:PersonsService
  ) {
    this.filtersGroup = this.fg.group({
      start_date: null,
      end_date: null
    });
  }

  labelButton = {
    remove: "Limpiar Filtros",
    filter: "Filtrar"
  }

  indexTab = 0;
  //Filtros Recursoso Portafolio
  filtersGroup!: FormGroup;
  projectsControl = new FormControl();
  filterProjects!: Observable<Project[]>;
  projects: any[] = [];

  areasControl = new FormControl();
  filterAreas!: Observable<Area[]>;
  areas: any[] = [];

  resourcesControl = new FormControl();
  filterResources!: Observable<Person[]>;
  resources: any[] = [];

  //Filtros Analítica
  projectsControl2 = new FormControl();
  filterProjects2!: Observable<Project[]>;
  projects2: any[] = [];

  areasControl2 = new FormControl();
  filterAreas2!: Observable<Area[]>;
  areas2: any[] = [];

  vicepresidencyControl = new FormControl();
  filterVicepresidency!: Observable<VicePresidency[]>;
  vicepresidency: any[] = [];

  tabAnalitycs: boolean = false;

  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10];

  // MatPaginator Output
  pageEvent!: PageEvent;

  dataResourceOutArea:any = [
    {
      infoGeneral: {
        projectName: 'Tiempos y Turnos Fase 1',
        vicepresidency: 'Presidencia',
        area: 'Aplicaciones',
        resources: 3
      },
      infoTable: {
        headers: [
          'Recurso',
          'Vicepresidencia',
          'Área',
          'Cargo',
          'Rol Proyecto'
        ],
        dataTable: [
          {
            resource: 'David Fernando Guerrero Álvarez',
            vicepresidency: 'Vp Comercial',
            area: 'Ventas',
            position: 'Analista',
            rol: 'Pmo asignado'
          },
          {
            resource: 'Denis Alexander Rodriguez Venegas',
            vicepresidency: 'Presidencia',
            area: 'Sistemas',
            position: 'Gestor de Proyectos',
            rol: 'Pmo Apoyo'
          },
          {
            resource: 'Jonathan Ricardo Galvis Galvez',
            vicepresidency: 'Presidencia',
            area: 'Expación',
            position: 'Gestor de Proyectos',
            rol: 'Líder Funcional'
          },
          {
            resource: 'David Fernando Guerrero Álvarez',
            vicepresidency: 'Vp Comercial',
            area: 'Ventas',
            position: 'Analista',
            rol: 'Pmo asignado'
          },
          {
            resource: 'Denis Alexander Rodriguez Venegas',
            vicepresidency: 'Presidencia',
            area: 'Sistemas',
            position: 'Gestor de Proyectos',
            rol: 'Pmo Apoyo'
          },
          {
            resource: 'Jonathan Ricardo Galvis Galvez',
            vicepresidency: 'Presidencia',
            area: 'Expación',
            position: 'Gestor de Proyectos',
            rol: 'Líder Funcional'
          },
          {
            resource: 'David Fernando Guerrero Álvarez',
            vicepresidency: 'Vp Comercial',
            area: 'Ventas',
            position: 'Analista',
            rol: 'Pmo asignado'
          },
          {
            resource: 'Denis Alexander Rodriguez Venegas',
            vicepresidency: 'Presidencia',
            area: 'Sistemas',
            position: 'Gestor de Proyectos',
            rol: 'Pmo Apoyo'
          },
          {
            resource: 'Jonathan Ricardo Galvis Galvez',
            vicepresidency: 'Presidencia',
            area: 'Expación',
            position: 'Gestor de Proyectos',
            rol: 'Líder Funcional'
          }
        ]
      }
    },
    {
      infoGeneral: {
        projectName: 'EDI',
        vicepresidency: 'Vp Comercial',
        area: 'Calidad',
        resources: 2
      },
      infoTable: {
        headers: [
          'Recurso',
          'Vicepresidencia',
          'Área',
          'Cargo',
          'Rol Proyecto'
        ],
        dataTable: [
          {
            resource: 'Julian Felipe Martinez Ocampo',
            vicepresidency: 'Vp Comercial',
            area: 'Marketing',
            position: 'Analista',
            rol: 'Recurso Funcional'
          },
          {
            resource: 'Javier Andres Valencia Ortiz',
            vicepresidency: 'Presidencia',
            area: 'Fonkoba',
            position: 'Gestor de Proyectos',
            rol: 'Recurso Funcional'
          }
        ]
      }
    }
  ];

  tableTimeLine:any = [
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
            sem2: { dedication: '', color: '' },
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
            sem2: { dedication: '', color: '' },
            sem4: { dedication: '', color: '' }
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

  conventions: any = [
    {
      name: '0% a 39%',
      color: '#04C200'
    },
    {
      name: '40% a 49%',
      color: '#F4B400'
    },
    {
      name: '50% a 70%',
      color: '#EB8E01'
    },
    {
      name: '70% en adelante',
      color: '#E1675D'
    }
  ]

  tableTop10Ocupation:any = [
    {
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
          month_1: {
            sem2: { dedication: '39%', color: '#04C200' },
            sem4: { dedication: '62%', color: '#EB8E01' }
          },
          month_2: {
            sem2: { dedication: '68%', color: '#EB8E01' },
            sem4: { dedication: '68%', color: '#EB8E01' }
          },
          month_3: {
            sem2: { dedication: '85%', color: '#E1675D' },
            sem4: { dedication: '85%', color: '#E1675D' }
          },
          month_4: {
            sem2: { dedication: '27%', color: '#04C200' },
            sem4: { dedication: '27%', color: '#04C200' }
          },
          month_5: {
            sem2: { dedication: '27%', color: '#04C200' },
            sem4: { dedication: '27%', color: '#04C200' }
          },
          month_6: {
            sem2: { dedication: '27%', color: '#04C200' },
            sem4: { dedication: '27%', color: '#04C200' }
          }
        },
        {
          name: 'Denis Alexander Rodriguez Venegas',
          position: 'Gestor de Proyectos',
          month_1: {
            sem2: { dedication: '30%', color: '#04C200' },
            sem4: { dedication: '30%', color: '#04C200' }
          },
          month_2: {
            sem2: { dedication: '30%', color: '#04C200' },
            sem4: { dedication: '35%', color: '#04C200' }
          },
          month_3: {
            sem2: { dedication: '35%', color: '#04C200' },
            sem4: { dedication: '40%', color: '#02B7AC' }
          },
          month_4: {
            sem2: { dedication: '25%', color: '#04C200' },
            sem4: { dedication: '27%', color: '#04C200' }
          },
          month_5: {
            sem2: { dedication: '27%', color: '#04C200' },
            sem4: { dedication: '27%', color: '#04C200' }
          },
          month_6: {
            sem2: { dedication: '27%', color: '#04C200' },
            sem4: { dedication: '27%', color: '#04C200' }
          }
        },
        {
          name: 'David Humberto Rodriguez Venegas',
          position: 'Gestor de Proyectos',
          month_1: {
            sem2: { dedication: '0%', color: '#04C200' },
            sem4: { dedication: '0%', color: '#04C200' }
          },
          month_2: {
            sem2: { dedication: '30%', color: '#04C200' },
            sem4: { dedication: '30%', color: '#04C200' }
          },
          month_3: {
            sem2: { dedication: '30%', color: '#04C200' },
            sem4: { dedication: '30%', color: '#04C200' }
          },
          month_4: {
            sem2: { dedication: '30%', color: '#04C200' },
            sem4: { dedication: '0%', color: '#04C200' }
          },
          month_5: {
            sem2: { dedication: '0%', color: '#04C200' },
            sem4: { dedication: '0%', color: '#04C200' }
          },
          month_6: {
            sem2: { dedication: '0%', color: '#04C200' },
            sem4: { dedication: '0%', color: '#04C200' }
          }
        }
      ]
    }
  ];

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
      // this.resources = data.resources;
      this.personsService.getPersons()
        .subscribe(res => {
          this.resources = res;

          this.filterResources = this.resourcesControl.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ||  value == null ? value : value!.full_name),
            map(name => name ? this._filter(name, 'resource') : this.resources.slice())
          );
        });
      this.filters();

      this.vicepresidency = data.vicepresidencies;
      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });
  }

  paginator(event: PageEvent) {
    environment.consoleMessage(event.pageSize, "Size");
    environment.consoleMessage(event.pageIndex, "Index");
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

  displayVicepresidency(vicepresidency: VicePresidency): string {
    return vicepresidency && vicepresidency.title ? vicepresidency.title : '';
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
  
  filterResorucePortfolio() {
    let project = "";
    let area = ""
    let resource = "";
    let start_date = "";
    let end_date = "";

    if(typeof this.projectsControl.value == 'object' && this.projectsControl.value != null) {
      project = this.projectsControl.value.id;
    }

    if(typeof this.areasControl.value == 'object' && this.areasControl.value != null) {
      area = this.areasControl.value.id;
    }

    if(typeof this.resourcesControl.value == 'object' && this.resourcesControl.value != null) {
      resource = this.resourcesControl.value.id;
    }

    if(this.filtersGroup.get('start_date')?.value != '' && this.filtersGroup.get('start_date')?.value != null){
      start_date = this.parseDate(this.filtersGroup.get('start_date')?.value);
    }

    if(this.filtersGroup.get('end_date')?.value != '' && this.filtersGroup.get('end_date')?.value != null){
      end_date = this.parseDate(this.filtersGroup.get('end_date')?.value);
    }
  }

  removeFilterResourcePortfolio() {
    this.projectsControl.reset();
    this.areasControl.reset();
    this.resourcesControl.reset();
    this.filtersGroup.reset();

    this.filters();
  }

  viceSelect() {
    this.filterVicepresidency = this.vicepresidencyControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ||  value == null ? value : value!.title),
      map(name => name ? this._filter(name, 'area') : this.vicepresidency.slice())
    );
    this.areasControl2.reset();
  }

  areasSelect() {
    if(typeof this.vicepresidencyControl.value == 'object' && this.vicepresidencyControl.value != null) {
      this.areas2 = this.areas.filter((area: any) => area.vice_presidency.id == this.vicepresidencyControl.value.id);
    } else {
      this.areas2 = this.areas;
    }

    this.filterAreas2 = this.areasControl2.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ||  value == null ? value : value!.title),
      map(name => name ? this._filter(name, 'area') : this.areas2.slice())
    );
  }

  projectsSelect() {
    if(typeof this.areasControl2.value == 'object' && this.areasControl2.value != null) {
      environment.consoleMessage(this.areasControl2.value.id, "AREAS");
      environment.consoleMessage(this.projects, "PR");
      this.projects2 = this.projects.filter((project: any) => project.area.id == this.areasControl2.value.id);
      environment.consoleMessage(this.projects2, "Filtrado");
    } else {
      this.projects2 = this.projects;
    }

    this.filterProjects2 = this.projectsControl2.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ||  value == null? value : value!.title),
      map(name => name ? this._filter(name, 'project') : this.projects2.slice())
    );
  }

  filterAnalitycs() {
    let vicepresidency = ""
    let area = ""
    let project = "";

    if(typeof this.vicepresidencyControl.value == 'object' && this.vicepresidencyControl.value != null) {
      vicepresidency = this.vicepresidencyControl.value.id;
    }

    if(typeof this.areasControl2.value == 'object' && this.areasControl2.value != null) {
      area = this.areasControl2.value.id;
    }

    if(typeof this.projectsControl2.value == 'object' && this.projectsControl2.value != null) {
      project = this.projectsControl2.value.id;
    }
  }

  removeFilterAnalitycs() {
    this.vicepresidencyControl.reset();
    this.filterVicepresidency = this.vicepresidencyControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ||  value == null ? value : value!.title),
      map(name => name ? this._filter(name, 'area') : this.vicepresidency.slice())
    );
    this.areasControl2.reset();
    this.filterAreas2 = this.areasControl2.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ||  value == null ? value : value!.title),
      map(name => name ? this._filter(name, 'area') : this.areas2.slice())
    );
    this.projectsControl2.reset();
    this.filterProjects2 = this.projectsControl2.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ||  value == null? value : value!.title),
      map(name => name ? this._filter(name, 'project') : this.projects2.slice())
    );
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.indexTab =  tabChangeEvent.index;
    if(this.indexTab == 1) {
      if(!this.tabAnalitycs){
        this.openAnalytics();
      } else {
        environment.consoleMessage("ya hice peticiones");
      }
    }
  }
  
  openAnalytics() {
    environment.consoleMessage("Estoy en el 2do TAB haciendo peticiones");
    this.tabAnalitycs = true;

    
  }

  //................................................................................................................................
  getMessageError(field: string, labelField: string): string {
    let message!: string;

    if (this.filtersGroup.get(field)?.errors?.required) {
      message = `Campo ${labelField} es requerido`
    }

    return message;
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