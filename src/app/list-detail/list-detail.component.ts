import { Component, OnInit } from '@angular/core';

import { List } from '../model/list';
import { Task } from '../model/task';
import { TaskService } from '../service/task.service';
import { DataService } from '../service/data.service';
import { CommonUtil } from '../util/common-util';
import { ListService } from '../service/list.service';
@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent {

  constructor(private dataService: DataService, private taskService: TaskService, private listService: ListService) {}

  activeList: List;
  task: Task;

  OnInit() {
    this.activeList = this.dataService.activeList;
  }

  /**
   * Creates a new task object and the styles for the list to be displayed.
   *
   * @param textBoxInput, It is the name of the list entered by the user.
   */
  createTask(textBoxInput) {
    this.activeList = this.dataService.activeList;
    let taskName: string;
    taskName = textBoxInput.value;
    this.task = this.taskService.createTask(taskName);
    this.activeList.tasks.push(this.task);
    textBoxInput.value = '';
    this.dataService.activeList = this.activeList;
    this.dataService.activeTask = this.task;
  }

  /**
   * Displays the task details in the task detail area.
   *
   * @param task It is the task which must be displayed.
   */
  displayTaskDetail(task: Task) {
    this.dataService.activeTask = task;
    CommonUtil.showTaskDetailPanel();
  }

  /**
   * Updates the name of the list.
   *
   * @param inputTextBox it is the text box element where the
   * updated name has been entered.
   */
  updateListName(inputTextBox) {
    const newListName: string = inputTextBox.value;
    console.log(newListName);
    this.listService.updateListName(newListName);
    inputTextBox.blur();
  }

  /**
   * Toggles the isFinished variable true if task is finished, false if the
   * task havenot completed.
   *
   * @param task It is the task for which the if finished must be
   * toggeled.
   */
  toggleIsFinished(task) {
    task.isFinished = !task.isFinished;
  }

  getFinishedStepCount() {
    const finishedSteps = this.dataService.activeTask.steps.filter(step => step.isFinished === true);
    return finishedSteps.length;
  }
}
