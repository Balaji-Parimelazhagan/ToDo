import { Injectable } from '@angular/core';
import { List } from '../model/list';
import { CommonUtil } from '../util/common-util';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private dataService: DataService) { }

  list: List;

  /**
   * Creates a new list object and the styles for the list to be displayed.
   *
   * @param name, It is the name of the list entered by the user.
   */
  createList(listName: string) {
    let listNameSuffix: string;
    listNameSuffix = CommonUtil.validateName(listName,
                        this.dataService.collectionOfList);
    this.list = {id: CommonUtil.generateId(),
                 name: listName,
                 nameSuffix: listNameSuffix,
                 tasks: []};
    return this.list;
  }

  /**
   * Updates the name of the list.
   *
   * @param newListName It is the new list name which has to be updated.
   */
  updateListName(newListName: string) {
    this.dataService.activeList.name = newListName;
  }
}
