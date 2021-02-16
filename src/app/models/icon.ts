export class Icon {
    id: number;
    title: string;
    description: string;
    image: any;
    is_active: boolean;

    constructor() {
      this.id = 0;
      this.title = "";
      this.description = "";
      this.image = null;
      this.is_active = false;
    }
}
