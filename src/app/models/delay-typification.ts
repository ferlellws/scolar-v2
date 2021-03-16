import { DelayCauseBySource } from "./delay-cause-by-source";
import { User } from "./user";

export class DelayTypification {
    id?: number;
    name!: string;
    description!: string;
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
