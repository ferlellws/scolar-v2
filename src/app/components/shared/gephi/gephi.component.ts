import { Component, EventEmitter, Inject, NgZone, Output, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from "@amcharts/amcharts4/themes/material";
import { environment } from 'src/environments/environment';
import { emit } from 'node:process';
import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';


@Component({
  selector: 'tecno-gephi',
  templateUrl: './gephi.component.html',
  styleUrls: ['./gephi.component.scss']
})
export class GephiComponent {

  private chart!: am4charts.XYChart;
  @Output() emitClick: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone
  ) {}

  // Run the function only in the browser
  browserOnly(f: (d :any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f(this);
      });
    }
  }

  ngAfterViewInit() {
    var infoNode:any
    // Chart code goes in here
    this.browserOnly((d: any) => {
      // Themes begin
      am4core.useTheme(am4themes_material);
      am4core.useTheme(am4themes_animated);
      // Themes end

      let chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);

      let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
      
      chart.legend = new am4charts.Legend();

      chart.zoomable = true;

      // chart.data = [
      //   {
      //     "name": "First",
      //     "children": [
      //       {
      //         "name": "A1", "linkWidth": 5, "children": [
      //           {
      //             "name": "A1-1", "value": 10, "linkWidth": 5
      //           },
      //           {
      //             "name": "A1-2", "value": 30,
      //             "link": ["A2-3"]
      //           },
      //           {
      //             "name": "A1-3", "value": 20,
      //             "link": ["A3-2"]
      //           }
      //         ]
      //       },
      //       {
      //         "name": "A2", "children": [
      //           {
      //             "name": "A2-1", "value": 40,
      //             "link": ["A3-3"]
      //           },
      //           {
      //             "name": "A2-2", "value": 30
      //           },
      //           {
      //             "name": "A2-3", "value": 10
      //           }
      //         ]
      //       },
      //       {
      //         "name": "A3", "children": [
      //           {
      //             "name": "A3-1", "value": 5
      //           },
      //           {
      //             "name": "A3-2", "value": 20
      //           },
      //           {
      //             "name": "A3-3", "value": 20
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // ];

      // chart.data = [
      //   {
      //     "name": "Tiempos y Turnos",
      //     "children":
      //     [
      //       {
      //       "name": "Juan", "children": [
      //         {
      //           "name": "EDI", "value": 30,
      //           "link": ["Adriana"]
      //         },
      //         {
      //           "name": "Proyecto 2021", "value": 20,
      //         }
      //       ]
      //     },
      //     {
      //       "name": "Adriana", "children": [
      //         {
      //           "name": "Proyecto 3000", "value": 30
      //         },
      //       ]
      //     }
      //   ]
      // }
      // ]

      chart.data = [
        {
          "name": "2 . Tiempos y turnos Fase 1",
          "link": [
              "11 . Prueba Selects Busquedas Completos",
              "3 . EDI",
              "13 . proyecto 4000",
              "15 . proyecto 2021",
              "5 . 123123asdasd",
              "6 . prueba test",
              "4 . ASDASD",
              "12 . proyecto 5000",
              "7 . asdasd123213",
              "8 . Prueba 2 NO requeridos"
          ],
          "value": 10
      },
      {
          "name": "3 . EDI",
          "link": [
              "2 . Tiempos y turnos Fase 1",
              "11 . Prueba Selects Busquedas Completos",
              "13 . proyecto 4000",
              "5 . 123123asdasd",
              "15 . proyecto 2021",
              "6 . prueba test"
          ],
          "value": 6
      },
      {
          "name": "4 . ASDASD",
          "link": [
              "6 . prueba test",
              "5 . 123123asdasd",
              "2 . Tiempos y turnos Fase 1",
              "9 . Probando cambio",
              "10 . Prueba Select con Busqueda",
              "12 . proyecto 5000",
              "13 . proyecto 4000",
              "14 . proyecto 1000"
          ],
          "value": 8
      },
      {
          "name": "5 . 123123asdasd",
          "link": [
              "6 . prueba test",
              "2 . Tiempos y turnos Fase 1",
              "3 . EDI",
              "4 . ASDASD",
              "7 . asdasd123213",
              "11 . Prueba Selects Busquedas Completos"
          ],
          "value": 6
      },
      {
          "name": "6 . prueba test",
          "link": [
              "5 . 123123asdasd",
              "2 . Tiempos y turnos Fase 1",
              "4 . ASDASD",
              "3 . EDI",
              "15 . proyecto 2021",
              "9 . Probando cambio",
              "10 . Prueba Select con Busqueda",
              "12 . proyecto 5000",
              "13 . proyecto 4000",
              "14 . proyecto 1000"
          ],
          "value": 10
      },
      {
          "name": "7 . asdasd123213",
          "link": [
              "5 . 123123asdasd",
              "11 . Prueba Selects Busquedas Completos",
              "2 . Tiempos y turnos Fase 1"
          ],
          "value": 3
      },
      {
          "name": "8 . Prueba 2 NO requeridos",
          "link": [
              "2 . Tiempos y turnos Fase 1"
          ],
          "value": 1
      },
      {
          "name": "9 . Probando cambio",
          "link": [
              "4 . ASDASD",
              "6 . prueba test",
              "10 . Prueba Select con Busqueda",
              "12 . proyecto 5000",
              "13 . proyecto 4000",
              "14 . proyecto 1000"
          ],
          "value": 6
      },
      {
          "name": "10 . Prueba Select con Busqueda",
          "link": [
              "4 . ASDASD",
              "6 . prueba test",
              "9 . Probando cambio",
              "12 . proyecto 5000",
              "13 . proyecto 4000",
              "14 . proyecto 1000"
          ],
          "value": 6
      },
      {
          "name": "11 . Prueba Selects Busquedas Completos",
          "link": [
              "2 . Tiempos y turnos Fase 1",
              "3 . EDI",
              "5 . 123123asdasd",
              "7 . asdasd123213"
          ],
          "value": 4
      },
      {
          "name": "12 . proyecto 5000",
          "link": [
              "2 . Tiempos y turnos Fase 1",
              "15 . proyecto 2021",
              "4 . ASDASD",
              "6 . prueba test",
              "9 . Probando cambio",
              "10 . Prueba Select con Busqueda",
              "13 . proyecto 4000",
              "14 . proyecto 1000"
          ],
          "value": 8
      },
      {
          "name": "13 . proyecto 4000",
          "link": [
              "3 . EDI",
              "2 . Tiempos y turnos Fase 1",
              "15 . proyecto 2021",
              "4 . ASDASD",
              "6 . prueba test",
              "9 . Probando cambio",
              "10 . Prueba Select con Busqueda",
              "12 . proyecto 5000",
              "14 . proyecto 1000"
          ],
          "value": 9
      },
      {
          "name": "14 . proyecto 1000",
          "link": [
              "4 . ASDASD",
              "6 . prueba test",
              "9 . Probando cambio",
              "10 . Prueba Select con Busqueda",
              "12 . proyecto 5000",
              "13 . proyecto 4000"
          ],
          "value": 6
      },
      {
          "name": "15 . proyecto 2021",
          "link": [
              "2 . Tiempos y turnos Fase 1",
              "13 . proyecto 4000",
              "12 . proyecto 5000",
              "3 . EDI",
              "6 . prueba test"
          ],
          "value": 5
      }
      ]

      // Set up data fields
      networkSeries.dataFields.value = "value";
      networkSeries.dataFields.name = "name";
      networkSeries.dataFields.children = "children";
      networkSeries.dataFields.id = "name";
      networkSeries.dataFields.linkWith = "link";
      networkSeries.links.template.propertyFields.strokeWidth = "linkWidth";
      networkSeries.dataFields.fixed = "fixed";
      networkSeries.dataFields.color = "color";
      networkSeries.nodes.template.propertyFields.x = "x";
      networkSeries.nodes.template.propertyFields.y = "y";

      // Add labels
      networkSeries.nodes.template.label.text = "{name}";
      networkSeries.nodes.template.tooltipText = "{name}: [bold]{value}[/]";
      networkSeries.fontSize = 12;
      networkSeries.minRadius = 20;
      networkSeries.maxRadius = 50;
      networkSeries.centerStrength = 0.5;
      networkSeries.nodes.template.label.hideOversized = true;
      networkSeries.nodes.template.label.truncate = true;
      networkSeries.events.on("inited", function() {
        networkSeries.animate({
          property: "velocityDecay",
          to: 1
        }, 3000);
      });

      var hl = networkSeries.nodes.template.states.create("selected");
      hl.properties.fill = am4core.color("#e91e63");
      
      var selectedNode: any;
      networkSeries.nodes.template.events.on("hit", function(ev) {
        if (selectedNode == ev.target) {
          selectedNode.fill = selectedNode.defaultState.properties.fill;
          selectedNode = undefined;
        }
        else {
          if (selectedNode) {
            selectedNode.fill = selectedNode.defaultState.properties.fill;
          }
          selectedNode = ev.target;
          selectedNode.setState("selected");
          infoNode = selectedNode.group.node.textContent;
          environment.consoleMessage(selectedNode, "Objeto nodo");
          d.emitClick.emit(infoNode);
        }
      });

      
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

}

