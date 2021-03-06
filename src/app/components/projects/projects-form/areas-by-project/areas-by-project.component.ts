import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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

  @Input() areasSelected: any[] = [];

  areasForm = new FormControl();

  @Output() emitChange: EventEmitter<any[]> = new EventEmitter();

  constructor(
    private _areasService: AreasService,
    private _vicepresidenciesService: VicePresidenciesService
  ) { }

  async ngOnInit() {
    await this._areasService.getAreasSelect()
    .subscribe(areas => {
      this.areas = areas;
      environment.consoleMessage(this.areas, "areas >> abp")
      this._vicepresidenciesService.getVicePresidenciesSelect()
      .subscribe(vicepresidencies => 
        {
          this.vicepresidencies = vicepresidencies;
          this.options = this.clasifyAreas();
          environment.consoleMessage(this.options, "this.options >> abp")
          console.log(this.options);
          this.areasForm.setValue(selectedIDs);
          for (let index = 0; index < this.areasSelected.length; index++) {
            this.areasSelected[index].vicepresidencyTitle = this.vicepresidencies
            .filter(vicepresidency => this.areasSelected[index].vice_presidency!.id == vicepresidency.id)[0].title;
          }
        });
    });
    
    var selectedIDs: number[] = this.areasSelected.map(area => area.id!);
    true;//environment.consoleMessage(selectedIDs, "selectedIDs areas")
   
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.areasSelected = changes.areasSelected.currentValue;
    var selectedIDs: number[] = this.areasSelected.map(area => area.id!);
    true;//environment.consoleMessage(selectedIDs, "selectedIDs")
    this.areasForm.setValue(selectedIDs);
    for (let index = 0; index < this.areasSelected.length; index++) {
      this.areasSelected[index].vicepresidencyTitle = this.vicepresidencies
      .filter(vicepresidency => this.areasSelected[index].vice_presidency!.id == vicepresidency.id)[0].title;
    }
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
      .filter(vicepresidency => this.areasSelected[index].vice_presidency!.id == vicepresidency.id)[0].title;
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
      row.areas = this.areas.filter(area => area.vice_presidency!.id == this.vicepresidencies[index].id)
      result.push(row);
    }
    return result;
  }

}
