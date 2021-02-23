export class User {
  id: number;
  // login_name: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  // password_digest: string;
  // sysrole_id: string;
  // is_active: boolean;
  user_creates: string;
  user_updates: string;
  authentication_token: string;

  constructor(user: User) {
    this.id = 0 || user.id;
    // this.login_name = "";
    this.first_name = "" || user.first_name;
    this.last_name = "" || user.last_name;
    this.email = "" || user.email;
    this.password = "" || user.password;
    // this.password_digest = "";
    // this.sysrole_id = "";
    // this.is_active = false;
    this.user_creates = "" || user.user_creates;
    this.user_updates = "" || user.user_updates;
    this.authentication_token = "" || user.authentication_token;
  }

  getPartialName(): string {
    return this.first_name.split(' ')[0] + " " + this.last_name.split(' ')[0];
  }

  getInitialsName(): string {
    return this.first_name[0].toUpperCase() + this.last_name[0].toUpperCase();
  }
}
