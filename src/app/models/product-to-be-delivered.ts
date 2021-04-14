import { Project } from "./project";
import { User } from "./user";
import { Valorem } from "./valorem";

export class ProductToBeDelivered {
    id?: number;
    project_id?: number;
    project?: Project;
    external_company_id?: number;
    external_company: any;
    external_company_tracing_id?: number;
    external_company_tracing?: Valorem;
    description!: string;
    date?: string;
    is_visible?: number;
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
