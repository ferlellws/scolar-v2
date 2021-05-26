import { string } from '@amcharts/amcharts4/core';
import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatTable } from '@angular/material/table';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'tecno-table-time-line',
  templateUrl: './table-time-line.component.html',
  styleUrls: ['./table-time-line.component.scss']
})
export class TableTimeLineComponent implements OnInit {

  constructor(private ngZone: NgZone) {}
  
  @ViewChild('matTable', { static: false }) set table(matTable: MatTable<any>) {
    if (matTable) {
      this.ngZone.onMicrotaskEmpty
        .pipe(take(3))
        .subscribe(() => matTable.updateStickyColumnStyles());
    }
  }

  @Input() generalData:any;
  @Input() tab:number = 1;
  opColums:number = 2;
  displayedColumns: any;

  phases: any = [
    {
      name: 'Factibilidad',
      color: '#4285F4'
    },
    {
      name: 'Inicio',
      color: '#02B7AC'
    },
    {
      name: 'Planeación',
      color: '#F4B400'
    },
    {
      name: 'Ejecución',
      color: '#04C200'
    },
    {
      name: 'Cierre',
      color: '#E1675D'
    },
    {
      name: 'BAU',
      color: '#EB8E01'
    },
  ]

  ngOnInit(): void {
    if(this.tab == 2) {
      this.opColums = 1;
    }
    
    if(this.generalData != []) {
      this.displayedColumns = Object.keys(this.generalData.dataSource[0]);
    }
  }

  isSticky(buttonToggleGroup: MatButtonToggleGroup, id: string) {
    return (buttonToggleGroup.value || []).indexOf(id) !== -1;
  }
}
