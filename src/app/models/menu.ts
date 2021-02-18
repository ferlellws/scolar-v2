export class Menu {
  module: {
    id: number;
    title: string;
    icon_id: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
  pages:
    {
      id: number;
      title: string;
      description: string;
      sysmodule_id: number;
      route: string;
      order_menu: number;
      is_active: boolean;
      bg_color: string;
      created_at: string;
      updated_at: string;
    } []
  ;

  constructor() {
    this.module = {
      id: 0,
      title: "",
      icon_id: 0,
      is_active: false,
      created_at: "",
      updated_at: ""
    };

    this.pages = [{
      id: 0,
      title: "",
      description: "",
      sysmodule_id: 0,
      route: "",
      order_menu: 0,
      is_active: false,
      bg_color: "",
      created_at: "",
      updated_at: ""
    }]
    // this.pages = new Pages();
  }
}
