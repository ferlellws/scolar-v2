import { ProjectsService } from 'src/app/services/projects/projects.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// COMPONENTS
import { ItemsFormComponent } from './items-form/items-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from '@angular/animations';
import { ItemsService } from 'src/app/services/items.service';
import { MatAccordion } from '@angular/material/expansion';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Project } from 'src/app/models/project';
import { Item } from 'src/app/models/item';
import { Icon } from 'src/app/models/icon';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'tecno-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit, AfterViewInit {
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  flagCrear: boolean = false;

  animal: string;
  name: string;
  displayedColumns: string[] = ['id', 'name', 'progress', 'color'];
  selectItemTypes = new FormControl();
  // selectItemTypesList: any[] = [
  //   {
  //     id: 1,
  //     icon: "assignment",
  //     title: "Requerimiento",
  //     color: "#4CAF50"
  //   },
  //   {
  //     id: 2,
  //     icon: "assignment_late",
  //     title: "Soporte",
  //     color: "#F44336"
  //   }
  // ];
  dataSource: MatTableDataSource<UserData>;
  nameProyect: string;
  project: any;
  projectId: any;
  mode: number;
  items: any [];
  icons: Icon [];
  totalItems: number;
  modeLabel: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    // public dialog: MatDialog
    private _projectsService: ProjectsService,
    public itemsService: ItemsService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    fb: FormBuilder,
  ) {
    // this.route.params.subscribe(
    //   (params: any) => {
    //     this.projectId = params['id'];
    //     this.project = this.projectsService.getProject(this.projectId);
    //   }
    // );


    //modos dependen del orden del json de back
    //modos = 0  items_to_expire_count, 1 items_expired, 2 items_anticipated, 3  items_ontime, 4 items_no_time
    this.mode = this.route.snapshot.params['mode'];


    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
    this.setModeLabel();

    // this.route.queryParams
    //   .subscribe((queryParams: any) => {
    //     console.log("||||=============================>>>>>>>>>>>>>>>> ", queryParams['developer_company_id']);
    //   });

    // this._projectsService.getProject(parseInt(this.projectId))
    //   .subscribe((project : Project) => this.project = project);
    this.route.data.subscribe(
      (data) => {
        this.project = data.project;
        this.projectId = this.project.id;
        this.icons = data.icons;
      }
    );
    // this.route.params.subscribe(
    //   (params: any) => {
    //     this.projectId = params['id'];
    //     this.project = this.projectsService.getProject(this.projectId);
    //     this.itemsService.getItemsByIdProject(this.project.id);
    //     this.itemsService.emitTotalItemsProject.subscribe(itemsProyectTotal => this.totalItems = itemsProyectTotal);
    //   }
    // );
    // this.projectId = 1;
  }

  search(value) {


  }

  onEmitFlagCrear(flagCrear) {
    this.flagCrear = flagCrear;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onBack() {
    this.router.navigate(['/home', this.projectId]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ItemsFormComponent, {
      width: '80%',
      disableClose: true
    });
    let instance = dialogRef.componentInstance;
    instance.mode = 'create';
    instance.project = this.project;
    instance.icons = this.icons;
    instance.item = new Item;
    instance.dialogRef = dialogRef;

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  setModeLabel() {
    if (this.mode == null) {
      this.modeLabel = 'Todos';
    } else if (this.mode == 0) {
      this.modeLabel = 'A vencer';
    } else if (this.mode == 1) {
      this.modeLabel = 'Vencidos';
    } else if (this.mode == 2) {
      this.modeLabel = 'Anticipados';
    } else if (this.mode == 3) {
      this.modeLabel = 'On Time';
    } else if (this.mode == 4) {
      this.modeLabel = 'Sin Tiempo';
    } else if (this.mode == 5) {
      this.modeLabel = 'En Desarrollo';
    } else if (this.mode == 6) {
      this.modeLabel = 'Tardío';
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
