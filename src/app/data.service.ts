import { Injectable } from '@angular/core';
import { List } from './list';
import { Task } from './task';

@Injectable()
export class DataService {
  collectionOfList = {lists: [] };
  activeList: List = {id: 0, name: 'Tasks', nameSuffix: '', tasks: []};
  activeTask: Task;

  constructor() { }
}
