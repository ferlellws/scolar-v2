import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { group } from 'console';
// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

// MODELS
import { Color } from 'src/app/models/color';
import { ProjectIndicator } from 'src/app/models/project-indicator';

// SERVICES
import { ColorsService } from 'src/app/services/colors.service';
import { ItemsService } from 'src/app/services/items.service';
import { ItemsIndicatorsService } from 'src/app/services/items/items-indicators.service';
import { ProjectsService } from 'src/app/services/projects/projects.service';
import { UserService } from 'src/app/services/user.service';

export interface GroupBy {
  id: number;
  name: string;
  selected: boolean;
}
export interface IndicatorProject {
  borderColor: string;
  bgColor: string;
  projectIndicator: ProjectIndicator;
  value: number;
  progressPercentage: number;
  name: string;
  mode: number;
  projectId: number;
}
@Component({
  selector: 'tecno-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  panelOpenState: boolean = false;
  panelOpenStates: boolean[]= [];
  projectsIndicators: any[];
  companiesProjectsIndicators: any[];
  indicatorsProjects: IndicatorProject[] = [];
  indicatorsProjectsP: IndicatorProject[] = [];
  itemsToExpire: any;
  itemsExpired: any;
  itemsAnticipated: any;
  itemsOnTime: any;
  itemsNoTime: any;
  itemsDevelop: any;
  itemsLate: any;
  cargaFinalizada = false;
  total: number;
  colors: Color[];
  chartData: any[];
  colorScheme: any;
  progressAll = 0;
  projectId: number;
  groupById: number = 1;
  showProgressBar: boolean = true;

  groupsBy: GroupBy[] = [
    {id: 1, name: 'Proyectos', selected: true},
    {id: 2, name: 'Compañía Desarrolladora', selected: false},
  ];

  // drop(event: CdkDragDrop<GroupBy[]>) {
  //   moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
  // }

  constructor(
      private _projectsService: ProjectsService,
      private _itemsIndicatorsService : ItemsIndicatorsService,
      private _colorsService: ColorsService,
      private router: Router,
      private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {

    this.projectId = this.route.snapshot.params['id'];

    this.colors = this._colorsService.getColors();
    this.colorScheme = {
      domain:[
        this.getColor('orange'),
        this.getColor('red'),
        this.getColor('blue'),
        this.getColor('green'),
        this.getColor('blue-grey'),
        this.getColor('cyan'),
        this.getColor('pink')
      ]
    }

    this.route.data.subscribe(data => {
      this.projectsIndicators = data.projectsIndicators;
      this.panelOpenStates = [];

      console.log("++++_____________+++++++=this.projectsIndicators: ", this.projectsIndicators);
      this.showProgressBar = false;

      for (let index = 0; index < this.projectsIndicators[this.projectsIndicators.length - 1].project.id; index++) {
        this.panelOpenStates.push(false);
      }
    });
  }

  getColor(name: string): string {
    return this.colors.filter(color => color.name == name)[0].value;
  }

  clickTodas(id: number){
    this.router.navigate(['/items', id]);
  }

  onClick(id: number, mode: number) {
    this.router.navigate(['/items', id, mode]);
  }

  onClickGroupBy(id: number) {
    this.groupsBy.forEach((groupBy: GroupBy) => {
      if (groupBy.id == id) {
        groupBy.selected = true;
      } else {
        groupBy.selected = false;
      }
    });

    this.groupById = id;
    switch(id) {
      case 1: {
        this.showProgressBar = true;
        this._projectsService.getItemsProject().
          subscribe(projectsIndicators =>
            {
              this.projectsIndicators = projectsIndicators;
              this.panelOpenStates = [];
              this.showProgressBar = false;

              for (let index = 0; index < this.projectsIndicators[this.projectsIndicators.length - 1].project.id; index++) {
                this.panelOpenStates.push(false);
              }
            });
        break;
      }
      case 2: {
        this.showProgressBar = true;

        this._projectsService.getDeveloperCompanyItemsProject().
          subscribe(companiesProjectsIndicators => {
            this.companiesProjectsIndicators = companiesProjectsIndicators;
            this.panelOpenStates = [];
            this.showProgressBar = false;

            // for (let index = 0; index < this.companiesProjectsIndicators[this.projectsIndicators.length - 1].project.id; index++) {
            //   this.panelOpenStates.push(false);
            // }

            // this.indicatorsProjectsP = [
            //   {-
            //     borderColor: this.getColor('deep-purple'),
            //     bgColor: this.hexToRGB(this.getColor('deep-purple')),
            //     value: this.total,
            //     progressPercentage: this.progressAll,
            //     projectIndicator: null,
            //     name: "Todos"
            //   }
            // ];

            let labelsIndicators = [
              "Próximos a Vencer",
              "Vencidos",
              "Anticipados",
              "On Time",
              "Sin Tiempo",
              "En Desarrollo",
              "Tardío"
            ];

            let dataIndicator = [];
            let indicators;

            this.companiesProjectsIndicators.forEach(companyProjectIndicator => {
              indicators = companyProjectIndicator.indicators;
              this.itemsToExpire = indicators[0];
              this.itemsExpired = indicators[1];
              this.itemsAnticipated = indicators[2];
              this.itemsOnTime = indicators[3];
              this.itemsNoTime = indicators[4];
              this.itemsDevelop = indicators[5];
              this.itemsLate = indicators[6];
              this.fillChartData();
              this.indicatorsProjectsP = [];

              this.total = companyProjectIndicator.total_items;

              this.indicatorsProjectsP = [
                {
                  borderColor: this.getColor('deep-purple'),
                  bgColor: this.hexToRGB(this.getColor('deep-purple')),
                  value: this.total,
                  progressPercentage: this.progressAll,
                  projectIndicator: null,
                  name: "Todos",
                  mode: -1,
                  projectId: null
                }
              ];

              indicators.forEach((indicator, index) => {
                let borderColor;
                let bgColor;
                borderColor = this.colorScheme.domain[index];
                bgColor = this.hexToRGB(borderColor);
                let i = 0;
                for (let key in indicator) {
                  console.log(key, indicator[key]);
                  dataIndicator[i] = indicator[key];
                  i++;
                }
                let value = dataIndicator[0];
                let progressPercentage = dataIndicator[1];
                // let projectId = dataIndicator[1];
                let projectId = 1;
                console.log({dataIndicator});
                dataIndicator = [];

                this.indicatorsProjectsP.push({
                  borderColor: borderColor,
                  bgColor: bgColor,
                  value: value,
                  progressPercentage: progressPercentage,
                  projectIndicator: null,
                  name: labelsIndicators[index],
                  mode: index,
                  projectId: projectId
                });
              });
            });
          });
        break;
      }
    }

    console.log(this.groupsBy);

  }

  additionalDataProject(id: number) {
    // this._itemsIndicatorsService.getItemsIndicators(id).
    //   subscribe(items =>
    //     {
    //       this.projects.forEach((project, index) => {
    //         if (project.id == id) {
    //           this.projects[index].itemsToExpire = items[0].items_to_expire_count;
    //           this.projects[index].itemsExpired = items[1].items_expired_count;
    //           this.projects[index].itemsAnticipated = items[2].items_anticipated_count;
    //           this.projects[index].itemsOnTime = items[3].items_ontime_count;
    //           this.projects[index].itemsNoTime = items[4].items_no_time_count;
    //           this.projects[index].total = items[0].items_to_expire_count
    //             + parseInt(items[1].items_expired_count)
    //             + parseInt(items[2].items_anticipated_count)
    //             + parseInt(items[3].items_ontime_count)
    //             + parseInt(items[4].items_no_time_count);
    //         }
    //       });
    //     }
    //   );
  }

  // changePanelStatus(id: number) {
  //   this.panelOpenStates[id-1] = !this.panelOpenStates[id-1];
  //   this.cargaFinalizada = false;
  //   this.itemsToExpire = {};
  //   if (this.panelOpenStates[id-1]) {
  //     this._itemsIndicatorsService.getItemsIndicators(id).
  //       subscribe(items =>
  //         {
  //           this.itemsToExpire = items[0];
  //           this.itemsExpired = items[1];
  //           this.itemsAnticipated = items[2];
  //           this.itemsOnTime = items[3];
  //           this.itemsNoTime = items[4];
  //           this.total = items[0].items_to_expire_count
  //             + parseInt(items[1].items_expired_count)
  //             + parseInt(items[2].items_anticipated_count)
  //             + parseInt(items[3].items_ontime_count)
  //             + parseInt(items[4].items_no_time_count);
  //           if(this.total > 0){
  //             this.progressAll = 100;
  //           }else{
  //             this.progressAll = 0;
  //           }
  //           this.fillChartData();
  //           this.cargaFinalizada = true;
  //         }
  //       );
  //   }
  // }

  changePanelStatus(id: number, indicators: any, total_items: number) {
    // console.log("/////", this.panelOpenStates[id - 1]);

    this.panelOpenStates[id - 1] = !this.panelOpenStates[id - 1];
    this.cargaFinalizada = false;
    this.itemsToExpire = {};
    if (this.panelOpenStates[id - 1]) {
      // this._itemsIndicatorsService.getItemsIndicators(id).
      //   subscribe(items =>
      //     {
      //       this.itemsToExpire = items[0];
      //       this.itemsExpired = items[1];
      //       this.itemsAnticipated = items[2];
      //       this.itemsOnTime = items[3];
      //       this.itemsNoTime = items[4];
      //       this.total = items[0].items_to_expire_count
      //         + parseInt(items[1].items_expired_count)
      //         + parseInt(items[2].items_anticipated_count)
      //         + parseInt(items[3].items_ontime_count)
      //         + parseInt(items[4].items_no_time_count);
      //       if(this.total > 0){
      //         this.progressAll = 100;
      //       }else{
      //         this.progressAll = 0;
      //       }
      //       this.fillChartData();
      //       this.cargaFinalizada = true;
      //     }
      //   );

      // console.log({indicators});

      this.itemsToExpire = indicators[0];
      this.itemsExpired = indicators[1];
      this.itemsAnticipated = indicators[2];
      this.itemsOnTime = indicators[3];
      this.itemsNoTime = indicators[4];
      this.itemsDevelop = indicators[5];
      this.itemsLate = indicators[6];
      // this.total = this.itemsToExpire.items_to_expire_count
      //   + parseInt(this.itemsExpired.items_expired_count)
      //   + parseInt(this.itemsAnticipated.items_anticipated_count)
      //   + parseInt(this.itemsOnTime.items_ontime_count)
      //   + parseInt(this.itemsNoTime.items_no_time_count)
      //   + parseInt(this.itemsDevelop.items_develop_count);
      this.total = total_items;
      if (this.total > 0) {
        this.progressAll = 100;
      } else {
        this.progressAll = 0;
      }
      this.fillChartData();
      this.cargaFinalizada = true;
      let projectId = id;

      this.indicatorsProjects = [
        {
          borderColor: this.getColor('deep-purple'),
          bgColor: this.hexToRGB(this.getColor('deep-purple')),
          value: this.total,
          progressPercentage: this.progressAll,
          projectIndicator: null,
          name: "Todos",
          mode: -1,
          projectId: projectId
        }
      ];

      let labelsIndicators = [
        "Próximos a Vencer",
        "Vencidos",
        "Anticipados",
        "On Time",
        "Sin Tiempo",
        "En Desarrollo",
        "Tardío"
      ];

      let dataIndicator = [];

      indicators.forEach((indicator, index) => {
        let borderColor;
        let bgColor;
        borderColor = this.colorScheme.domain[index];
        bgColor = this.hexToRGB(borderColor);
        let i = 0;
        for (let key in indicator) {
          console.log(key, indicator[key]);
          dataIndicator[i] = indicator[key];
          i++;
        }
        let value = dataIndicator[0];
        let progressPercentage = dataIndicator[1];
        console.log({dataIndicator});
        dataIndicator = [];

        this.indicatorsProjects.push({
          borderColor: borderColor,
          bgColor: bgColor,
          value: value,
          progressPercentage: progressPercentage,
          projectIndicator: null,
          name: labelsIndicators[index],
          mode: index,
          projectId: projectId
        });
      });
    }
  }

  fillChartData() {
    this.chartData = [
      {
        name: 'A Expirar',
        value: this.itemsToExpire.items_to_expire_count,
      },
      {
        name: 'Expirados',
        value: this.itemsExpired.items_expired_count,
      },
      {
        name: 'Anticipados',
        value: this.itemsAnticipated.items_anticipated_count,
      },
      {
        name: 'On Time',
        value: this.itemsOnTime.items_ontime_count,
      },
      {
        name: 'Sin Tiempo',
        value: this.itemsNoTime.items_no_time_count,
      },
      {
        name: 'En Desarrollo',
        value: this.itemsDevelop.items_develop_count,
      },
      {
        name: 'Tardío',
        value: this.itemsLate.items_late_count,
      }
    ];
  }

  hexToRGB(h) {
    let r: string = '';
    let g: string = '';
    let b: string = '';

    // 3 digits
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];

    // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }

    return "rgba("+ +r + "," + +g + "," + +b + ", .1)";
  }
}
