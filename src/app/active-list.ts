import { Task } from './task';
export class ActiveList {
  id: number;
  name: string;
  nameSuffix: string;
  status: boolean;
  tasks: Task[];
}
