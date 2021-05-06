import { number } from "@amcharts/amcharts4/core";
import { OperationFront } from "./operation-front";
import { Person } from "./person";
import { Project } from "./project";
import { User } from "./user";

export class SupportResource {
    id?: number;
    project_id!: number;
    project?: Project;
    person_id!: number;
    person?: Person;
    operation_front_id!: number;
    operation_front?: OperationFront;
    dedication!: number;
    description!: string;
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
