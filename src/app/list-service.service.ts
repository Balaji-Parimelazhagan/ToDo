import { Injectable } from '@angular/core';
import { List } from './list';
import { CollectionOfList } from './collection-of-list';
import { Util } from './util';

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {
  CollectionOfList = CollectionOfList;
  constructor() { }
  collectionOfList: CollectionOfList;
  list: List;

  /**
   * Creates a new list object and the styles for the list to be displayed.
   *
   * @param name, It is the name of the list entered by the user.
   */
  createList(input) {
    let listName: string;
    listName = input.value;
    /*let nameSuffix: string;
    nameSuffix = validateName(listName, "list");*/
    this.list = {id: Util.generateId(), name: listName, nameSuffix: '', status: true, tasks: []};
    this.collectionOfList.lists.push(this.list);
  }
}
