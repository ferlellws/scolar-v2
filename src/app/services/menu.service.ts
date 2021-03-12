import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu';

export interface Page {
  id: number;
  title: string;
  description: string;
  sysmodule_id: number;
  route: string;
  order_menu: number;
  is_active: boolean;
  bg_color: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly API = `${environment.API}/users`;
  private _menu: Menu[] = [];
  private _oOption!: Page;
  emitOption = new EventEmitter<any>();

  menuFull: Menu[] = [
    {    
      module: {
        id: 1,
        title: "Parametrización",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 1,
          title: "Vicepresidencias",
          description: "Registro de Vicepresidencias",
          sysmodule_id: 1,
          route: "/vice-presidencies",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 2,
          title: "Proveedores",
          description: "Registro de Proveedores",
          sysmodule_id: 1,
          route: "/companies",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 3,
          title: "Tipos de Proveedor",
          description: "Registro Tipo de compañias",
          sysmodule_id: 1,
          route: "/company-types",
          order_menu: 3,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 4,
          title: "Fases",
          description: "Registr Tipo de Fases",
          sysmodule_id: 1,
          route: "/phases",
          order_menu: 4,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 5,
          title: "Estados",
          description: "Registro de Tipo de Estados",
          sysmodule_id: 1,
          route: "/states",
          order_menu: 5,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Estados por Fase",
          description: "Registro de fases que pueden pertenecer a un estado",
          sysmodule_id: 1,
          route: "/states-by-phases",
          order_menu: 6,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 7,
          title: "Áreas",
          description: "Registro de Áreas",
          sysmodule_id: 1,
          route: "/areas",
          order_menu: 7,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 8,
          title: "Gestión",
          description: "Registro de Gestión",
          sysmodule_id: 1,
          route: "/managements",
          order_menu: 8,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 9,
          title: "Prioridades",
          description: "Registro de Prioridades",
          sysmodule_id: 1,
          route: "/priorities",
          order_menu: 9,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 10,
          title: "Programas",
          description: "Registro de Programas",
          sysmodule_id: 1,
          route: "/programs",
          order_menu: 10,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 11,
          title: "Niveles de Riesgo",
          description: "Registro de Niveles de Riesgo",
          sysmodule_id: 1,
          route: "/risk-levels",
          order_menu: 11,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 12,
          title: "Etapas",
          description: "Registro de Etapas",
          sysmodule_id: 12,
          route: "/stages",
          order_menu: 12,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 13,
          title: "Enfoques Estratégicos",
          description: "Registro de Enfoques Estratégicos",
          sysmodule_id: 1,
          route: "/strategic-approachs",
          order_menu: 13,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 14,
          title: "Tipificaciones",
          description: "Registro de Tipificaciones",
          sysmodule_id: 1,
          route: "/typifications",
          order_menu: 14,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 15,
          title: "Aplicativos",
          description: "Registro de Aplicativos",
          sysmodule_id: 1,
          route: "/applications",
          order_menu: 15,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        }
      ]
    },
    {
      module: {
        id: 1,
        title: "Portafolio de Proyectos",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 1,
          title: "Portafolio de Proyectos",
          description: "Proyectos agrupados por vicepresidencias y áreas",
          sysmodule_id: 1,
          route: "/projects",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
      ]
    },
    {
      module: {
        id: 2,
        title: "Proyectos",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 8,
          title: "Creación de Proyectos",
          description: "Pagina de Proyectos",
          sysmodule_id: 1,
          route: "",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 9,
          title: "Seguimiento",
          description: "Visualizacion y descarga de tiempos",
          sysmodule_id: 1,
          route: "",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 10,
          title: "Reportes Indicadores",
          description: "Visualizacion y descarga de historico statuses",
          sysmodule_id: 1,
          route: "",
          order_menu: 3,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 11,
          title: "Reporte Riesgos",
          description: "Visualizacion y descarga de historico statuses",
          sysmodule_id: 1,
          route: "",
          order_menu: 3,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 12,
          title: "Causales de Desviación",
          description: "Visualizacion y descarga de historico statuses",
          sysmodule_id: 1,
          route: "",
          order_menu: 3,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 12,
          title: "Interrelaciones",
          description: "Visualizacion y descarga de historico statuses",
          sysmodule_id: 1,
          route: "",
          order_menu: 3,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        }
      ]
    },
    {
      module: {
        id: 3,
        title: "Presupuestos",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 13,
          title: "Reportes",
          description: "",
          sysmodule_id: 1,
          route: "",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 14,
          title: "Creación Presupuesto",
          description: "Registro de compañias",
          sysmodule_id: 1,
          route: "",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 15,
          title: "Seguimiento Presupuesto",
          description: "Tipo de compañias",
          sysmodule_id: 1,
          route: "",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        }
      ]
    },
    {
      module: {
        id: 4,
        title: "Seguimiento Proveedores",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 16,
          title: "Reportes",
          description: "",
          sysmodule_id: 1,
          route: "",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        }
      ]
    },
    {
      module: {
        id: 5,
        title: "Reportes Comités",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 17,
          title: "Valorem",
          description: "Reportes Valorem de todos los proyectos agrupados por Lineamiento Estratégico",
          sysmodule_id: 1,
          route: "/project-progress-report",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 18,
          title: "Comité Directivo",
          description: "",
          sysmodule_id: 1,
          route: "",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 19,
          title: "PMO",
          description: "",
          sysmodule_id: 1,
          route: "",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        }
      ]
    },
    {
      module: {
        id: 6,
        title: "Procesos",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 20,
          title: "Macro Proceso",
          description: "",
          sysmodule_id: 1,
          route: "",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        }
      ]
    },
  ];

  httpOptions: { headers: HttpHeaders; } = {
    headers: new HttpHeaders({
      Authorization: `Bareer ${sessionStorage.token}`
    })
  };

  constructor(private http: HttpClient) {
    this._menu = this.getFullMenu();
  }

  getFullMenu() {
    return this.menuFull;
  }

  get getMenu(): Menu [] { return this._menu }

  get getOption(): any { return this._oOption }

  set setMenu(menu: Menu []) { this._menu = menu }

  set setOption(oOption: any) { this._oOption = oOption }

  getOptionByRoute(route: string) :any{
    if (route.includes("projects-by-vicepresidency")) {
      true; //environment.consoleMessage("RUTAS ");
      var oOptionPbV: Page = {
        id: 0,
        title: 'Proyectos por Vicepresidencias',
        description: 'Proyectos filtrados por vicepresidencias y clasificados por áreas',
        sysmodule_id: 0,
        route: '',
        order_menu: 0,
        is_active: true,
        bg_color: '',
        created_at: '',
        updated_at: '',
      }
      this.emitOption.emit(oOptionPbV);
      return true;
    }

    if (route.includes("project-details")) {
      true; //environment.consoleMessage("RUTAS ");
      var oOptionPD: Page = {
        id: 0,
        title: 'Detalle de Proyecto',
        description: 'Descripción de parametros del proyecto',
        sysmodule_id: 0,
        route: '',
        order_menu: 0,
        is_active: true,
        bg_color: '',
        created_at: '',
        updated_at: '',
      }
      this.emitOption.emit(oOptionPD);
      return true;
    }

    let oOption: Page = {
      id: 0,
      title: '',
      description: '',
      sysmodule_id: 0,
      route: '',
      order_menu: 0,
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
