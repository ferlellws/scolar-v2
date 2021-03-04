import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Area } from 'src/app/models/area';
import { VicePresidency } from 'src/app/models/vice-presidency';
import { AreasService } from 'src/app/services/areas.service';
import { VicePresidenciesService } from 'src/app/services/vice-presidencies.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-areas-by-project',
  templateUrl: './areas-by-project.component.html',
  styleUrls: ['./areas-by-project.component.scss']
})
export class AreasByProjectComponent implements OnInit {

  areas: Area [] = [];
  vicepresidencies: VicePresidency [] = [];
  options: any[] = []

  areasSelected: any[] = [];

  areasForm = new FormControl();

  @Output() emitChange: EventEmitter<any[]> = new EventEmitter();

  constructor(
    private _areasService: AreasService,
    private _vicepresidenciesService: VicePresidenciesService
  ) { }

  async ngOnInit() {
    await this._areasService.getAreasSelect()
    .subscribe(areas => this.areas = areas);
    await this._vicepresidenciesService.getVicePresidenciesSelect()
    .subscribe(vicepresidencies => 
      {
        this.vicepresidencies = vicepresidencies;
        this.options = this.clasifyAreas();
        console.log(this.options);
      });
    
    
  }

  onChangeSelect(){
    var selectedIDs: number [] =this.areasForm.value;
    this.areasSelected = this.areas.filter(area => 
      {
        var areaID: number = -1;
        if(area.id != null){
          areaID = area.id;
        }
        return selectedIDs.includes(areaID);
      });
    for (let index = 0; index < this.areasSelected.length; index++) {
      this.areasSelected[index].vicepresidencyTitle = this.vicepresidencies
      .filter(vicepresidency => this.areasSelected[index].vice_presidency_id == vicepresidency.id)[0].title;
    }
    this.emitChange.emit(this.areasSelected);
  } 

  remove(id: number | undefined){
    this.areasSelected = this.areasSelected.filter(area => area.id != id);
    var selectedIDs: number [] = this.areasForm.value;
    this.areasForm.setValue( selectedIDs.filter( selectedID => selectedID != id));
    this.emitChange.emit(this.areasSelected);
  }

  clasifyAreas(): any[]{
    var result: any[] = []
    for (let index = 0; index < this.vicepresidencies.length; index++) {
      var row: any = {};
      row.title = this.vicepresidencies[index].title;
      row.areas = this.areas.filter(area => area.vice_presidency_id == this.vicepresidencies[index].id)
      result.push(row);
    }
    return result;
  }

}
