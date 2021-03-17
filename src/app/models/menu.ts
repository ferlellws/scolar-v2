export class Menu {
  module: {
    id: number;
    name: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
  pages:
    {
      id: number;
      name: string;
      description: string;
      icon_name: string;
      route: string;
      ordering: number;
      is_active: boolean;
      bg_color: string;
      created_at: string;
      updated_at: string;
    } []
  ;

  constructor() {
    this.module = {
      id: 0,
      name: "",
      is_active: false,
      created_at: "",
      updated_at: ""
    };

    this.pages = [{
      id: 0,
      name: "",
      description: "",
      icon_name: "",
      route: "",
      ordering: 0,
      is_active: false,
      bg_color: "",
      created_at: "",
      updated_at: ""
    }]
    // this.pages = new Pages();
  }
}
