import { Component, Inject, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected";
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_material from "@amcharts/amcharts4/themes/material";


@Component({
  selector: 'tecno-gephi',
  templateUrl: './gephi.component.html',
  styleUrls: ['./gephi.component.scss']
})
export class GephiComponent {

  private chart!: am4charts.XYChart;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone
  ) {}


  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    // Chart code goes in here
    this.browserOnly(() => {
      // Themes begin
      am4core.useTheme(am4themes_material);
      am4core.useTheme(am4themes_animated);
      // Themes end

      let chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);

      let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

      chart.zoomable = true;

      chart.data = [{
        "name": "First",
        "children": [{
          "name": "A1", "linkWidth": 5, "children": [{
            "name": "A1-1", "value": 10, "linkWidth": 5
          }, {
            "name": "A1-2", "value": 30,
            "link": ["A2-3"]
          }, {
            "name": "A1-3", "value": 20,
            "link": ["A3-2"]
          }]
        }, {
          "name": "A2", "children": [{
            "name": "A2-1", "value": 40,
            "link": ["A3-3"]
          }, {
            "name": "A2-2", "value": 30
          }, {
            "name": "A2-3", "value": 10
          }]
        }, {
          "name": "A3", "children": [{
            "name": "A3-1", "value": 5
          }, {
            "name": "A3-2", "value": 20
          }, {
            "name": "A3-3", "value": 20
          }]
        }]
      }];

      // Set up data fields
      networkSeries.dataFields.value = "value";
      networkSeries.dataFields.name = "name";
      networkSeries.dataFields.children = "children";
      networkSeries.dataFields.id = "name";
      networkSeries.dataFields.linkWith = "link";
      networkSeries.links.template.propertyFields.strokeWidth = "linkWidth";

      // Add labels
      networkSeries.nodes.template.label.text = "{name}";
      networkSeries.nodes.template.tooltipText = "{name}: [bold]{value}[/]";
      networkSeries.fontSize = 10;
      networkSeries.minRadius = 15;
      networkSeries.maxRadius = 40;
      networkSeries.centerStrength = 0.5;

      // this.chart = chart;
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
