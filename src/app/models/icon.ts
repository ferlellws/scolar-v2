export class Icon {
    id: number;
    name: string;
    description: string;
    image: any;
    is_active: boolean;

    constructor() {
      this.id = 0;
      this.name = "";
      this.description = "";
      this.image = null;
      this.is_active = false;
    }
}
