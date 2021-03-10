import { Phase } from "./phase";
import { State } from "./state";
import { User } from "./user";

export class StateByPhase {
    id?: number;
    state_id?: number;
    state?: State;
    phase_id?: number;
    phase?: Phase;
    is_active?: boolean;
    is_delete?: boolean;
    user_creates?: User | number;
    user_deletes?: User | number;
    user_updates?: User | number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;

  }