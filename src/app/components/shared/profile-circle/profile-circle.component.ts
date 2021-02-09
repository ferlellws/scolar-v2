import { Component, Input, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorsService } from 'src/app/services/colors.service';

@Component({
  selector: 'tecno-profile-circle',
  templateUrl: './profile-circle.component.html',
  styleUrls: ['./profile-circle.component.scss']
})
export class ProfileCircleComponent implements OnInit {

  colors: Color[] = []

  @Input() user: any;
  @Input() size: number = 110;

  constructor(
    private _colorsService: ColorsService
  ) {}

  ngOnInit(): void {
    if (this.size == null){
      this.size = 35;
    }

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
