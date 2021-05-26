import {Injectable} from "@angular/core";
import { Task } from "../models/task";

@Injectable()
export class TaskService {
    get(): Promise<Task[]> {
        return Promise.resolve([
          {id: 1, text: "PROYECTO SURTIDO", start_date: "2020-12-24 13:00", end_date: "2020-12-25 08:00", progress: 0.9, item: "PROYECTO SURTIDO", open: true, priority: 1},
          {id: 2, text: "Ferley León", start_date: "2020-12-27 08:00", end_date: "2020-12-29 17:00", progress: 0.4, parent: 1, item: "Surtido Automatico Darkstore", color: "#8BC34A"},
          {id: 3, text: "Jorge Pinzón", start_date: "2020-12-30 08:00", end_date: "2020-12-30 16:00", progress: 0.4, parent: 1, item: "Surtido Manual", color: "#8BC34A"},
        ]);
    }
}
