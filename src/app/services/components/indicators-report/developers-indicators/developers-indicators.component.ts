import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tecno-developers-indicators',
  templateUrl: './developers-indicators.component.html',
  styleUrls: ['./developers-indicators.component.scss']
})
export class DevelopersIndicatorsComponent implements OnInit {

  @Input() developers: any[];

  constructor() { }

  ngOnInit(): void {
    console.log(`developers`, this.developers);
    
  }

}
