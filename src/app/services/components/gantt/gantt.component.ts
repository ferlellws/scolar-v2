import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

// import "dhtmlx-gantt";
import { gantt } from 'dhtmlx-gantt';
import { Task } from 'src/app/models/task';
import { LinkService } from 'src/app/services/link.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'tecno-gantt',
  templateUrl: './gantt.component.html',
  providers: [TaskService, LinkService],
  styleUrls: ['./gantt.component.scss']
})
export class GanttComponent implements OnInit {
  @ViewChild("gantt_here") ganttContainer: ElementRef;

  markerId;

  constructor(
    private taskService: TaskService,
    private linkService: LinkService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      gantt.config.xml_date = "%Y-%m-%d %H:%i";

      gantt.i18n.setLocale("es");

      gantt.plugins({
        marker: true,
        tooltip: true
      });

      gantt.config.columns = [
        { name: "text", tree: true, width: 200, label: "Desarrollador", resize: true,
          template: (task: Task) => {
            let result: string = "";

            // if (task.parent) {
              result = `<span class="point"></span><span>${task.text}</span>`;
            // }

            return result;
          }
        },
        { name: "item", width: 200, label: "Requerimiento", resize: true,
          template: (task: Task) => {
            let result: string = "";

            if (task.parent) {
              result = task.item;
            }

            return result;
          }
        },
        { name: "start_date", align: "center", width: 80, label: "Inicio", resize: true },
        { name: "end_date", align: "center", width: 80,  label: "Fin", resize: true },
        // { name: "duration", width: 60, align: "center" },
        // { name: "add", width: 44 }
      ];

      let secondGridColumns = {
        columns: [
          {
              name: "status", label: "Estado", width: 60, align: "center",
              template: function (task) {
                  let progress = task.progress || 0;
                  return Math.floor(progress * 100) + "%";
              }
          }
        ]
      };

      let resourceConfig = {
        columns: [
          {
            name: "name", label: "Desarrollador", tree:true, template: function (task) {
              return task.text;
            }
          },
          {
            name: "workload", label: "Carga de trabajo", template: function (task) {
              var tasks;
              var store = gantt.getDatastore(gantt.config.resource_store),
                field = gantt.config.resource_property;

              if(store.hasChild(task.id)){
                tasks = gantt.getTaskBy(field, store.getChildren(task.id));
              }else{
                tasks = gantt.getTaskBy(field, task.id);
              }

              var totalDuration = 0;
              for (var i = 0; i < tasks.length; i++) {
                totalDuration += tasks[i].duration;
              }

              return (totalDuration || 0) * 8 + "h";
            }
          }
        ]
      };

      gantt.config.layout = {
        rows: [
          {
            cols: [
              {view: "grid", group:"grids", scrollY: "scrollVer"},
              {resizer: true, width: 1},
              {view: "timeline", scrollX: "scrollHor", scrollY: "scrollVer"},
              {resizer: true, width: 1},
              {view: "grid", width: 120, bind:"task",
                scrollY:"scrollVer", config:secondGridColumns},
              // {view: "scrollbar", scroll: "y", id: "scrollVer"},
              {view: "scrollbar", id: "scrollVer", group:"vertical"},
            ],
            gravity:2
          },
          {resizer: true, width: 1},
          {
            config: resourceConfig,
            cols: [
              {view: "resourceGrid", group:"grids", width: 435, scrollY: "resourceVScroll" },
              {resizer: true, width: 1},
              {view: "resourceTimeline", scrollX: "scrollHor", scrollY: "resourceVScroll"},
              {view: "scrollbar", id: "resourceVScroll", group:"vertical"}
            ],
            gravity:1
          },
          {view: "scrollbar", id: "scrollHor"}
        ]
      }

      var dateToStr = gantt.date.date_to_str(gantt.config.task_date);

      var id = gantt.addMarker({
          start_date: new Date(),
          css: "today",
          title:dateToStr(new Date())
      });

      setInterval(function(){
          var today = gantt.getMarker(id);
          today.start_date = new Date();
          today.title = String(today.start_date);
          gantt.updateMarker(id);
      }, 1000*60);

      gantt.templates.tooltip_text = function(start, end, task){
        return `<b>Requerimiento:</b> <span class="point"></span>` + task.text + "<br/><b>Inicio:</b> " +
          gantt.templates.tooltip_date_format(start) +
          "<br/><b>Fin:</b> " + gantt.templates.tooltip_date_format(end);
      };

      gantt.init(this.ganttContainer.nativeElement);

      gantt.templates.task_text = (start, end, task) => {
        let taskUser: string = task.item;

        // if (task?.users && task.users.length > 0) {
        //   taskUser += ", <b>Desarrollador:</b> " + task.users;
        // }

        return taskUser;
      };

      Promise.all([this.taskService.get(), this.linkService.get()])
          .then(([data, links]) => {
              gantt.parse({data, links});
          });
    }, 1000);
  }

  deleteMark() {
    gantt.deleteMarker(this.markerId);
    // gantt.config.show_markers = false;
  }

  addMark() {
    // gantt.config.show_markers = true;
    var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
    this.markerId = gantt.addMarker({
        start_date: new Date(), //a Date object that sets the marker's date
        css: "today", //a CSS class applied to the marker
        text: "Ahora", //the marker title
        title: dateToStr( new Date()) // the marker's tooltip
    });
  }
}
