import { DelayCause } from "./delay-cause";
import { DelaySource } from "./delay-source";
import { User } from "./user";

export class DelayCauseBySource {
    id?: number;
    delay_causes_id?: number;
    delay_causes?: DelayCause;
    delay_sources_id?: number;
    delay_sources?: DelaySource;
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
