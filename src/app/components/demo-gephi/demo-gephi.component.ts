import { Component, OnInit } from '@angular/core';
// import * as go from 'gojs'

@Component({
  selector: 'tecno-demo-gephi',
  templateUrl: './demo-gephi.component.html',
  styleUrls: ['./demo-gephi.component.scss']
})
export class DemoGephiComponent implements OnInit {

  // public model: go.TreeModel = new go.TreeModel(
  //   [
  //     { 'key': 1, 'name': 'Stella Payne Diaz', 'title': 'CEO' },
  //     { 'key': 2, 'name': 'Luke Warm', 'title': 'VP Marketing/Sales', 'parent': 1 },
  //     { 'key': 3, 'name': 'Meg Meehan Hoffa', 'title': 'Sales', 'parent': 2 },
  //     { 'key': 4, 'name': 'Peggy Flaming', 'title': 'VP Engineering', 'parent': 1 },
  //     { 'key': 5, 'name': 'Saul Wellingood', 'title': 'Manufacturing', 'parent': 4 },
  //     { 'key': 6, 'name': 'Al Ligori', 'title': 'Marketing', 'parent': 2 },
  //     { 'key': 7, 'name': 'Dot Stubadd', 'title': 'Sales Rep', 'parent': 3 },
  //     { 'key': 8, 'name': 'Les Ismore', 'title': 'Project Mgr', 'parent': 5 },
  //     { 'key': 9, 'name': 'April Lynn Parris', 'title': 'Events Mgr', 'parent': 6 },
  //     { 'key': 10, 'name': 'Xavier Breath', 'title': 'Engineering', 'parent': 4 },
  //     { 'key': 11, 'name': 'Anita Hammer', 'title': 'Process', 'parent': 5 },
  //     { 'key': 12, 'name': 'Billy Aiken', 'title': 'Software', 'parent': 10 },
  //     { 'key': 13, 'name': 'Stan Wellback', 'title': 'Testing', 'parent': 10 },
  //     { 'key': 14, 'name': 'Marge Innovera', 'title': 'Hardware', 'parent': 10 },
  //     { 'key': 15, 'name': 'Evan Elpus', 'title': 'Quality', 'parent': 5 },
  //     { 'key': 16, 'name': 'Lotta B. Essen', 'title': 'Sales Rep', 'parent': 3 }
  //   ]
  // );
// ;

  constructor() {}

  ngOnInit(): void {}

  // private sigma: any;

  // // sigmaJs = new sigma();

  // graph: any = {
  //   nodes: [
  //     {id: "n0", label: "A node", x: 0, y: 0, size: 3, color: '#008cc2'},
  //     {id: "n1", label: "Another node", x: 3, y: 1, size: 2, color: '#008cc2'},
  //     {id: "n2", label: "And a last one", x: 1, y: 3, size: 1, color: '#E57821'}
  //   ],
  //   edges: [
  //     {id: "e0", source: "n0", target: "n1", color: '#282c34', type: 'line', size: 0.5},
  //     {id: "e1", source: "n1", target: "n2", color: '#282c34', type: 'curve', size: 1},
  //     {id: "e2", source: "n2", target: "n0", color: '#FF0000', type: 'line', size: 2}
  //   ]
  // };

  // constructor() {
  // }

  // ngOnInit(): void {
  //   // this.sigma = sigma();
  //   // console.log(sigma);

  //   // sigma.parsers.json(this.graph, {
  //   //   container: document.getElementById("sigma-container"),
  //   //   type: 'canvas',
  //   //   settings: {
  //   //     defaultNodeColor: '#ec5148'
  //   //   }
  //   // })
  //   console.log(document.getElementById("sigma-container"));

  //   this.sigma = sigma(
  //     {
  //       renderer: {
  //         container: document.getElementById("sigma-container"),
  //         type: 'canvas'
  //       },
  //       settings: {}
  //     }
  //   );
  //   this.sigma.graph.read(this.graph);
  //   this.sigma.refresh();
  //   console.log(this.sigma)


  // }

  // public visNetwork: string = 'networkId1';
  // public visNetworkData!: Data;
  // public nodes: DataSet<any>;
  // public edges: DataSet<any>;
  // public visNetworkOptions!: Options;

  // public constructor(private visNetworkService: VisNetworkService) {}

  // public addNode(): void {
  //   const lastId = this.nodes.length;
  //   const newId = this.nodes.length + 1;
  //   this.nodes.add({ id: newId, label: 'New Node' });
  //   this.edges.add({ from: lastId, to: newId });
  //   this.visNetworkService.fit(this.visNetwork);
  // }

  // public networkInitialized(): void {
  //   // now we can use the service to register on events
  //   this.visNetworkService.on(this.visNetwork, 'click');

  //   // open your console/dev tools to see the click params
  //   this.visNetworkService.click.subscribe((eventData: any[]) => {
  //     if (eventData[0] === this.visNetwork) {
  //       console.log(eventData[1]);
  //     }
  //   });
  // }

  // public ngOnInit(): void {
  //   this.nodes = new DataSet<any>([
  //     { id: '1', label: 'Node 1' },
  //     { id: '2', label: 'Node 2' },
  //     { id: '3', label: 'Node 3' },
  //     { id: '4', label: 'Node 4' },
  //     { id: '5', label: 'Node 5', title: 'Title of Node 5' }
  //   ]);
  //   this.edges = new DataSet<any>([
  //     { from: '1', to: '2' },
  //     { from: '1', to: '3' },
  //     { from: '2', to: '4' },
  //     { from: '2', to: '5' }
  //   ]);
  //   this.visNetworkData = { nodes: this.nodes, edges: this.edges };

  //   this.visNetworkOptions = {};
  // }

  // public ngOnDestroy(): void {
  //   this.visNetworkService.off(this.visNetwork, 'click');
  // }

}
