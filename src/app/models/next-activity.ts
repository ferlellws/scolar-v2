import { User } from "./user";
import { Week } from "./week";

export class NextActivity {
    id?: number;
    week!: Week;
    week_id!: number;
    description!: string;
    date!: string;
    is_active: boolean;
    is_delete: boolean;
    user_creates?: User;
    user_deletes?: User;
    user_updates?: User;
    user_creates_id?: number;
    user_deletes_id?: number;
    user_updates_id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;

    constructor() {
        this.is_active = true;
        this.is_delete = false;
    }
}
