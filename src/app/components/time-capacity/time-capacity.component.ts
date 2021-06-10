import { indexOf } from '@amcharts/amcharts4/.internal/core/utils/Array';
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
import { TimeCapacityService } from 'src/app/services/time-capacity.service';
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
    private personsService:PersonsService,
    private timeCapacityService:TimeCapacityService
  ) {
    this.filtersGroup = this.fg.group({
      start_date: null,
      end_date: null
    });
  }

  labelButton = {
    remove: "Ver Todo",
    filter: "Filtrar"
  }
  
  cargaProject: boolean = false;
  cargaAnalitycs: boolean = false;

  indexTab = 0;

  stepOutArea = -1;
  stepTop5Area = -1;
  stepTop5AreaResource = -1;

  projects: any[] = [];
  vicepresidency: any[] = [];
  areas: any[] = [];

  //Filtros Recursoso Portafolio
  filtersGroup!: FormGroup;
  projectsControl = new FormControl();
  filterProjects!: Observable<Project[]>;
  projects1: any[] = [];
  
  vicepresidencyControl = new FormControl();
  filterVicepresidency!: Observable<VicePresidency[]>;
  vicepresidency1: any[] = [];

  areasControl = new FormControl();
  filterAreas!: Observable<Area[]>;
  areas1: any[] = [];

  resourcesControl = new FormControl();
  filterResources!: Observable<Person[]>;
  resources: any[] = [];

  vice_presidency_filter1 = "";
  area_filter1 = ""
  project_filter1 = "";
  resource_filter1 = "";
  start_date_filter1 = "";
  end_date_filter1 = "";

  vice_presidency_filter2 = "";
  area_filter2 = ""
  project_filter2 = "";

  //Filtros Analítica
  projectsControl2 = new FormControl();
  filterProjects2!: Observable<Project[]>;
  projects2: any[] = [];

  areasControl2 = new FormControl();
  filterAreas2!: Observable<Area[]>;
  areas2: any[] = [];

  vicepresidencyControl2 = new FormControl();
  filterVicepresidency2!: Observable<VicePresidency[]>;
  vicepresidency2: any[] = [];

  tabAnalitycs: boolean = false;

  // MatPaginator Inputs Resources Portafolio
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [1, 5, 10, 20 ,50, 100];
  pageSizeResourcePortafolio: number = 5;
  pageIndexResourcePortafolio: number = 0;

  // MatPaginator Inputs Analitycs
  lengthAnalitycs = 100;
  pageSizeAnalitycs = 5;
  pageSizeOptionsAnalitycs: number[] = [5, 10, 20, 50, 100];

  dataResourceOutArea:any = [];

  tableTimeLine = [];

  phases: any = []

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

  tableTop10Ocupation: any = [];
  // tableTop10Ocupation:any = [
  //   {
  //     months: {
  //       month_1: 'Ene-21',
  //       month_2: 'Feb-21',
  //       month_3: 'Mar-21',
  //       month_4: 'Abr-21',
  //       month_5: 'May-21',
  //       month_6: 'Jun-21',
  //     },
  //     dataSource: [
  //       {
  //         name: 'David Fernando Guerrero Alvarez',
  //         position: 'Director Logística',
  //         month_1: {
  //           block_1: { dedication: '39%', color: '#04C200' },
  //           block_2: { dedication: '62%', color: '#EB8E01' }
  //         },
  //         month_2: {
  //           block_1: { dedication: '68%', color: '#EB8E01' },
  //           block_2: { dedication: '68%', color: '#EB8E01' }
  //         },
  //         month_3: {
  //           block_1: { dedication: '85%', color: '#E1675D' },
  //           block_2: { dedication: '85%', color: '#E1675D' }
  //         },
  //         month_4: {
  //           block_1: { dedication: '27%', color: '#04C200' },
  //           block_2: { dedication: '27%', color: '#04C200' }
  //         },
  //         month_5: {
  //           block_1: { dedication: '27%', color: '#04C200' },
  //           block_2: { dedication: '27%', color: '#04C200' }
  //         },
  //         month_6: {
  //           block_1: { dedication: '27%', color: '#04C200' },
  //           block_2: { dedication: '27%', color: '#04C200' }
  //         }
  //       },
  //       {
  //         name: 'Denis Alexander Rodriguez Venegas',
  //         position: 'Gestor de Proyectos',
  //         month_1: {
  //           block_1: { dedication: '30%', color: '#04C200' },
  //           block_2: { dedication: '30%', color: '#04C200' }
  //         },
  //         month_2: {
  //           block_1: { dedication: '30%', color: '#04C200' },
  //           block_2: { dedication: '35%', color: '#04C200' }
  //         },
  //         month_3: {
  //           block_1: { dedication: '35%', color: '#04C200' },
  //           block_2: { dedication: '40%', color: '#02B7AC' }
  //         },
  //         month_4: {
  //           block_1: { dedication: '25%', color: '#04C200' },
  //           block_2: { dedication: '27%', color: '#04C200' }
  //         },
  //         month_5: {
  //           block_1: { dedication: '27%', color: '#04C200' },
  //           block_2: { dedication: '27%', color: '#04C200' }
  //         },
  //         month_6: {
  //           block_1: { dedication: '27%', color: '#04C200' },
  //           block_2: { dedication: '27%', color: '#04C200' }
  //         }
  //       },
  //       {
  //         name: 'David Humberto Rodriguez Venegas',
  //         position: 'Gestor de Proyectos',
  //         month_1: {
  //           block_1: { dedication: '0%', color: '#04C200' },
  //           block_2: { dedication: '0%', color: '#04C200' }
  //         },
  //         month_2: {
  //           block_1: { dedication: '30%', color: '#04C200' },
  //           block_2: { dedication: '30%', color: '#04C200' }
  //         },
  //         month_3: {
  //           block_1: { dedication: '30%', color: '#04C200' },
  //           block_2: { dedication: '30%', color: '#04C200' }
  //         },
  //         month_4: {
  //           block_1: { dedication: '30%', color: '#04C200' },
  //           block_2: { dedication: '0%', color: '#04C200' }
  //         },
  //         month_5: {
  //           block_1: { dedication: '0%', color: '#04C200' },
  //           block_2: { dedication: '0%', color: '#04C200' }
  //         },
  //         month_6: {
  //           block_1: { dedication: '0%', color: '#04C200' },
  //           block_2: { dedication: '0%', color: '#04C200' }
  //         }
  //       }
  //     ]
  //   }
  // ];

  dataTop5Areas:any = [
    {
      infoGeneral: {
        vicepresidency: 'Presidencia',
        area: 'Aplicaciones',
        resources: 2
      },
      infoResources: [
        {
          resource: 'David Fernando Guerrero Álvarez',
          position: 'Analista',
          total_projects: 2,
          infoProjects: [
            'Tiempos y Turnos Fase 1 - Líder Funcional',
            'EDI - Pmo Asignado'
          ]
        },
        {
          resource: 'Denis Alexander Rodriguez Venegas',
          position: 'Jefe de Zona',
          total_projects: 1,
          infoProjects: [
            'Tiempos y Turnos Fase 1 - Líder Funcional',
          ]
        }
      ]
    },
    {
      infoGeneral: {
        vicepresidency: 'Vp Comercial',
        area: 'Marketiong',
        resources: 1
      },
      infoResources: [
        {
          resource: 'David Fernando Guerrero Álvarez',
          position: 'Analista',
          total_projects: 2,
          infoProjects: [
            'Tiempos y Turnos Fase 1 - Líder Funcional',
            'EDI - Pmo Asignado'
          ]
        }
      ]
    }
  ];

  userID: any;
  profileID: any;
  actions!: Actions;

  flagLabel: boolean = true;

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
      this.vicepresidency = data.vicepresidencies;
      this.areas = data.areas;
      this.phases = data.phases;

      this.personsService.getPeopleSelect()
        .subscribe(res => {
          this.resources = res;

          this.filterResources = this.resourcesControl.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ||  value == null ? value : value!.full_name),
            map(name => name ? this._filter(name, 'resource') : this.resources.slice())
          );
        });

      // this.timeCapacityService.getTimeLineResourcesCapacity("", "", "", "", "", "","", "")
      //   .subscribe(res => {
      //     this.tableTimeLine = res.generalData;
      //     this.cargaProject = true;
      //   });
      this.cargaProject = true;

      this.filters();

      setTimeout(() => {this.mainService.hideLoading()}, 1000);
    });
  }
  
  setStep(index: number, op: string) {
    if(op == "out_area") {
      this.stepOutArea = index;
    } else if(op == "top_areas") {
      this.stepTop5Area = index;
      this.stepTop5AreaResource = -1;
    } else if(op == "top_areas_resources") {
      this.stepTop5AreaResource = index;
    }
  }

  paginatorAnalitycs(event: PageEvent) {
    this.cargaAnalitycs = false;

    this.timeCapacityService.getDatResourcesOutArea(event.pageIndex + 1, event.pageSize,  this.vice_presidency_filter2,this.area_filter2, this.project_filter2)
    .subscribe(res => {
      this.dataResourceOutArea = res.dataResourceOutArea;
      this.cargaAnalitycs= true;
    });    
  }

  paginatorResourcesPortafolio(event: PageEvent) {
    environment.consoleMessage(event.pageSize, "Size");
    environment.consoleMessage(event.pageIndex, "Index");
    // this.pageSizeResourcePortafolio = event.pageSize;
    // this.pageIndexResourcePortafolio = event.pageIndex + 1;
    // this.filterResorucePortfolio();

    this.timeCapacityService.getTimeLineResourcesCapacity(event.pageIndex + 1, event.pageSize, this.vice_presidency_filter1,this.area_filter1, this.project_filter1, this.resource_filter1, this.start_date_filter1, this.end_date_filter1)
      .subscribe(res => {
        this.tableTimeLine = res.generalData;
        this.cargaProject = true;
      });
  }

  filters() {
    this.filterProjects = this.projectsControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ||  value == null? value : value!.title),
      map(name => name ? this._filter(name, 'project') : this.projects.slice())
    );

    this.filterVicepresidency = this.vicepresidencyControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ||  value == null ? value : value!.title),
      map(name => name ? this._filter(name, 'area') : this.vicepresidency.slice())
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
    this.cargaProject = false;
    this.flagLabel = false;
    this.vice_presidency_filter1 = "";
    this.area_filter1 = ""
    this.project_filter1 = "";
    this.resource_filter1 = "";
    this.start_date_filter1 = "";
    this.end_date_filter1 = "";

    
    if(typeof this.vicepresidencyControl.value == 'object' && this.vicepresidencyControl.value != null) {
      this.vice_presidency_filter1 = this.vicepresidencyControl.value.id;
    }
    
    if(typeof this.areasControl.value == 'object' && this.areasControl.value != null) {
      this.area_filter1 = this.areasControl.value.id;
    }
    
    if(typeof this.projectsControl.value == 'object' && this.projectsControl.value != null) {
      this.project_filter1 = this.projectsControl.value.id;
    }

    if(typeof this.resourcesControl.value == 'object' && this.resourcesControl.value != null) {
      this.resource_filter1 = this.resourcesControl.value.id;
    }

    if(this.filtersGroup.get('start_date')?.value != '' && this.filtersGroup.get('start_date')?.value != null){
      this.start_date_filter1 = this.parseDate(this.filtersGroup.get('start_date')?.value);
    }

    if(this.filtersGroup.get('end_date')?.value != '' && this.filtersGroup.get('end_date')?.value != null){
      this.end_date_filter1 = this.parseDate(this.filtersGroup.get('end_date')?.value);
    }

    this.timeCapacityService.getTimeLineResourcesCapacity("", "", this.vice_presidency_filter1,this.area_filter1, this.project_filter1, this.resource_filter1, this.start_date_filter1, this.end_date_filter1)
      .subscribe(res => {
        this.tableTimeLine = res.generalData;
        this.cargaProject = true;
      });

  }

  removeFilterResourcePortfolio() {
    this.cargaProject = false;
    this.flagLabel = false;
    this.projectsControl.reset();
    this.vicepresidencyControl.reset();
    this.areasControl.reset();
    this.resourcesControl.reset();
    this.filtersGroup.reset();

    this.filters();

    this.timeCapacityService.getTimeLineResourcesCapacity("","", "", "", "", "", "", "")
      .subscribe(res => {
        this.tableTimeLine = res.generalData;
        this.cargaProject = true;
      });
  }

  viceSelect(op: number) {
    if(op == 1) {
      this.vicepresidency1 = this.vicepresidency;
      this.filterVicepresidency = this.vicepresidencyControl.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ||  value == null ? value : value!.title),
        map(name => name ? this._filter(name, 'area') : this.vicepresidency1.slice())
      );
      this.areasControl.reset();
      this.projectsControl.reset();
    } else {
      this.vicepresidency2 = this.vicepresidency;
      this.filterVicepresidency2 = this.vicepresidencyControl2.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ||  value == null ? value : value!.title),
        map(name => name ? this._filter(name, 'area') : this.vicepresidency2.slice())
      );
      this.areasControl2.reset();
      this.projectsControl2.reset();
    }

  }

  areasSelect(op: number) {
    if(op == 1) {
      if(typeof this.vicepresidencyControl.value == 'object' && this.vicepresidencyControl.value != null) {
        this.areas1 = this.areas.filter((area: any) => area.vice_presidency.id == this.vicepresidencyControl.value.id);
      } else {
        this.areas1 = this.areas;
      }

      this.filterAreas = this.areasControl.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ||  value == null ? value : value!.title),
        map(name => name ? this._filter(name, 'area') : this.areas1.slice())
      );
      this.projectsControl.reset();

    } else {
      if(typeof this.vicepresidencyControl2.value == 'object' && this.vicepresidencyControl2.value != null) {
        this.areas2 = this.areas.filter((area: any) => area.vice_presidency.id == this.vicepresidencyControl2.value.id);
      } else {
        this.areas2 = this.areas;
      }

      this.filterAreas2 = this.areasControl2.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ||  value == null ? value : value!.title),
        map(name => name ? this._filter(name, 'area') : this.areas2.slice())
      );
      this.projectsControl2.reset();
    }
  }

  projectsSelect(op: number) {
    if(op == 1) {
      this.projects1 = this.projects;
      if(typeof this.vicepresidencyControl.value == 'object' && this.vicepresidencyControl.value != null) {
        this.projects1 = this.projects.filter((project: any) => project.area.vice_presidency.id == this.vicepresidencyControl.value.id);
      }
      if(typeof this.areasControl.value == 'object' && this.areasControl.value != null) {
        this.projects1 = this.projects.filter((project: any) => project.area.id == this.areasControl.value.id);
      }

      this.filterProjects = this.projectsControl.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ||  value == null? value : value!.title),
        map(name => name ? this._filter(name, 'project') : this.projects1.slice())
      );

    } else {
      this.projects2 = this.projects;
      if(typeof this.vicepresidencyControl2.value == 'object' && this.vicepresidencyControl2.value != null) {
        this.projects2 = this.projects.filter((project: any) => project.area.vice_presidency.id == this.vicepresidencyControl2.value.id);
      }
      if(typeof this.areasControl2.value == 'object' && this.areasControl2.value != null) {
        this.projects2 = this.projects.filter((project: any) => project.area.id == this.areasControl2.value.id);
      }

      this.filterProjects2 = this.projectsControl2.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ||  value == null? value : value!.title),
        map(name => name ? this._filter(name, 'project') : this.projects2.slice())
      );
    }
  }

  filterAnalitycs() {
    this.cargaAnalitycs = false;
    this.vice_presidency_filter2 = "";
    this.area_filter2 = "";
    this.project_filter2 = "";

    if(typeof this.vicepresidencyControl2.value == 'object' && this.vicepresidencyControl2.value != null) {
      this.vice_presidency_filter2 = this.vicepresidencyControl2.value.id;
    }

    if(typeof this.areasControl2.value == 'object' && this.areasControl2.value != null) {
      this.area_filter2 = this.areasControl2.value.id;
    }

    if(typeof this.projectsControl2.value == 'object' && this.projectsControl2.value != null) {
      this.project_filter2 = this.projectsControl2.value.id;
    }

    // this.timeCapacityService.getDatResourcesOutArea(1, this.pageSizeAnalitycs, this.vice_presidency_filter2, this.area_filter2, this.project_filter2)
    this.timeCapacityService.getDatResourcesOutArea("", "", this.vice_presidency_filter2, this.area_filter2, this.project_filter2)
      .subscribe(res => {
        this.dataResourceOutArea = res.dataResourceOutArea;
        this.cargaAnalitycs = true;
      });

    this.timeCapacityService.getTopAreaResources("", "", this.vice_presidency_filter2, this.area_filter2, this.project_filter2)
      .subscribe(res => {
        this.dataTop5Areas = res.dataTop5Areas;
        // this.cargaAnalitycs = true;
      });
  }

  removeFilterAnalitycs() {
    this.cargaAnalitycs = false;
    this.vice_presidency_filter2 = "";
    this.area_filter2 = ""
    this.project_filter2 = "";

    this.vicepresidencyControl2.reset();
    this.filterVicepresidency2 = this.vicepresidencyControl2.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ||  value == null ? value : value!.title),
      map(name => name ? this._filter(name, 'area') : this.vicepresidency2.slice())
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

    // this.timeCapacityService.getDatResourcesOutArea(1, this.pageSizeAnalitycs, this.vicepresidency2, this.area_filter2, this.project_filter2)
    this.timeCapacityService.getDatResourcesOutArea("", "", this.vice_presidency_filter2, this.area_filter2, this.project_filter2)
      .subscribe(res => {
        this.dataResourceOutArea = res.dataResourceOutArea;
        this.cargaAnalitycs = true;
      });
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.indexTab =  tabChangeEvent.index;
    if(this.indexTab == 1) {
      if(!this.tabAnalitycs){
        this.openAnalytics();
      }
    }
  }
  
  openAnalytics() {
    this.tabAnalitycs = true;

    // this.timeCapacityService.getDatResourcesOutArea(1, this.pageSizeAnalitycs, "", "", "")
    this.timeCapacityService.getDatResourcesOutArea("", "", "", "", "")
      .subscribe(res => {
        this.dataResourceOutArea = res.dataResourceOutArea;
        // this.cargaAnalitycs = true;
      });

    this.timeCapacityService.getTopAreaResources("", "", "", "", "")
      .subscribe(res => {
        this.dataTop5Areas = res.dataTop5Areas;
        // this.cargaAnalitycs = true;
      });

    this.timeCapacityService.getTopOccupationResource()
      .subscribe(res => {
        this.tableTop10Ocupation = res.tableTop10Ocupation;
        this.cargaAnalitycs = true;
      });
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