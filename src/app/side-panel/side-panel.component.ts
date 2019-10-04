import { Component} from '@angular/core';

import { List } from '../list';
import { ListService } from '../list.service';
import { Util } from '../util';
import { DataService } from '../data.service';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})

export class SidePanelComponent  {


  constructor(private listService: ListService, private data: DataService) { }

  isSidePanelOpen: boolean;
  isTaskDetailPanelOpen: boolean;
  list: List;

  collectionOfList = {lists: [] };
  sidePanelStatus = false;

  OnInit() {
    this.data.activeList.subscribe(activelist => this.list = activelist);
  }

  /**
   * Creates a new list object and the styles for the list to be displayed.
   *
   * @param textBoxInput, It is the name of the list entered by the user.
   */
  createList(textBoxInput) {
    let listName: string;
    listName = textBoxInput.value;
    this.list = this.listService.createList(listName);
    this.collectionOfList.lists.push(this.list);
    textBoxInput.value = '';
    this.data.updateActiveList(this.list);
  }

  /**
   * Assigns the selected list as the active list.
   *
   * @param selectedList it is the list selected by the userto display its
   * details.
   */
  displayList(selectedList: List) {
    this.data.updateActiveList(selectedList);
  }
  /**
   * Opens the side panel when the menu button us pressed. Closes the side panel
   * when the menu button is pressed again.
   */
  navigateActionOfMenuButton() {
    const menuButton = Util.retrieveElementbyIdOrClass('.menu-button');
    this.sidePanelStatus = !this.sidePanelStatus;
    if (menuButton.getAttribute('aria-pressed') === 'true') {
        this.navigateSidePanel('open');
    } else {
        this.navigateSidePanel('close');
    }
  }

  /**
   * Opens the side panel in a sliding manner, whenever menu bar icon or add list
   * icon(plus icon) is clicked.
   *
   * @param  action , It is the action which defines the whether the side
   * panel is to be opened or closed.
   */
  navigateSidePanel(action) {
      const sidePanel = Util.retrieveElementbyIdOrClass('.side-panel');
      const menuButton = Util.retrieveElementbyIdOrClass('.menu-button');
      if (action === 'open') {
          this.isSidePanelOpen = true;
          sidePanel.classList.replace('side-panel-closed-width', 'side-panel-opened-width');
          if (false === this.isTaskDetailPanelOpen) {
            Util.retrieveElementbyIdOrClass('.list-detail').classList.remove('list-when-task-side-opened',
              'list-when-task-side-closed', 'list-when-task-opened');
            Util.retrieveElementbyIdOrClass('.list-detail').classList.add('list-when-side-opened');
          } else {
            Util.retrieveElementbyIdOrClass('.list-detail').classList.remove('list-when-side-opened',
              'list-when-task-side-closed', 'list-when-task-opened');
            Util.retrieveElementbyIdOrClass('.list-detail').classList.add('list-when-task-side-opened');
          }
          Util.setAttributeForElemenet(menuButton, 'aria-pressed', 'false');
      } else {
          this.isSidePanelOpen = false;
          sidePanel.classList.replace('side-panel-opened-width', 'side-panel-closed-width');
          if (false === this.isTaskDetailPanelOpen) {
            Util.retrieveElementbyIdOrClass('.list-detail').classList.remove('list-when-side-opened',
              'list-when-task-side-opened', 'list-when-task-opened');
            Util.retrieveElementbyIdOrClass('.list-detail').classList.add('list-when-task-side-closed');
          } else {
            Util.retrieveElementbyIdOrClass('.list-detail').classList.remove('list-when-side-opened',
              'list-when-task-side-opened', 'list-when-task-side-closed');
            Util.retrieveElementbyIdOrClass('.list-detail').classList.add('list-when-task-opened');
          }
          Util.setAttributeForElemenet(menuButton, 'aria-pressed', 'true');
      }
  }
}
