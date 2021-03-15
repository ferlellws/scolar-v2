import { DelayCauseBySource } from "./delay-cause-by-source";
import { DelayTypification } from "./delay-typification";
import { Project } from "./project";
import { SolutionState } from "./solution-state";
import { User } from "./user";

export class DesviationCause {
    id?: number;
    project_id?: number;
    project?: Project;
    delay_typification_by_sources_id? :number;
    delay_cause_by_sources_id?: number;
    delay_cause_by_sources?: DelayCauseBySource;
    delay_typification_id?: number;
    delay_typification?: DelayTypification;
    solution_state_id?: number;
    solution_state?: SolutionState;
    
    date!: string;
    deliverable!: string;
    cause_delay!: string;
    impacts_critical_path!: boolean;
    impacts_time!: number;
    cost_variation!: number;
    schedule_activity_impacted!: string;
    proposed_solution!: string;

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
