import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tecno-vice-presidencies-form',
  templateUrl: './vice-presidencies-form.component.html',
  styleUrls: ['./vice-presidencies-form.component.scss']
})
export class VicePresidenciesFormComponent implements OnInit {
  showBtnClose: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
