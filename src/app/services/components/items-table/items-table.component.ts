import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Icon } from 'src/app/models/icon';
import { ItemsService } from 'src/app/services/items.service';

@Component({
  selector: 'tecno-items-table',
  templateUrl: './items-table.component.html',
  styleUrls: ['./items-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ItemsTableComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title'];
  dataSource =  new MatTableDataSource<any>(); ;
  mapExpand = new Map();
  expandedElement: any;
  icons: Icon [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    mp._intl.itemsPerPageLabel = 'Elementos en pantalla:';
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;

    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  datos: any[] = [];
  timeTypes: any[];
  paramsDownload: any;

  constructor(
    private _itemsService: ItemsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {


    this._itemsService.getItemsReport().
      subscribe((items: any) =>
      {
        var data = [];
        var mapExpand = new Map();
        for (let index = 0; index < items.length; index++) {
          mapExpand.set(items[index].id, false );
          data.push(items[index]);
        }
        this.mapExpand = mapExpand;
        this.dataSource.data = data;
        console.log(this.dataSource.data);
        
      });
      this.route.data.subscribe(
        (data) => {
          this.icons = data.icons;
        }
      );
  }

  lleno(): boolean{
    return this.dataSource.data.length > 0;
  }

  getIcon(id: number){
    var icon =null
    icon = this.icons.filter(iconSearch => iconSearch.id == id)[0].title;
    return icon;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
