import { Phase } from "./phase";
import { State } from "./state";
import { User } from "./user";

export class StateByPhase {
    id?: number;
    state_id: State | number;
    phase_id: Phase | number;
    is_active: boolean;
    is_delete: boolean;
    user_creates?: User | number;
    user_deletes?: User | number;
    user_updates?: User | number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;

    constructor(){
        this.state_id = new State;
        this.phase_id = new Phase;
        this.is_active = true;
        this.is_delete = false;
    }
  }