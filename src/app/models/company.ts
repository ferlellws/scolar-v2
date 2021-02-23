import { User } from "./user";
import { CompanyType } from "./company-type";

export class Company {
    id?: number;
    company_type_id!: CompanyType | number;
    title: string;
    description: string;
    is_active: boolean;
    is_delete: boolean;
    user_creates?: User | number;
    user_deletes?: User | number;
    user_updates?: User | number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;

    constructor(){
        //this.company_type_id = new CompanyType;
        this.title = "";
        this.description = "";
        this.is_active = true;
        this.is_delete = false;
    }
  }