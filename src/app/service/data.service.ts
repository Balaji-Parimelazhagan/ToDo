import { Injectable } from '@angular/core';
import { List } from '../model/list';
import { Task } from '../model/task';

@Injectable()
export class DataService {
  collectionOfList = {lists: [] };
  activeList: List = {id: 0, name: 'Tasks', nameSuffix: '', tasks: []};
  activeTask: Task;

  constructor() { }
}
