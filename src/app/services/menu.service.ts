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
        title: "Maestros",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 1,
          title: "Vicepresidencias",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi qui praesentium suscipit earum! Ullam possimus",
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
          title: "Tiempos",
          description: "Visualizacion y descarga de tiempos",
          sysmodule_id: 1,
          route: "/times",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 3,
          title: "Statuses",
          description: "Visualizacion y descarga de historico statuses",
          sysmodule_id: 1,
          route: "/statuses",
          order_menu: 3,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 4,
          title: "Requerimientos",
          description: "Visualizacion y descarga de Requerimientos",
          sysmodule_id: 1,
          route: "/items_table",
          order_menu: 4,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 5,
          title: "Summary Report",
          description: "Graficos y tabla resumen",
          sysmodule_id: 1,
          route: "/summary_report",
          order_menu: 5,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Reporte Indicadores",
          description: "Indicadores",
          sysmodule_id: 1,
          route: "/indicators_report",
          order_menu: 6,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 7,
          title: "Proyectos",
          description: "Pagina en la que se pueden visualizar, crear y administrar oriyectos",
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
        id: 1,
        title: "Proyectos",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 1,
          title: "Proyectos",
          description: "Pagina de Proyectos",
          sysmodule_id: 1,
          route: "/projects",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 2,
          title: "Tiempos",
          description: "Visualizacion y descarga de tiempos",
          sysmodule_id: 1,
          route: "/times",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 3,
          title: "Statuses",
          description: "Visualizacion y descarga de historico statuses",
          sysmodule_id: 1,
          route: "/statuses",
          order_menu: 3,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 4,
          title: "Requerimientos",
          description: "Visualizacion y descarga de Requerimientos",
          sysmodule_id: 1,
          route: "/items_table",
          order_menu: 4,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 5,
          title: "Summary Report",
          description: "Graficos y tabla resumen",
          sysmodule_id: 1,
          route: "/summary_report",
          order_menu: 5,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Reporte Indicadores",
          description: "Indicadores",
          sysmodule_id: 1,
          route: "/indicators_report",
          order_menu: 6,
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
        title: "Proyectos",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 1,
          title: "Proyectos",
          description: "Pagina de Proyectos",
          sysmodule_id: 1,
          route: "/projects",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 2,
          title: "Tiempos",
          description: "Visualizacion y descarga de tiempos",
          sysmodule_id: 1,
          route: "/times",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 3,
          title: "Statuses",
          description: "Visualizacion y descarga de historico statuses",
          sysmodule_id: 1,
          route: "/statuses",
          order_menu: 3,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 4,
          title: "Requerimientos",
          description: "Visualizacion y descarga de Requerimientos",
          sysmodule_id: 1,
          route: "/items_table",
          order_menu: 4,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 5,
          title: "Summary Report",
          description: "Graficos y tabla resumen",
          sysmodule_id: 1,
          route: "/summary_report",
          order_menu: 5,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Reporte Indicadores",
          description: "Indicadores",
          sysmodule_id: 1,
          route: "/indicators_report",
          order_menu: 6,
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
        title: "Proyectos",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 1,
          title: "Proyectos",
          description: "Pagina de Proyectos",
          sysmodule_id: 1,
          route: "/projects",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 2,
          title: "Tiempos",
          description: "Visualizacion y descarga de tiempos",
          sysmodule_id: 1,
          route: "/times",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 3,
          title: "Statuses",
          description: "Visualizacion y descarga de historico statuses",
          sysmodule_id: 1,
          route: "/statuses",
          order_menu: 3,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 4,
          title: "Requerimientos",
          description: "Visualizacion y descarga de Requerimientos",
          sysmodule_id: 1,
          route: "/items_table",
          order_menu: 4,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 5,
          title: "Summary Report",
          description: "Graficos y tabla resumen",
          sysmodule_id: 1,
          route: "/summary_report",
          order_menu: 5,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Reporte Indicadores",
          description: "Indicadores",
          sysmodule_id: 1,
          route: "/indicators_report",
          order_menu: 6,
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
        title: "Proyectos",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 1,
          title: "Proyectos",
          description: "Pagina de Proyectos",
          sysmodule_id: 1,
          route: "/projects",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 2,
          title: "Tiempos",
          description: "Visualizacion y descarga de tiempos",
          sysmodule_id: 1,
          route: "/times",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 3,
          title: "Statuses",
          description: "Visualizacion y descarga de historico statuses",
          sysmodule_id: 1,
          route: "/statuses",
          order_menu: 3,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 4,
          title: "Requerimientos",
          description: "Visualizacion y descarga de Requerimientos",
          sysmodule_id: 1,
          route: "/items_table",
          order_menu: 4,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 5,
          title: "Summary Report",
          description: "Graficos y tabla resumen",
          sysmodule_id: 1,
          route: "/summary_report",
          order_menu: 5,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Reporte Indicadores",
          description: "Indicadores",
          sysmodule_id: 1,
          route: "/indicators_report",
          order_menu: 6,
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
        title: "Proyectos",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 1,
          title: "Proyectos",
          description: "Pagina de Proyectos",
          sysmodule_id: 1,
          route: "/projects",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 2,
          title: "Tiempos",
          description: "Visualizacion y descarga de tiempos",
          sysmodule_id: 1,
          route: "/times",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 3,
          title: "Statuses",
          description: "Visualizacion y descarga de historico statuses",
          sysmodule_id: 1,
          route: "/statuses",
          order_menu: 3,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 4,
          title: "Requerimientos",
          description: "Visualizacion y descarga de Requerimientos",
          sysmodule_id: 1,
          route: "/items_table",
          order_menu: 4,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 5,
          title: "Summary Report",
          description: "Graficos y tabla resumen",
          sysmodule_id: 1,
          route: "/summary_report",
          order_menu: 5,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Reporte Indicadores",
          description: "Indicadores",
          sysmodule_id: 1,
          route: "/indicators_report",
          order_menu: 6,
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
        title: "Proyectos",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 1,
          title: "Proyectos",
          description: "Pagina de Proyectos",
          sysmodule_id: 1,
          route: "/projects",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 2,
          title: "Tiempos",
          description: "Visualizacion y descarga de tiempos",
          sysmodule_id: 1,
          route: "/times",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 3,
          title: "Statuses",
          description: "Visualizacion y descarga de historico statuses",
          sysmodule_id: 1,
          route: "/statuses",
          order_menu: 3,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 4,
          title: "Requerimientos",
          description: "Visualizacion y descarga de Requerimientos",
          sysmodule_id: 1,
          route: "/items_table",
          order_menu: 4,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 5,
          title: "Summary Report",
          description: "Graficos y tabla resumen",
          sysmodule_id: 1,
          route: "/summary_report",
          order_menu: 5,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Reporte Indicadores",
          description: "Indicadores",
          sysmodule_id: 1,
          route: "/indicators_report",
          order_menu: 6,
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
        title: "Proyectos",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 1,
          title: "Proyectos",
          description: "Pagina de Proyectos",
          sysmodule_id: 1,
          route: "/projects",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 2,
          title: "Tiempos",
          description: "Visualizacion y descarga de tiempos",
          sysmodule_id: 1,
          route: "/times",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 3,
          title: "Statuses",
          description: "Visualizacion y descarga de historico statuses",
          sysmodule_id: 1,
          route: "/statuses",
          order_menu: 3,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 4,
          title: "Requerimientos",
          description: "Visualizacion y descarga de Requerimientos",
          sysmodule_id: 1,
          route: "/items_table",
          order_menu: 4,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 5,
          title: "Summary Report",
          description: "Graficos y tabla resumen",
          sysmodule_id: 1,
          route: "/summary_report",
          order_menu: 5,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Reporte Indicadores",
          description: "Indicadores",
          sysmodule_id: 1,
          route: "/indicators_report",
          order_menu: 6,
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
        title: "Proyectos",
        icon_id: 32,
        is_active: true,
        created_at: "2020-12-04T09:24:24.000Z",
        updated_at: "2020-12-04T09:24:24.000Z"
      },
      pages: [
        {
          id: 1,
          title: "Proyectos",
          description: "Pagina de Proyectos",
          sysmodule_id: 1,
          route: "/projects",
          order_menu: 1,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 2,
          title: "Tiempos",
          description: "Visualizacion y descarga de tiempos",
          sysmodule_id: 1,
          route: "/times",
          order_menu: 2,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 3,
          title: "Statuses",
          description: "Visualizacion y descarga de historico statuses",
          sysmodule_id: 1,
          route: "/statuses",
          order_menu: 3,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 4,
          title: "Requerimientos",
          description: "Visualizacion y descarga de Requerimientos",
          sysmodule_id: 1,
          route: "/items_table",
          order_menu: 4,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 5,
          title: "Summary Report",
          description: "Graficos y tabla resumen",
          sysmodule_id: 1,
          route: "/summary_report",
          order_menu: 5,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        },
        {
          id: 6,
          title: "Reporte Indicadores",
          description: "Indicadores",
          sysmodule_id: 1,
          route: "/indicators_report",
          order_menu: 6,
          is_active: true,
          bg_color: "#F44336",
          created_at: "2020-12-04T09:24:24.000Z",
          updated_at: "2020-12-04T09:24:24.000Z"
        }
      ]
    }
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
