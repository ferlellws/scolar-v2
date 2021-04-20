import { ImpactInterrelation } from "./impact-interrelation";
import { Project } from "./project";
import { TypeDependency } from "./type-dependency";
import { User } from "./user";

export class Interrelation {
    id?: number;
    project_impacted_id?: number;
    project_impacted?: Project;
    project_affects_id?: number;
    project_affects?: Project;
    type_dependency_id?: number;
    type_dependency?: TypeDependency;
    impact_interrelation_id?: number;
    impact_interrelation?: ImpactInterrelation;

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