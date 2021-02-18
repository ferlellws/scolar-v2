import { User } from "./user";
import { VicePresidency } from "./vice-presidency";

export class Area {
    id?: number;
    vice_presidency_id: VicePresidency | number;
    title: string;
    description: string;
    is_active: boolean;
    is_delete: boolean;
    user_creates?: User | number;
    user_deletes?: User | number;
    user_updates?: User | number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;

    constructor(){
        this.vice_presidency_id = new VicePresidency;
        this.title = "";
        this.description = "";
        this.is_active = true;
        this.is_delete = false;
    }
  }