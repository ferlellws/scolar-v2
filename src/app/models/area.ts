import { User } from "./user";
import { VicePresidency } from "./vice-presidency";

export class Area {
    id!: number;
    parent_id!: number;
    parent!: Area;
    vice_presidency_id!: number;
    vice_presidency!: VicePresidency;
    title!: string;
    description!: string;
    is_active?: boolean;
    is_delete?: boolean;
    user_creates?: User | number;
    user_deletes?: User | number;
    user_updates?: User | number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;

    constructor(){
    }
  }
