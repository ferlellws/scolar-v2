import { OperationSponsor } from "./operation-sponsor";
import { PhaseByProject } from "./phase-by-project";
import { User } from "./user";

export class SponsorByPhase {
    id?: number;
    phase_by_project_id?: number;
    phase_by_project?: PhaseByProject;
    operation_sponsor_id?: number;
    operation_sponsor?: OperationSponsor;
    dedication?: number;
    is_active?: boolean;
    is_delete?: boolean;
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
