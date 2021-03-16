import { Project } from "./project";
import { User } from "./user";

export class Kpi {
    id?: number;
    project_id?: number;
    project?: Project;
    description!: string;
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
