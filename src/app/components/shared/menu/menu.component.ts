import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { UserService } from 'src/app/services/user.service';
import { IconsService } from 'src/app/services/icons.service';
import { Icon } from 'src/app/models/icon';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'tecno-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  icons: Icon[] = [];
  // menu: Menu[] = [];
  menu: Menu[] = [
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
  getmenusSuccses: boolean = false;
  panelOpenState: boolean [] = []; // Array de flags para saber si esta abierto o no un panel
  // panelOpenState: boolean = false;
  moduleSelected: number = 0;

  constructor(
    private _menu: MenuService,
    private router: Router,
    private _iconsService: IconsService
  ) {}

  ngOnInit(): void {
    this._iconsService.getIcons()
      .subscribe(icons => this.icons = icons);

    this.getMenu();
  }

  getMenu(): Menu[] {
    // if (sessionStorage.menuLoaded != null) {
    //   if (!this.getmenusSuccses) {
    //     this._usersService.getMenu().then(menu =>
    //       {
    //         this.menu = menu;
    //         this.getmenusSuccses = true;
    //       }
    //     );
    //   }

      // Se inicializa dinámicamente el Array de flags en false después de obtener la cantidad de modulos del menu
      this.menu.forEach(module => this.panelOpenState.push(false));
      return this.menu;
    // }
  }

  onOpenOption(index: number) {
    this.panelOpenState[index] = true;
  }

  onCloseOption(index: number) {
    this.panelOpenState[index] = false;
  }

  getIcon(id: number) {
    return this.icons.filter(icon => icon.id == id)[0].title;
  }

  go(route: string) {
    this.router.navigate([route])
  }

}
