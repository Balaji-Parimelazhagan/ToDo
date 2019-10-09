import { DataService } from './data.service';

export class Util {

    private static isTaskDetailPanelOpen: boolean;
    private static isSidePanelOpen: boolean;

    constructor() {}

    /**
     * Retrieves the element either by class name or id.
     *
     * @param element, It is element which has to be get.
     */
    public static retrieveElementbyIdOrClass(element) {
        return document.querySelector(element);
    }

    /**
     * Sets the attribute for the given element with coressponding attribute and name.
     *
     * @param element, It is the element for which the attribute has to
     * be set.
     * @param attribute, It is the attribute which has to be set for the
     * element.
     * @param  attributeName, It is the name of attribute.
     */
    public static setAttributeForElemenet(element, attribute, attributeName) {
        return element.setAttribute(attribute, attributeName);
    }

    /**
     * Generates the id which is unique for all instance.
     */
    public static generateId() {
        return Date.now();
    }


    /**
     * Hides the task detail panel with the consideration of side panel open or
     * closed.
     */
    public static hideTaskDetailPanel() {
        this.isTaskDetailPanelOpen = false;
        if (false === this.isSidePanelOpen) {
            this.retrieveElementbyIdOrClass('.list-detail').classList.remove('list-when-task-side-opened',
                        'list-when-side-opened', 'list-when-task-opened');
            this.retrieveElementbyIdOrClass('.list-detail').classList.add('list-when-task-side-closed');
        } else {
            this.retrieveElementbyIdOrClass('.list-detail').classList.remove('list-when-task-side-opened',
                        'list-when-task-side-closed', 'list-when-task-opened');
            this.retrieveElementbyIdOrClass('.list-detail').classList.add('list-when-side-opened');
        }
        this.retrieveElementbyIdOrClass('.task-detail').classList.replace('task-detail-width',
                'task-detail-width-none');
    }

    /**
     * Displays the task detail panel with the consideration od side panel.
     */
    public static showTaskDetailPanel() {
        this.isTaskDetailPanelOpen = true;
        if (false === this.isSidePanelOpen) {
            this.retrieveElementbyIdOrClass('.list-detail').classList.remove('list-when-task-side-opened',
                    'list-when-task-side-closed', 'list-when-side-opened');
            this.retrieveElementbyIdOrClass('.list-detail').classList.add('list-when-task-opened');
        } else {
            this.retrieveElementbyIdOrClass('.list-detail').classList.remove('list-when-task-opened',
                        'list-when-task-side-closed', 'list-when-side-opened');
            this.retrieveElementbyIdOrClass('.list-detail').classList.add('list-when-task-side-opened');
        }
        this.retrieveElementbyIdOrClass('.task-detail').classList.replace('task-detail-width-none',
                'task-detail-width');
    }

    /**
     * Opens the side panel in a sliding manner, whenever menu bar icon or add list
     * icon(plus icon) is clicked.
     *
     * @param  action , It is the action which defines the whether the side
     * panel is to be opened or closed.
     */
    public static navigateSidePanel(action) {
        const sidePanel = this.retrieveElementbyIdOrClass('.side-panel');
        const menuButton = this.retrieveElementbyIdOrClass('.menu-button');
        if (action === 'open') {
            this.isSidePanelOpen = true;
            sidePanel.classList.replace('side-panel-closed-width', 'side-panel-opened-width');
            if (false === this.isTaskDetailPanelOpen) {
              this.retrieveElementbyIdOrClass('.list-detail').classList.remove('list-when-task-side-opened',
                'list-when-task-side-closed', 'list-when-task-opened');
              this.retrieveElementbyIdOrClass('.list-detail').classList.add('list-when-side-opened');
            } else {
              this.retrieveElementbyIdOrClass('.list-detail').classList.remove('list-when-side-opened',
                'list-when-task-side-closed', 'list-when-task-opened');
              this.retrieveElementbyIdOrClass('.list-detail').classList.add('list-when-task-side-opened');
            }
            this.setAttributeForElemenet(menuButton, 'aria-pressed', 'false');
        } else {
            this.isSidePanelOpen = false;
            sidePanel.classList.replace('side-panel-opened-width', 'side-panel-closed-width');
            if (false === this.isTaskDetailPanelOpen) {
              this.retrieveElementbyIdOrClass('.list-detail').classList.remove('list-when-side-opened',
                'list-when-task-side-opened', 'list-when-task-opened');
              this.retrieveElementbyIdOrClass('.list-detail').classList.add('list-when-task-side-closed');
            } else {
              this.retrieveElementbyIdOrClass('.list-detail').classList.remove('list-when-side-opened',
                'list-when-task-side-opened', 'list-when-task-side-closed');
              this.retrieveElementbyIdOrClass('.list-detail').classList.add('list-when-task-opened');
            }
            this.setAttributeForElemenet(menuButton, 'aria-pressed', 'true');
        }
    }

    /**
     * Validates the given name, checks whether the name is already present.
     * If the name is already present, then it appends a integer within brackets
     * to the name. The integer will be increased as the dupicate increases.
     *
     * @param  rawName, It is name that should be validated.
     * @param  collectionOfList, It is array of list where the name validation
     * has to be done.
     */
    public static validateName(rawName, collectionOfList) {
        let duplicateNames = [];
        duplicateNames = collectionOfList.lists.filter(list => list.name === rawName);
        const duplicatesCount = duplicateNames.length;
        if (0 !== duplicatesCount) {
            return ' (' + duplicatesCount + ')';
        } else {
            return '';
        }
    }
}
