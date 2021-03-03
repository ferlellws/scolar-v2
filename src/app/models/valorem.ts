import { Project } from "./project";
import { User } from "./user";
import { ValoremSchedule } from "./valorem-schedule";
import { ValoremState } from "./valorem-state";

export class Valorem {
    id?: number;
    project_id?: number;
    project?: Project;
    valorem_state_id?: number;
    valorem_state?: ValoremState;
    valorem_schedule_id?: number;
    valorem_schedule?: ValoremSchedule;
    status_details!: string;
    start_date?: string;
    due_date?: string;
    is_active?: boolean;
    is_delete?: number;
    user_updates_id?: number;
    user_updates?: User;
    user_creates_id?: number;
    user_creates?: User;
    user_delete_id?: number;
    user_delete?: User;
    deleted_at?: string;
}
