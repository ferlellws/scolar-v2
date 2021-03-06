import { OperationFront } from "./operation-front";
import { Person } from "./person";
import { Project } from "./project";
import { User } from "./user";

export class TestUser {
    id?: number;
    person_id?: number;
    person?: Person;
    project_id?: number;
    project?: Project;
    operation_front_id?: number;
    operation_front?: OperationFront;
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