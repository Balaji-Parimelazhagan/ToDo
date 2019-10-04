import { Component, OnInit } from '@angular/core';

import { List } from '../list';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { DataService } from '../data.service';
@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})
export class ListDetailComponent {

  constructor(private data: DataService, private taskService: TaskService) {}

  activeList: List;
  task: Task;
  activeListName: string;
  activeListTasks: Task[];

  OnInit() {
    this.data.activeList.subscribe(list => this.activeList = list);
    this.activeListName =  this.activeList.name;
    this.activeListTasks = this.activeList.tasks;
  }


  /**
   * Creates a new task object and the styles for the list to be displayed.
   *
   * @param textBoxInput, It is the name of the list entered by the user.
   */
createTask(textBoxInput) {
    let taskName: string;
    taskName = textBoxInput.value;
    this.task = this.taskService.createTask(taskName);
    console.log(this.activeList);
    this.activeList.tasks.push(this.task);
    textBoxInput.value = '';
    this.data.updateActiveList(this.activeList);
  }


}
