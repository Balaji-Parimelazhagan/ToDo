import { Injectable } from '@angular/core';
import { List } from './list';
import { Util } from './util';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  constructor() { }
  list: List;

  /**
   * Creates a new list object and the styles for the list to be displayed.
   *
   * @param name, It is the name of the list entered by the user.
   */
  createList(listName: string) {
    /*let nameSuffix: string;
    nameSuffix = validateName(listName, "list");*/
    this.list = {id: Util.generateId(), name: listName, nameSuffix: '', status: true, tasks: []};
    return this.list;
  }
}
