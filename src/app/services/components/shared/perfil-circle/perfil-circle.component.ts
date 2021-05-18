import { Component, Input, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorsService } from 'src/app/services/colors.service';

@Component({
  selector: 'tecno-perfil-circle',
  templateUrl: './perfil-circle.component.html',
  styleUrls: ['./perfil-circle.component.scss']
})
export class PerfilCircleComponent implements OnInit {

  colors: Color[] = []  

  @Input() user: any;
  @Input() size: number = 35;

  constructor(
    private _colorsService: ColorsService
  ) {}

  ngOnInit(): void {
    this.colors = this._colorsService.getColors();
  }

  getIniciales(){
    if(this.user != null){
      return `${this.user.firstname[0].toUpperCase()}${this.user.lastname[0].toUpperCase()}`;
    }else{
      return "";
    }
  }

}
