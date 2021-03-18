import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu';

export interface Page {
  id: number;
  name: string;
  description: string;
  route: string;
  ordering: number;
  is_active: boolean;
  bg_color: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly API = `${environment.API}/menus`;
  private _menu: Menu[] = [];
  private _oOption!: Page;
  emitOption = new EventEmitter<any>();

  inputParams: any = {
    user_email: "",
    user_token: ""
  };

  httpOptions!: any;

  menuFull!: Menu[]
  // = [
  //   {
  //     module: {
  //       id: 1,
  //       name: "Parametrización",
  //       is_active: true,
  //       created_at: "2020-12-04T09:24:24.000Z",
  //       updated_at: "2020-12-04T09:24:24.000Z"
  //     },
  //     pages: [
  //       {
  //         id: 1,
  //         name: "Vicepresidencias",
  //         description: "Registro de Vicepresidencias",
  //         menu_module_id: 1,
  //         route: "/vice-presidencies",
  //         ordering: 1,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 2,
  //         name: "Proveedores",
  //         description: "Registro de Proveedores",
  //         menu_module_id: 1,
  //         route: "/companies",
  //         ordering: 2,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 3,
  //         name: "Tipos de Proveedor",
  //         description: "Registro Tipo de compañias",
  //         menu_module_id: 1,
  //         route: "/company-types",
  //         ordering: 3,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 4,
  //         name: "Fases",
  //         description: "Registr Tipo de Fases",
  //         menu_module_id: 1,
  //         route: "/phases",
  //         ordering: 4,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 5,
  //         name: "Estados",
  //         description: "Registro de Tipo de Estados",
  //         menu_module_id: 1,
  //         route: "/states",
  //         ordering: 5,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 6,
  //         name: "Estados por Fase",
  //         description: "Registro de fases que pueden pertenecer a un estado",
  //         menu_module_id: 1,
  //         route: "/states-by-phases",
  //         ordering: 6,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 7,
  //         name: "Áreas",
  //         description: "Registro de Áreas",
  //         menu_module_id: 1,
  //         route: "/areas",
  //         ordering: 7,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 8,
  //         name: "Gestión",
  //         description: "Registro de Gestión",
  //         menu_module_id: 1,
  //         route: "/managements",
  //         ordering: 8,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 9,
  //         name: "Prioridades",
  //         description: "Registro de Prioridades",
  //         menu_module_id: 1,
  //         route: "/priorities",
  //         ordering: 9,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 10,
  //         name: "Programas",
  //         description: "Registro de Programas",
  //         menu_module_id: 1,
  //         route: "/programs",
  //         ordering: 10,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 11,
  //         name: "Niveles de Riesgo",
  //         description: "Registro de Niveles de Riesgo",
  //         menu_module_id: 1,
  //         route: "risk-levels",
  //         ordering: 11,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 12,
  //         name: "Etapas",
  //         description: "Registro de Etapas",
  //         menu_module_id: 12,
  //         route: "/stages",
  //         ordering: 2,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 13,
  //         name: "Enfoques Estratégicos",
  //         description: "Registro de Enfoques Estratégicos",
  //         menu_module_id: 1,
  //         route: "/strategic-approachs",
  //         ordering: 13,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 14,
  //         name: "Tipificaciones",
  //         description: "Registro de Tipificaciones",
  //         menu_module_id: 1,
  //         route: "/typifications",
  //         ordering: 14,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 15,
  //         name: "Aplicativos",
  //         description: "Registro de Aplicativos",
  //         menu_module_id: 1,
  //         route: "/applications",
  //         ordering: 15,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       }
  //     ]
  //   },
  //   {
  //     module: {
  //       id: 1,
  //       name: "Portafolio de Proyectos",
  //       is_active: true,
  //       created_at: "2020-12-04T09:24:24.000Z",
  //       updated_at: "2020-12-04T09:24:24.000Z"
  //     },
  //     pages: [
  //       {
  //         id: 1,
  //         name: "Portafolio de Proyectos",
  //         description: "Proyectos agrupados por vicepresidencias y áreas",
  //         icon_id: 32,
  //         menu_module_id: 1,
  //         route: "/projects",
  //         ordering: 1,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //     ]
  //   },
  //   {
  //     module: {
  //       id: 2,
  //       name: "Proyectos",
  //       is_active: true,
  //       created_at: "2020-12-04T09:24:24.000Z",
  //       updated_at: "2020-12-04T09:24:24.000Z"
  //     },
  //     pages: [
  //       {
  //         id: 8,
  //         name: "Creación de Proyectos",
  //         description: "Pagina de Proyectos",
  //         icon_id: 32,
  //         menu_module_id: 1,
  //         route: "",
  //         ordering: 1,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 9,
  //         name: "Seguimiento",
  //         description: "Visualizacion y descarga de tiempos",
  //         menu_module_id: 1,
  //         route: "",
  //         ordering: 2,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 10,
  //         name: "Reportes Indicadores",
  //         description: "Visualizacion y descarga de historico statuses",
  //         menu_module_id: 1,
  //         route: "",
  //         ordering: 3,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 11,
  //         name: "Reporte Riesgos",
  //         description: "Visualizacion y descarga de historico statuses",
  //         menu_module_id: 1,
  //         route: "",
  //         ordering: 3,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 12,
  //         name: "Causales de Desviación",
  //         description: "Visualizacion y descarga de historico statuses",
  //         menu_module_id: 1,
  //         route: "",
  //         ordering: 3,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 12,
  //         name: "Interrelaciones",
  //         description: "Visualizacion y descarga de historico statuses",
  //         menu_module_id: 1,
  //         route: "",
  //         ordering: 3,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       }
  //     ]
  //   },
  //   {
  //     module: {
  //       id: 3,
  //       name: "Presupuestos",
  //       is_active: true,
  //       created_at: "2020-12-04T09:24:24.000Z",
  //       updated_at: "2020-12-04T09:24:24.000Z"
  //     },
  //     pages: [
  //       {
  //         id: 13,
  //         name: "Reportes",
  //         description: "",
  //         menu_module_id: 1,
  //         route: "",
  //         ordering: 1,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 14,
  //         name: "Creación Presupuesto",
  //         description: "Registro de compañias",
  //         menu_module_id: 1,
  //         route: "",
  //         ordering: 2,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 15,
  //         name: "Seguimiento Presupuesto",
  //         description: "Tipo de compañias",
  //         menu_module_id: 1,
  //         route: "",
  //         ordering: 2,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       }
  //     ]
  //   },
  //   {
  //     module: {
  //       id: 4,
  //       name: "Seguimiento Proveedores",
  //       is_active: true,
  //       created_at: "2020-12-04T09:24:24.000Z",
  //       updated_at: "2020-12-04T09:24:24.000Z"
  //     },
  //     pages: [
  //       {
  //         id: 16,
  //         name: "Reportes",
  //         description: "",
  //         icon_id: 32,
  //         menu_module_id: 1,
  //         route: "",
  //         ordering: 1,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       }
  //     ]
  //   },
  //   {
  //     module: {
  //       id: 5,
  //       name: "Reportes Comités",
  //       is_active: true,
  //       created_at: "2020-12-04T09:24:24.000Z",
  //       updated_at: "2020-12-04T09:24:24.000Z"
  //     },
  //     pages: [
  //       {
  //         id: 17,
  //         name: "Valorem",
  //         description: "Reportes Valorem de todos los proyectos agrupados por Lineamiento Estratégico",
  //         icon_id: 32,
  //         menu_module_id: 1,
  //         route: "/project-progress-report",
  //         ordering: 1,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 18,
  //         name: "Comité Directivo",
  //         description: "",
  //         menu_module_id: 1,
  //         route: "",
  //         ordering: 1,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       },
  //       {
  //         id: 19,
  //         name: "PMO",
  //         description: "",
  //         menu_module_id: 1,
  //         route: "",
  //         ordering: 1,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       }
  //     ]
  //   },
  //   {
  //     module: {
  //       id: 6,
  //       name: "Procesos",
  //       is_active: true,
  //       created_at: "2020-12-04T09:24:24.000Z",
  //       updated_at: "2020-12-04T09:24:24.000Z"
  //     },
  //     pages: [
  //       {
  //         id: 20,
  //         name: "Macro Proceso",
  //         description: "",
  //         menu_module_id: 1,
  //         route: "",
  //         ordering: 1,
  //         icon_id: 32,
  //         is_active: true,
  //         bg_color: "#F44336",
  //         created_at: "2020-12-04T09:24:24.000Z",
  //         updated_at: "2020-12-04T09:24:24.000Z"
  //       }
  //     ]
  //   },
  // ];

  // httpOptions: { headers: HttpHeaders; } = {
  //   headers: new HttpHeaders({
  //     Authorization: `Bareer ${sessionStorage.token}`
  //   })
  // };

  constructor(private http: HttpClient) {


    // this.getFullMenu();
  }

  getFullMenu() {
    if (localStorage.user) {
      this.inputParams.user_email = JSON.parse(localStorage.user).email;
      this.inputParams.user_token = JSON.parse(localStorage.user).authentication_token;
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer ${localStorage.token}`
      }),
      params: this.inputParams
    };


    return this.http.get<Menu[]>(`${this.API}/index`, this.httpOptions)
      .pipe(
        // catchError(this.handleError)
        tap((data: any) => this._menu = data)
        // tap(console.log)
      );
    // return this.menuFull;
  }

  get getMenu(): Menu [] { return this._menu }

  get getOption(): any { return this._oOption }

  set setMenu(menu: Menu []) { this._menu = menu }

  set setOption(oOption: any) { this._oOption = oOption }

  getOptionByRoute(route: string) :any{
    // if (route.includes("projects-by-vicepresidency")) {
    //   true; //environment.consoleMessage("RUTAS ");
    //   var oOptionPbV: Page = {
    //     id: 0,
    //     name: 'Proyectos por Vicepresidencias',
    //     description: 'Proyectos filtrados por vicepresidencias y clasificados por áreas',
    //     route: '',
    //     ordering: 0,
    //     is_active: true,
    //     bg_color: '',
    //     created_at: '',
    //     updated_at: '',
    //   }
    //   this.emitOption.emit(oOptionPbV);
    //   return true;
    // }

    // if (route.includes("project-details")) {
    //   true; //environment.consoleMessage("RUTAS ");
    //   var oOptionPD: Page = {
    //     id: 0,
    //     name: 'Detalle de Proyecto',
    //     description: 'Descripción de parametros del proyecto',
    //     route: '',
    //     ordering: 0,
    //     is_active: true,
    //     bg_color: '',
    //     created_at: '',
    //     updated_at: '',
    //   }
    //   this.emitOption.emit(oOptionPD);
    //   return true;
    // }

    let oOption: Page = {
      id: 0,
      name: '',
      description: '',
      route: '',
      ordering: 0,
      is_active: true,
      bg_color: '',
      created_at: '',
      updated_at: '',
    };
    this._menu.filter(data => {
      data.pages.forEach(page => {
        if (route === page.route) {
          oOption = page;
        }
      });

    });

    if (oOption) {
      this.emitOption.emit(oOption);
    }

    // return oOption;
  }

  // async getMenu(): Promise<Menu[]> {

  //   if (sessionStorage.id == null) {
  //     return [];
  //   } else {
  //     // this.httpOptions = {
  //     //   headers: new HttpHeaders({
  //     //     Authorization: `Bareer ${sessionStorage.token}`
  //     //   })
  //     // };
  //     const t = await this.http.get<Menu[]>(`${this.API}/menu_user/${sessionStorage.id}`, this.httpOptions)
  //     .pipe(
  //       // catchError(this.handleError)
  //       tap(console.log)
  //     ).toPromise();
  //     return t;
  //   }

  // }
}
