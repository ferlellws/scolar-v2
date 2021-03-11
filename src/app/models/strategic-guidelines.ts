import { User } from "./user";

export class StrategicGuidelines {
    id!: number;
    name!: string;
    description!: string;
    is_active?: boolean;
    is_delete?: boolean;
    user_creates_id?: number;
    user_creates?: User;
    user_deletes_id?: number;
    user_deletes?: User ;
    user_updates?: User;
    user_updates_id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;

}
