import { Injectable } from '@angular/core';
import { Task } from './task';
import { Util } from './util';
import { DataService } from './data.service';
import { List } from './list';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private dataService: DataService) { }

  activeList: List;
  task: Task;

  /**
   * Creates a new task object and the styles for the task to be displayed.
   *
   * @param name, It is the name of the task entered by the user.
   */
  createTask(taskName: string) {
    this.task = {id: Util.generateId(), name: taskName, nameSuffix: '', isFinished: false, steps: []};
    return this.task;
  }

  /**
   * Updates the name of the task.
   *
   * @param newTaskName It is the new task name which has to be updated.
   */
  updateTaskName(newTaskName: string) {
    this.dataService.activeTask.name = newTaskName;
  }
  /**
   * Hard Deletes the given object by removing the element from the array
   * of tasks in the List.
   *
   * @param task It is the step object which should be deteleted.
   */
  deleteTask(task: Task) {
    this.activeList = this.dataService.activeList;
    const index = this.activeList.tasks.indexOf(task);
    this.activeList.tasks.splice(index, 1);
    this.dataService.activeList = this.activeList;
  }
}
