import { Application } from "./application";
import { Project } from "./project";
import { User } from "./user";

export class ApplicationByProject {
    id?: number;
    application_id?: number;
    application?: Application;
    project_id?: number;
    project?: Project;
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
