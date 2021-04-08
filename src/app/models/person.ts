import { Position } from "@angular/compiler";
import { PositionArea } from "./position-area";
import { Profile } from "./profile";
import { Project } from "./project";
import { User } from "./user";

export class Person {
    id: number;
    user?: User;
    project?: Project;
    first_name: string;
    last_name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    semanal_hours!: number;
    position?: Position;
    profile_id!: number;
    profile!: Profile;
    position_area_id!: number;
    position_area!: PositionArea;
    is_active?: boolean;
    is_delete?: boolean;
    user_creates?: string;
    user_updates?: string;
    full_name?: string;
  
    constructor(person: Person) {
      this.id = 0 || person.id;
      this.first_name = "" || person.first_name;
      this.last_name = "" || person.last_name;
      this.email = "" || person.email;
      this.password = "" || person.password;
      this.is_active = true;
      this.is_delete = false;
      this.user_creates = "" || person.user_creates;
      this.user_updates = "" || person.user_updates;
      this.is_active = true;
      this.is_delete = false;
    }
  
    getPartialName?(): string {
      return this.first_name!.split(' ')[0] + " " + this.last_name!.split(' ')[0];
    }
  
    getInitialsName?(): string {
      return this.first_name![0].toUpperCase() + this.last_name![0].toUpperCase();
    }

}
