import { DelayCauseBySource } from "./delay-cause-by-source";
import { DelayTypification } from "./delay-typification";
import { User } from "./user";

export class DelayTypificationBySource {
    id?: number;
    delay_typification_id?: number;
    delay_typification?: DelayTypification; 
    delay_cause_by_source_id?: number;
    delay_cause_by_source?: DelayCauseBySource; 
    is_active?: boolean;
    is_delete?: boolean;
    user_creates?: User | number;
    user_deletes?: User | number;
    user_updates?: User | number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}
