export class TableData {
    headers: string[];
    dataTable: any[];
    footer?: any;

    constructor() {
      this.headers = [];
      this.dataTable = [];
    }
}
