import { ImpactInterrelation } from "./impact-interrelation";
import { Project } from "./project";
import { TypeDependency } from "./type-dependency";
import { User } from "./user";

export class Interrelation {
    id?: number;
    project_impacted_id?: number;
    project_impacted?: Project;
    project_affect_id?: number;
    project_affect?: Project;
    types_dependency_id?: number;
    types_dependency?: TypeDependency;
    impacts_interrelation_id?: number;
    impacts_interrelation?: ImpactInterrelation;

    date?: string;
    description?: string;

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