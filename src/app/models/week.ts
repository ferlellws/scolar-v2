import { Project } from "./project";
import { User } from "./user";

export class Week {
    id?: number;
    project?: Project;
    project_id?: number;
    start_date!: string;
    end_date!: string;
    advance_spected!: number;
    advance_real!:number;
    is_active: boolean;
    is_delete: boolean;
    user_creates?: User;
    user_creates_id?: number;
    user_deletes?: User;
    user_deletes_id?: number;
    user_updates?: User;
    user_updates_id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    
    constructor() {
        this.is_active = true;
        this.is_delete = false;
    }
}
