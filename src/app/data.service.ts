import { Injectable } from '@angular/core';
import { List } from './list';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  list: List;
  private sourceList = new BehaviorSubject(this.list);
  activeList = this.sourceList.asObservable();

  constructor() { }

  updateActiveList(changedList: List) {
    console.log(changedList);
    this.sourceList.next(changedList);
    console.log(this.sourceList);
  }
}
