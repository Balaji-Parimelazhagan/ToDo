import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { DataService } from '../service/data.service';
import { Step } from '../model/step';
import { TaskDetailService } from '../service/task-detail.service';
import { TaskService } from '../service/task.service';
import { CommonUtil } from '../util/common-util';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  activeTask: Task;
  activeStep: Step;
  step: Step;
  isTaskPopHidden = true;
  isStepPopHidden = true;

  constructor(private dataService: DataService, private taskDetailService: TaskDetailService,
              private taskService: TaskService) {}

  ngOnInit() {
    this.activeTask = this.dataService.activeTask;
  }

  /**
   * Creates a new task object and the styles for the list to be displayed.
   *
   * @param textBoxInput, It is the name of the list entered by the user.
   */
  createStep(textBoxInput) {
    this.activeTask = this.dataService.activeTask;
    let stepName: string;
    stepName = textBoxInput.value;
    this.step = this.taskDetailService.createStep(stepName);
    this.activeTask.steps.push(this.step);
    textBoxInput.value = '';
    this.dataService.activeTask = this.activeTask;
  }

  /**
   * Displays the pop up confirm modal before hard delete is performed.
   */
  toggleTaskPopUpDisplay() {
    this.isTaskPopHidden = !this.isTaskPopHidden;
  }

  /**
   * Hides the task detail panel.
   */
  hideTaskDetail() {
    CommonUtil.hideTaskDetailPanel();
  }

  /**
   * Displays the pop up confirm modal before hard delete is performed.
   */
  toggleStepPopUpDisplay(step: Step) {
    this.activeStep = step;
    this.isStepPopHidden = !this.isStepPopHidden;
  }


  /**
   * Hard Deletes the step object by removing the step from the
   * steps array in the task object.
   */
  deleteStep() {
    this.isStepPopHidden = !this.isStepPopHidden;
    this.taskDetailService.deleteStep(this.activeStep);
  }

  /**
   * Updates the name of the task.
   *
   * @param inputTextBox it is the text box element where the
   * updated name has been entered.
   */
  updateTaskName(inputTextBox) {
    const newTaskName: string = inputTextBox.value;
    console.log(newTaskName);
    this.taskService.updateTaskName(newTaskName);
    inputTextBox.blur();
  }
  /**
   * Hard Deletes the task object by removing the task from the
   * task array in the list object.
   *
   * @param task It is the task object which should be deteleted.
   */
  deleteTask(task: Task) {
    this.taskService.deleteTask(task);
    this.isTaskPopHidden = !this.isTaskPopHidden;
    CommonUtil.hideTaskDetailPanel();
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

  /**
   * Toggles the isFinished variable true if step is finished, false if the
   * task havenot completed.
   *
   * @param step It is the step for which the if finished must be
   * toggeled.
   */
  toggleStepIsFinished(step) {
    step.isFinished = !step.isFinished;
    console.log(this.dataService.activeTask.steps);
  }

}
