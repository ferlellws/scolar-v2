import { User } from "./user";
import { StrategicApproach } from "./strategic-approach";
import { Area } from "./area";
import { Program } from "./program";
import { Priority } from "./priority";
import { Typification } from "./typification";
import { Management } from "./management";
import { StateByPhase } from "./state-by-phase";

export class Project {
    id?: number;
    strategic_approach_id!: StrategicApproach | number;
    area_id!: Area | number;
    program_id?: Program | number;
    priority_id!: Priority | number;
    typification_id!: Typification | number;
    functional_lead_id!: User | number;
    management_id!: Management | number;
    pmo_id!: User | number;
    pmo_assitant_id?: User | number;
    states_by_phase_id!: StateByPhase | number;
    pmo_assitant_stage_id?: User | number;
    title: string;
    description: string;
    reception_date: string;
    pmo_hours: number;
    pmo_minutes: number;
    pmo_assistant_hours?: number;
    pmo_assistant_minutes?: number;
    budget_approved: number;
    budget_executed: number;
    start_date?: string;
    due_date?: string;
    control_date?: string;
    sprint: number;
    evaluation: string;
    test_log: boolean;
    is_active: boolean;
    is_delete: boolean;
    user_creates_id?: User | number;
    user_deletes_id?: User | number;
    user_updates_id?: User | number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;

    constructor() {
        this.title = "";
        this.description = "";
        this.reception_date = "";
        this.pmo_hours = 0;
        this.pmo_minutes = 0;
        this.pmo_assistant_hours = 0;
        this.pmo_assistant_minutes = 0;
        this.budget_approved = 0.0;
        this.budget_executed = 0.0;
        this.start_date = "";
        this.due_date = "";
        this.control_date = "";
        this.sprint = 0;
        this.evaluation = "";
        this.test_log = false;
        this.is_active = true;
        this.is_delete = false;
    }
}
