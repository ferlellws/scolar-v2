import { Area } from 'src/app/models/area';
import { Position } from './position';
import { User } from './user';

export class PositionArea {
  id!: number;
  area!: Area;
  position!: Position;
  is_active: boolean;
  is_delete: boolean;
  user_creates?: User | number;
  user_deletes?: User | number;
  user_updates?: User | number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;

  constructor() {
      this.is_active = true;
      this.is_delete = false;
  }

}
