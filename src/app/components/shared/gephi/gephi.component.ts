import { Component, EventEmitter, Inject, Input, NgZone, Output, PLATFORM_ID, SimpleChanges } from '@angular/core';
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

  @Input() id!: string;
  @Input() width!: string;
  @Input() height!: string;
  @Input() dataGraph!:any[];
  @Input() minRadius:number = 20;
  @Input() maxRadius:number = 50;
  @Input() distance:number = 3;

  ngOnChanges(changes: SimpleChanges): void {
    //environment.consoleMessage(changes, "changes");
    if(changes.dataGraph != null) {
      this.dataGraph = changes.dataGraph.currentValue;
      this.funcRender();
    } else {
      this.minRadius = changes.minRadius.currentValue;
      this.maxRadius = changes.maxRadius.currentValue;
      this.funcRender();
    }
    
  }

  // Run the function only in the browser
  browserOnly(f: (d :any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f(this);
      });
    }
  }

  ngAfterViewInit() {
    this.funcRender();
  }

  funcRender () {
    var infoNode:any
    // Chart code goes in here
    this.browserOnly((d: any) => {
      // Themes begin
      am4core.useTheme(am4themes_material);
      am4core.useTheme(am4themes_animated);
      // Themes end

      let chart = am4core.create(this.id, am4plugins_forceDirected.ForceDirectedTree);

      let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
      
      chart.legend = new am4charts.Legend();
      chart.zoomable = true;
      chart.mouseWheelBehavior = "none";
      chart.data = this.dataGraph;

      // Set up data fields
      networkSeries.dataFields.value = "value";
      networkSeries.dataFields.name = "name";
      networkSeries.dataFields.children = "children";
      networkSeries.dataFields.id = "name";
      networkSeries.dataFields.linkWith = "link";
      networkSeries.dataFields.fixed = "fixed";
      networkSeries.dataFields.color = "color";
      networkSeries.nodes.template.propertyFields.x = "x";
      networkSeries.nodes.template.propertyFields.y = "y";
      //networkSeries.nodes.template.outerCircle.filters.push(new am4core.DropShadowFilter());
      networkSeries.links.template.propertyFields.strokeWidth = "linkWidth";
      networkSeries.links.template.distance = this.distance;
      //networkSeries.manyBodyStrength = -16;
      //networkSeries.links.template.interactionsEnabled = true;
      
      // Add labels
      networkSeries.nodes.template.label.text = "{name}";
      networkSeries.nodes.template.tooltipText = "{name}: [bold]{value}[/]";
      networkSeries.fontSize = 12;
      networkSeries.minRadius = this.minRadius;
      networkSeries.maxRadius = this.maxRadius;
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

