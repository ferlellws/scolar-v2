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
          description: "Registro de compañias",
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
          description: "Tipo de compañias",
          sysmodule_id: 1,
          route: "/company-types",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 4,
          title: "Fases",
          description: "Tipo de fases",
          sysmodule_id: 1,
          route: "/phases",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 5,
          title: "Estados",
          description: "Tipo de estados",
          sysmodule_id: 1,
          route: "/states",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Aplicativos",
          description: "Tipo de estados",
          sysmodule_id: 1,
          route: "/applications",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Áreas",
          description: "Tipo de estados",
          sysmodule_id: 1,
          route: "",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Gestión",
          description: "Tipo de estados",
          sysmodule_id: 1,
          route: "",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Prioridades",
          description: "Tipo de estados",
          sysmodule_id: 1,
          route: "",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Programas",
          description: "Tipo de estados",
          sysmodule_id: 1,
          route: "",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Niveles de Riesgo",
          description: "Tipo de estados",
          sysmodule_id: 1,
          route: "",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Etapas",
          description: "Tipo de estados",
          sysmodule_id: 1,
          route: "",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Enfoques Estratégicos",
          description: "Tipo de estados",
          sysmodule_id: 1,
          route: "",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Tipificaciones",
          description: "Tipo de estados",
          sysmodule_id: 1,
          route: "/applications",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 7,
          title: "Proyectos",
          description: "Pagina en la que se pueden visualizar, crear y administrar proyectos",
          sysmodule_id: 1,
          route: "/projects",
          order_menu: 7,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        }
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
          title: "Nuevos Proyectos",
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
          description: "Registro de Vicepresidencias",
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
          description: "Registro de Vicepresidencias",
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
          description: "Registro de Vicepresidencias",
          sysmodule_id: 1,
          route: "",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 18,
          title: "Comité Directivo",
          description: "Registro de Vicepresidencias",
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
          description: "Registro de Vicepresidencias",
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
          description: "Registro de Vicepresidencias",
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

  getOptionByRoute(route: string) {
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

    console.log(route);
    if (route === '/home') {
      oOption.title = "Home";
      oOption.description = "";
    }

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
