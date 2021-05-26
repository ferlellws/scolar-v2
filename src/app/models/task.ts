export class Task {
  id!: number;
  start_date!: string;
  end_date?: string;
  text?: string;
  progress!: number;
  duration?: number;
  parent?: number;
  owner_id?: string;
  type?: string;
  priority?: number;
  open?: boolean;
  user?: string[];
  color?: string;
  item!: string;
}
