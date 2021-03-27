import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tecno-page-form',
  templateUrl: './page-form.component.html',
  styleUrls: ['./page-form.component.scss']
})
export class PageFormComponent implements OnInit {

  value = 'Limpiar';

  @Input() fForm: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
