import { Injectable } from '@angular/core';
import { Task } from './task';
import { Util } from './util';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
  task: Task;

  /**
   * Creates a new task object and the styles for the task to be displayed.
   *
   * @param name, It is the name of the task entered by the user.
   */
  createTask(taskName: string) {
    /*let nameSuffix: string;
    nameSuffix = validateName(listName, "task");*/
    this.task = {id: Util.generateId(), name: taskName, nameSuffix: '', isFinished: false, steps: []};
    return this.task;
  }
}
