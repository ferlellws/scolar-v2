import { Project } from "./project";
import { User } from "./user";
import { ValoremSchedule } from "./valorem-schedule";
import { ValoremState } from "./valorem-state";

export class Valorem {
    id?: number;
    project_id?: number;
    project?: Project;
    external_company_id?: number;
    external_company: any;
    external_company_state_id?: number;
    external_company_state?: ValoremState;
    external_company_schedule_id?: number;
    external_company_schedule?: ValoremSchedule;
    status_detail!: string;
    start_date?: string;
    due_date?: string;
    is_active?: boolean;
    is_delete?: boolean;
    user_updates_id?: number;
    user_updates?: User;
    user_creates_id?: number;
    user_creates?: User;
    user_delete_id?: number;
    user_delete?: User;
    deleted_at?: string;
}
