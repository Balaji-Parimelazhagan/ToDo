import { Injectable } from '@angular/core';
import { Step } from '../model/step';
import { CommonUtil } from '../util/common-util';
import { Task } from '../model/task';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TaskDetailService {

  constructor(private dataService: DataService) { }
  step: Step;
  activeTask: Task;

  /**
   * Creates a new list object and the styles for the list to be displayed.
   *
   * @param name, It is the name of the list entered by the user.
   */
  createStep(stepName: string) {
    this.step = {id: CommonUtil.generateId(),
                 name: stepName,
                 nameSuffix: '',
                 isFinished: false};
    return this.step;
  }

  /**
   * Hard Deletes the given object by removing the element from the array.
   * Gets the index of the step object from the steps array from active task.
   *
   * @param step It is the step object which should be deteleted.
   */
  deleteStep(step: Step) {
    this.activeTask = this.dataService.activeTask;
    const index = this.activeTask.steps.indexOf(step);
    this.activeTask.steps.splice(index, 1);
    this.dataService.activeTask = this.activeTask;
  }
}
