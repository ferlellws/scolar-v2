import { User } from "./user";
import { Week } from "./week";

export class NextActivity {
    id?: number;
    week!: Week;
    description!: string;
    date!: string;
    is_active: boolean;
    is_delete: boolean;
    user_creates?: User;
    user_deletes?: User;
    user_updates?: User;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;

    constructor() {
        this.is_active = true;
        this.is_delete = false;
    }
}
