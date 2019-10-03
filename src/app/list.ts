import { Task } from './task';
export class List {
  id: number;
  name: string;
  nameSuffix: string;
  status: boolean;
  tasks: Task[];
}
