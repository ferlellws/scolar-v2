import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private readonly API = `${environment.API}/users`;

  private _menu: Menu[] = [];
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
          title: "Beneficios",
          description: "Pagina de Beneficios",
          sysmodule_id: 1,
          route: "/vice-presidencies",
          order_menu: 1,
          is_active: true,
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
  };;

  constructor(private http: HttpClient) {
    this._menu = this.getFullMenu();
  }

  getFullMenu() {
    return this.menuFull;
  }

  get getMenu(): Menu [] { return this._menu }

  set setMenu(menu: Menu []) { this._menu = menu }

  getOptionByRoute(route: string) {
    let option: any;
    this._menu.filter(data => {
      option = data.pages.filter(page => page.route === route)
    });

    return option;
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
