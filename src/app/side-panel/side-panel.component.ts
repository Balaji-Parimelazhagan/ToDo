import { Component} from '@angular/core';

import { List } from '../model/list';
import { ListService } from '../service/list.service';
import { CommonUtil } from '../util/common-util';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})

export class SidePanelComponent  {


  constructor(private listService: ListService, private dataService: DataService) { }

  list: List;
  sidePanelStatus = false;

  OnInit() {}

  /**
   * Creates a new list object and the styles for the list to be displayed.
   *
   * @param textBoxInput, It is the name of the list entered by the user.
   */
  createList(textBoxInput) {
    let listName: string;
    listName = textBoxInput.value;
    this.list = this.listService.createList(listName);
    this.dataService.collectionOfList.lists.push(this.list);
    textBoxInput.value = '';
    this.displayList(this.list);
  }

  /**
   * Assigns the selected list as the active list.
   *
   * @param selectedList it is the list selected by the userto display its
   * details.
   */
  displayList(selectedList: List) {
    this.dataService.activeList = selectedList;
    CommonUtil.hideTaskDetailPanel();
  }
  /**
   * Opens the side panel when the menu button us pressed. Closes the side panel
   * when the menu button is pressed again.
   */
  navigateActionOfMenuButton() {
    const menuButton = CommonUtil.retrieveElementbyIdOrClass('.menu-button');
    this.sidePanelStatus = !this.sidePanelStatus;
    if (menuButton.getAttribute('aria-pressed') === 'true') {
      CommonUtil.navigateSidePanel('open');
    } else {
      CommonUtil.navigateSidePanel('close');
    }
  }

}
