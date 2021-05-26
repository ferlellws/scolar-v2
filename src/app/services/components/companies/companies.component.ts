import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tecno-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
  showInput: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
