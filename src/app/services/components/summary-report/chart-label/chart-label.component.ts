import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tecno-chart-label',
  templateUrl: './chart-label.component.html',
  styleUrls: ['./chart-label.component.scss']
})
export class ChartLabelComponent implements OnInit {

  @Input() results: any[];
  @Input() scheme: any[];

  constructor() { }

  ngOnInit(): void {

    if(this.scheme.length < this.results.length){
      var schemeAux: any[] = [];
      for (let index = 0; index < this.results.length; index++) {
        schemeAux.push(index % this.scheme.length);
      }
      this.scheme = schemeAux;
    }
  }

}
