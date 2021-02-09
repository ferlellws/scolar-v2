import { Injectable } from '@angular/core';
import { Color } from '../models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  private _colors: Color [] = [
    {
      name:'red',
      label: 'Rojo',
      value: '#F44336'
    },
    {
      name:'pink',
      label: 'Rosa',
      value: '#E91E63'
    },
    {
      name:'purple',
      label: 'Morado',
      value: '#9C27B0'
    },
    {
      name:'deep-purple',
      label: 'Morado Oscuro',
      value: '#673AB7'
    },
    {
      name:'indigo',
      label: 'Indigo',
      value: '#3F51B5'
    },
    {
      name:'blue',
      label: 'Azul',
      value: '#2196F3'
    },
    {
      name:'light-blue',
      label: 'Azul Claro',
      value: '#03A9F4'
    },
    {
      name:'cyan',
      label: 'Cyan',
      value: '#00BCD4'
    },
    {
      name:'teal',
      label: 'Verde Azulado',
      value: '#009688'
    },
    {
      name:'green',
      label: 'Verde',
      value: '#4CAF50'
    },
    {
      name:'light-green',
      label: 'Verde Claro',
      value: '#8BC34A'
    },
    {
      name:'lime',
      label: 'Lima',
      value: '#CDDC39'
    },
    {
      name:'yellow',
      label: 'Amarillo',
      value: '#FFEB3B'
    },
    {
      name:'amber',
      label: 'Ambar',
      value: '#FFC107'
    },
    {
      name:'orange',
      label: 'Naranja',
      value: '#FF9800'
    },
    {
      name:'deep-orange',
      label: 'Naranja Oscuro',
      value: '#FF5722'
    },
    {
      name:'brown',
      label: 'Café',
      value: '#795548'
    },
  {
      name:'grey',
      label: 'Gris',
      value: '#9E9E9E'
    },
    {
      name:'blue-grey',
      label: 'Gris Azulado',
      value: '#607D8B'
    },
    {
      name:'black',
      label: 'Negro',
      value: '#000000',
    },
  ];  
  


  constructor() { }

  getColors() {
    return this._colors;
  }

}
