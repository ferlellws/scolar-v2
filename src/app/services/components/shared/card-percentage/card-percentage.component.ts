import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tecno-card-percentage',
  templateUrl: './card-percentage.component.html',
  styleUrls: ['./card-percentage.component.scss']
})
export class CardPercentageComponent implements OnInit {
  @Input() label: string;
  @Input() percentage: string;
  @Input() labelPercentage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
