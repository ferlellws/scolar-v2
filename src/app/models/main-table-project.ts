import { ApplicationByProject } from "./application-by-project";
import { AreaByProject } from "./area-by-project";
import { Benefit } from "./benefit";
import { CompanyByProject } from "./company-by-project";
import { Highlight } from "./highlight";
import { Kpi } from "./kpi";
import { Risk } from "./risk";
import { TestUser } from "./test-user";

export class MainTableProject {
    benefits?: Benefit[];
    highlights?: Highlight[];
    risks?: Risk[];
    applications_by_projects?: ApplicationByProject[];
    kpis?: Kpi[];
    areas_by_projects?: AreaByProject[];
    test_users?: TestUser[];
    companies_by_projects?: CompanyByProject[];
}
