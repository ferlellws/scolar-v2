import { GoogleChartService } from '../../../../services/google-chart.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { TableData } from 'src/app/models/table-data';
import { environment } from 'src/environments/environment';

export interface VegaSliceTextStyle {
  color: string;
  fontName: string;
  fontSize: string;
}

@Component({
  selector: 'tecno-vega-charts',
  templateUrl: './vega-charts.component.html',
  styleUrls: ['./vega-charts.component.scss']
})
export class VegaChartsComponent implements OnInit {

  @Input() id!: string;
  @Input() title!: string ;
  @Input() dataTable!: any;
  @Input() maxScale: any ;
  @Input() width: any;
  @Input() height: any;
    
  @Input() colors: string [] = [
    '#F44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#03A9F4',
    '#00BCD4',
    '#009688',
    '#4CAF50',
    '#8BC34A',
    '#CDDC39',
    '#FFEB3B',
    '#FFC107',
    '#FF9800',
    '#FF5722'
  ];
  color1 = '#ff4081';
  color2 = '#3f51b5';
  limit = 400;
  numberSize = 15;
  fontSize = 15;
  graphSize = 200;
  private gLib: any;

  constructor(private gChartService : GoogleChartService) {
    this.gLib = this.gChartService.getGoogle();
    this.gLib.charts.load('current', {
      'packages': ['vegachart']
    });
  }

  ngOnInit(): void {
    console.log("dataTable: ", this.dataTable);
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("dataTable: ", this.dataTable);
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  static footerToDataChart(data: TableData): any{
    var keys: string[] = Object.keys(data.footer);
    var total = data.footer[keys[keys.length -1]];
    var result = [];
    result.push(["ColumnHeader1", "ColumnHeader1"]);
    for(let index = 1; index < keys.length -1; index++) {
      result.push(
        [
          data.headers[index],
          parseFloat(((data.footer[keys[index]] / total) * 100).toFixed(1)),
        ]
      );
    }
    return result;
  }

  static TableToChart(dataTable: TableData, keysSelected?: string[]){
    var keysAll = Object.keys(dataTable.dataTable[0]);
    var keys = [];
    //var headers = [];

    if (keysSelected != null){
      //headers.push(dataTable.headers[0]);
      keys.push(keysAll[0]);
      for (let index = 0; index < keysSelected.length; index++) {
        var indexFound = keysAll.indexOf(keysSelected[index]);
        keys.push(keysAll[indexFound]);
        //headers.push(dataTable.headers[indexFound]);
      }
    }else{
      keys = keysAll.slice(0, keysAll.length -1);
      //headers = dataTable.headers.slice(0, keysAll.length -1);
    }

    var result = [];
    //result.push(headers);

    for (let index = 0; index < dataTable.dataTable.length; index++) {
      var arrayAux =[];
      for (let j = 0; j < keys.length; j++) {
        arrayAux.push(dataTable.dataTable[index][keys[j]]);
      }
      result.push(arrayAux);
    }
    
    return result;
  }

  private drawChart() {

    const dataTable = new this.gLib.visualization.DataTable();
        dataTable.addColumn({type: 'string', 'id': 'key'});
        dataTable.addColumn({type: 'number', 'id': 'value'});
        dataTable.addRows(this.dataTable);

    if(dataTable.fg.length > 0 && dataTable.fg.length <= 8) {
      //this.limit = 150;
      this.fontSize = 15;
      this.numberSize = 15;
      this.graphSize = 200;
    } else if (dataTable.fg.length > 8 && dataTable.fg.length <= 13) {
      //this.limit = 200;
      this.fontSize = 12;
      this.numberSize = 12;
      this.graphSize = 250;
      this.width = this.width + 10
      this.height = this.height + 20
    } else {
      //this.limit = 150;
      this.fontSize = 10;
      this.numberSize = 10;
      this.graphSize = 270;
      this.width = this.width + 10
      this.height = this.height + 20
    }

    const options = {
      'vega': {
        "$schema": "https://vega.github.io/schema/vega/v5.json",
        "width": this.width,
        "height": this.height,
        "autosize": "none",
        "title": {
          "text": this.title,
          "anchor": "middle",
          "fontSize": 15,
          "dy": -8,
          "dx": {"signal": "-width/4"},
          //"subtitle": "RDI per 100g"
        },
        "signals": [
          {"name": "radius", "update": this.graphSize}
        ],
        "data": [
          {
            "name": "table",
            "source": "datatable",
          },
          {
            "name": "keys",
            "source": "table",
            "transform": [
              {
                "type": "aggregate",
                "groupby": ["key"]
              }
            ]
          }
        ],
        "scales": [
          {
            "name": "angular",
            "type": "point",
            "range": {"signal": "[-PI, PI]"},
            "padding": 0.5,
            "domain": {"data": "table", "field": "key"}
          },
          {
            "name": "radial",
            "type": "linear",
            "range": {"signal": "[0, radius]"},
            "zero": true,
            "nice": false,
            "domain": [0,this.maxScale],
          }
        ],
        "encode": {
          "enter": {
            "x": {"signal": "width/2"},
            "y": {"signal": "height/2 + 20"}
          }
        },
        "marks": [
          {
            "type": "group",
            "name": "categories",
            "zindex": 1,
            "from": {
              "facet": {"data": "table", "name": "facet", "groupby": ["category"]}
            },
            "marks": [
              {
                "type": "line",
                "name": "category-line",
                "from": {"data": "facet"},
                "encode": {
                  "enter": {
                    "interpolate": {"value": "linear-closed"},
                    "x": {"signal": "scale('radial', datum.value) * cos(scale('angular', datum.key))"},
                    "y": {"signal": "scale('radial', datum.value) * sin(scale('angular', datum.key))"},
                    "stroke": {"value": this.color1},
                    "strokeWidth": {"value": 1.5},
                    "fill": {"value": this.color1},
                    "fillOpacity": {"value": 0.1}
                  }
                }
              },
              {
                "type": "text",
                "name": "value-text",
                "from": {"data": "category-line"},
                "encode": {
                  "enter": {
                    "x": {"signal": "datum.x + 14 * cos(scale('angular', datum.datum.key))"},
                    "y": {"signal": "datum.y + 14 * sin(scale('angular', datum.datum.key))"},
                    "text": {"signal": "datum.datum.value"},
                    "opacity": {"signal": "datum.datum.value > 0.01 ? 1 : 0"},
                    "align": {"value": "center"},
                    "baseline": {"value": "middle"},
                    "fontWeight": {"value": "bold"},
                    "fill": {"value": this.color2},
                    "fontSize": {"value": this.numberSize},
                  }
                }
              }
            ]
          },
          {
            "type": "rule",
            "name": "radial-grid",
            "from": {"data": "keys"},
            "zindex": 0,
            "encode": {
              "enter": {
                "x": {"value": 0},
                "y": {"value": 0},
                "x2": {"signal": "radius * cos(scale('angular', datum.key))"},
                "y2": {"signal": "radius * sin(scale('angular', datum.key))"},
                "stroke": {"value": "lightgray"},
                "strokeWidth": {"value": 1}
              }
            }
          },
          {
            "type": "text",
            "name": "key-label",
            "from": {"data": "keys"},
            "zindex": 1,
            "encode": {
              "enter": {
                "x": {"signal": "(radius + 11) * cos(scale('angular', datum.key))"},
                "y": [
                  {
                    "test": "sin(scale('angular', datum.key)) > 0",
                    "signal": "5 + (radius + 11) * sin(scale('angular', datum.key))"
                  },
                  {
                    "test": "sin(scale('angular', datum.key)) < 0",
                    "signal": "-5 + (radius + 11) * sin(scale('angular', datum.key))"
                  },
                  {
                    "signal": "(radius + 11) * sin(scale('angular', datum.key))"
                  }
                ],
                "text": {"field": "key"},
                "align":
                  {
                    "value": "center"
                  },
                "baseline": [
                  {
                    "test": "scale('angular', datum.key) > 0", "value": "top"
                  },
                  {
                    "test": "scale('angular', datum.key) == 0", "value": "middle"
                  },
                  {
                    "value": "bottom"
                  }
                ],
                "fill": {"value": "black"},
                "fontSize": {"value": this.fontSize},
                "limit": {"value": this.limit},
              }
            }
          },
          {
            "type": "line",
            "name": "twenty-line",
            "from": {"data": "keys"},
            "encode": {
              "enter": {
                "interpolate": {"value": "linear-closed"},
                "x": {"signal": "0.2 * radius * cos(scale('angular', datum.key))"},
                "y": {"signal": "0.2 * radius * sin(scale('angular', datum.key))"},
                "stroke": {"value": "lightgray"},
                "strokeWidth": {"value": 1}
              }
            }
          },
          {
            "type": "line",
            "name": "fourty-line",
            "from": {"data": "keys"},
            "encode": {
              "enter": {
                "interpolate": {"value": "linear-closed"},
                "x": {"signal": "0.4 * radius * cos(scale('angular', datum.key))"},
                "y": {"signal": "0.4 * radius * sin(scale('angular', datum.key))"},
                "stroke": {"value": "lightgray"},
                "strokeWidth": {"value": 1}
              }
            }
          },
          {
            "type": "line",
            "name": "sixty-line",
            "from": {"data": "keys"},
            "encode": {
              "enter": {
                "interpolate": {"value": "linear-closed"},
                "x": {"signal": "0.6 * radius * cos(scale('angular', datum.key))"},
                "y": {"signal": "0.6 * radius * sin(scale('angular', datum.key))"},
                "stroke": {"value": "lightgray"},
                "strokeWidth": {"value": 1}
              }
            }
          },
          {
            "type": "line",
            "name": "eighty-line",
            "from": {"data": "keys"},
            "encode": {
              "enter": {
                "interpolate": {"value": "linear-closed"},
                "x": {"signal": "0.8 * radius * cos(scale('angular', datum.key))"},
                "y": {"signal": "0.8 * radius * sin(scale('angular', datum.key))"},
                "stroke": {"value": "lightgray"},
                "strokeWidth": {"value": 1}
              }
            }
          },
          {
            "type": "line",
            "name": "outer-line",
            "from": {"data": "radial-grid"},
            "encode": {
              "enter": {
                "interpolate": {"value": "linear-closed"},
                "x": {"field": "x2"},
                "y": {"field": "y2"},
                "stroke": {"value": "lightgray"},
                "strokeWidth": {"value": 1}
              }
            }
          }
        ]
      }
    };

    let chart = new this.gLib.visualization.VegaChart(document.getElementById(this.id));

    chart.draw(dataTable, options);
  }

}
