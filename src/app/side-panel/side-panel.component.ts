import { Component, OnInit } from '@angular/core';import { Injectable } from '@angular/core';
import { List } from '../list';
import { CollectionOfList } from '../collection-of-list';
import { Util } from '../util';
import { of } from 'rxjs';
@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent  {

  constructor() { }

  collectionOfList: CollectionOfList;
  CollectionOfList = CollectionOfList;
  list: List;
  isTaskDetailPanelOpen: boolean;
  isSidePanelOpen: boolean;

  /**
   * Opens the side panel when the menu button us pressed. Closes the side panel
   * when the menu button is pressed again.
   */
  navigateActionOfMenuButton() {
    const menuButton = Util.retrieveElementbyIdOrClass('.menu-button');
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
      const navigationDetail = document.querySelectorAll('.navigation-detail');
      const sidePanel = Util.retrieveElementbyIdOrClass('.side-panel');
      const listDetail = Util.retrieveElementbyIdOrClass('.list-detail');
      const menuButton = Util.retrieveElementbyIdOrClass('.menu-button');
      const listNames = document.querySelectorAll('.list-name');
      const menuNames = document.querySelectorAll('.menu-name');
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
          this.showSidePanelElement(navigationDetail);
          this.showSidePanelElement(listNames);
          this.showSidePanelElement(menuNames);
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
          this.hideSidePanelElement(navigationDetail);
          this.hideSidePanelElement(listNames);
          this.hideSidePanelElement(menuNames);
          Util.setAttributeForElemenet(menuButton, 'aria-pressed', 'true');
      }
  }

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

  /**
   * Shows the side panel content by changing the left margin of
   * elements of the side panel.
   * @param  element, it is element of the side panel for which the
   * left margin should be altered.
   */
  showSidePanelElement(elements) {
    let element: any;
    for (element of  elements) {
      element.classList.replace('margin-when-side-panel-closed',
           'margin-when-side-panel-opened');
    }
  }

  /**
   * Hides the given content from the screen by changing the left margin of
   * elements of the side panel.
   *
   * @param  element, it is element of the side panel for which the
   * left margin should be altered.
   */
  hideSidePanelElement(elements) {
    let element: any;
    for (element of  elements) {
        element.classList.replace('margin-when-side-panel-opened',
                'margin-when-side-panel-closed');
    }
  }

  /**
   * Hides the task detail panel with the consideration of side panel open or
   * closed.
   */
  hideTaskDetailPanel() {
    this.isTaskDetailPanelOpen = false;
    if (false === this.isSidePanelOpen) {
      Util.retrieveElementbyIdOrClass('.list-detail').classList.remove('list-when-task-side-opened',
          'list-when-side-opened', 'list-when-task-opened');
      Util.retrieveElementbyIdOrClass('.list-detail').classList.add('list-when-task-side-closed');
    } else {
      Util.retrieveElementbyIdOrClass('.list-detail').classList.remove('list-when-task-side-opened',
          'list-when-task-side-closed', 'list-when-task-opened');
      Util.retrieveElementbyIdOrClass('.list-detail').classList.add('list-when-side-opened');
    }
    Util.retrieveElementbyIdOrClass('.task-detail').classList.replace('task-detail-width',
        'task-detail-width-none');
  }

}
