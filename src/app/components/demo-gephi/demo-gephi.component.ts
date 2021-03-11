import { Component, OnInit } from '@angular/core';
// import { * } from 'sigma/types/endpoint';
// import { sigma } from 'sigma-webpack';
// import {  } from 'sigma';
// import * as sigma from 'sigma';
// import * as sigma from 'sigma';

declare var sigma: any;

// var sigma = require('sigma');
// require('../../../../node_modules/sigma/build/plugins/sigma.parsers.json.min.js');
// require("node_modules/sigma/build/plugins/sigma.parsers.json.min.js");

@Component({
  selector: 'tecno-demo-gephi',
  templateUrl: './demo-gephi.component.html',
  styleUrls: ['./demo-gephi.component.scss']
})
export class DemoGephiComponent implements OnInit {
  private sigma: any;

  // sigmaJs = new sigma();

  graph: any = {
    nodes: [
      {id: "n0", label: "A node", x: 0, y: 0, size: 3, color: '#008cc2'},
      {id: "n1", label: "Another node", x: 3, y: 1, size: 2, color: '#008cc2'},
      {id: "n2", label: "And a last one", x: 1, y: 3, size: 1, color: '#E57821'}
    ],
    edges: [
      {id: "e0", source: "n0", target: "n1", color: '#282c34', type: 'line', size: 0.5},
      {id: "e1", source: "n1", target: "n2", color: '#282c34', type: 'curve', size: 1},
      {id: "e2", source: "n2", target: "n0", color: '#FF0000', type: 'line', size: 2}
    ]
  };

  constructor() {
  }

  ngOnInit(): void {
    // this.sigma = sigma();
    // console.log(sigma);

    // sigma.parsers.json(this.graph, {
    //   container: document.getElementById("sigma-container"),
    //   type: 'canvas',
    //   settings: {
    //     defaultNodeColor: '#ec5148'
    //   }
    // })
    this.sigma = sigma(
      {
        renderer: {
          container: document.getElementById("sigma-container"),
          type: 'canvas'
        },
        settings: {}
      }
    );
    this.sigma.graph.read(this.graph);
    this.sigma.refresh();
    console.log(this.sigma)


  }

}
