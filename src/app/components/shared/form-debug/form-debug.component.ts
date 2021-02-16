import { environment } from 'src/environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'tecno-form-debug',
  templateUrl: './form-debug.component.html',
  styleUrls: ['./form-debug.component.scss']
})
export class FormDebugComponent implements OnInit {
  @Input() form!: FormGroup;
  flagShowDebug: boolean = !environment.production;

  constructor() { }

  ngOnInit(): void {
    console.log(this.form);
  }

}
