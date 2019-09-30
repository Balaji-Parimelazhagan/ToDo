'use strict';
init();
var collectionOfList = [];
var activeListId;
var activeTaskId;
var activeStepId;
var activeTaskCheckboxId;
var isTaskDetailPanelOpen = false;
var isSidePanelOpen = false;

/**
 * Initiates the global listeners with corresponding event and call the
 * respective functions. 
 */
function init() {
    retrieveElementbyIdOrClass(".task-name-input").addEventListener("focus", toggleTaskInputClassIcon);
    retrieveElementbyIdOrClass(".task-name-input").addEventListener("focusout", toggleTaskInputClassIcon);
    retrieveElementbyIdOrClass(".menu-button").addEventListener("click", navigateActionOfMenuButton);
    retrieveElementbyIdOrClass(".task-detail-panel-close").addEventListener("click", hideTaskDetailPanel);
    retrieveElementbyIdOrClass(".new-list-button").addEventListener("click", navigateActionOfMenuButton);
    retrieveElementbyIdOrClass("#newListInput").addEventListener("keydown", addNewListWhenEnterIsPressed);
    retrieveElementbyIdOrClass("#new-task-input-box").addEventListener("keydown", addNewTaskWhenEnterIsPressed);
    retrieveElementbyIdOrClass(".task-detail-delete").addEventListener("click", deleteTask);
    retrieveElementbyIdOrClass("#new-step-input-box").addEventListener("keydown", addNewStepWhenEnterIsPressed);
    retrieveElementByIdUsingES5("task-status-detail-checkbox").addEventListener("click", toggleTaskNameStrikeThrough);
}

/**
 * Toggeles the plus icon (near input text box) to circle icon.
 * When the text-box is focused the circle icon displays, when the text box
 * losses the focus it is toggled to plus icon.
 */
function toggleTaskInputClassIcon() {
    retrieveElementbyIdOrClass(".add-task-icon").classList.toggle("add-task-plus-icon");
    retrieveElementbyIdOrClass(".add-task-icon").classList.toggle("add-task-circle-icon");
}

/**
 * Opens the side panel when the menu button us pressed. Closes the side panel
 * when the menu button is pressed again. 
 */
function navigateActionOfMenuButton() {
    var menuButton = retrieveElementbyIdOrClass(".menu-button");
    if (menuButton.getAttribute("aria-pressed")==="true") {
        navigateSidePanel("open");
    } else {
        navigateSidePanel("close");
    }
}

/**
 * Creates a new task when the enter is pressed with task input text box as a
 * required feild.
 */
function addNewTaskWhenEnterIsPressed() {
    if (event.keyCode === 13) {
        var inputText = retrieveElementbyIdOrClass("#new-task-input-box");
        if ("" != inputText.value) {
            addNewTask(inputText.value);
        }
    }
}

/**
 * Creates a new list when the enter is pressed with list input text box as a
 * required feild. It also hide the task detail panel.
 */
function addNewListWhenEnterIsPressed() {
    if (event.keyCode === 13) {
        var inputText = retrieveElementbyIdOrClass("#newListInput");
        if ("" != inputText.value) {
            hideTaskDetailPanel();
            createList(inputText.value);
        }
    }
}

/**
 * Opens the side panel in a sliding manner, whenever menu bar icon or add list
 * icon(plus icon) is clicked.
 * 
 * @param {String} action , It is the action which defines the whether the side
 * panel is to be opened or closed.
 */
function navigateSidePanel(action){
    var navigationDetail = document.querySelectorAll(".navigation-detail");
    var sidePanel = retrieveElementbyIdOrClass(".side-panel");
    var listDetail = retrieveElementbyIdOrClass(".list-detail");
    var menuButton = retrieveElementbyIdOrClass(".menu-button");
    var listNames = document.querySelectorAll(".list-name");
    var menuNames = document.querySelectorAll(".menu-name");
    if (action==="open") {
        isSidePanelOpen = true;
        sidePanel.classList.replace("side-panel-closed-width", "side-panel-opened-width");
        if (false == isTaskDetailPanelOpen) {
            retrieveElementbyIdOrClass(".list-detail").classList.remove("list-when-task-side-opened",
            "list-when-task-side-closed", "list-when-task-opened");
            retrieveElementbyIdOrClass(".list-detail").classList.add("list-when-side-opened");
        } else {
            retrieveElementbyIdOrClass(".list-detail").classList.remove("list-when-side-opened",
            "list-when-task-side-closed", "list-when-task-opened");
            retrieveElementbyIdOrClass(".list-detail").classList.add("list-when-task-side-opened");
        }
        showSidePanelElement(navigationDetail);
        showSidePanelElement(listNames);
        showSidePanelElement(menuNames);
        setAttributeForElemenet(menuButton, "aria-pressed", "false");
    } else {
        isSidePanelOpen = false;
        sidePanel.classList.replace("side-panel-opened-width", "side-panel-closed-width");
        if (false == isTaskDetailPanelOpen) {
            retrieveElementbyIdOrClass(".list-detail").classList.remove("list-when-side-opened",
            "list-when-task-side-opened", "list-when-task-opened");
            retrieveElementbyIdOrClass(".list-detail").classList.add("list-when-task-side-closed");
        } else {
            retrieveElementbyIdOrClass(".list-detail").classList.remove("list-when-side-opened",
            "list-when-task-side-opened", "list-when-task-side-closed");
            retrieveElementbyIdOrClass(".list-detail").classList.add("list-when-task-opened");
        }
        hideSidePanelElement(navigationDetail);
        hideSidePanelElement(listNames);
        hideSidePanelElement(menuNames);
        setAttributeForElemenet(menuButton, "aria-pressed", "true");
    }
}

/** 
 * Hides the given content from the screen by changing the left margin of 
 * elements of the side panel.
 * 
 * @param {Object} element, it is element of the side panel for which the
 * left margin should be altered. 
 */
function hideSidePanelElement(element) {
    for (let loopCount = 0; loopCount < element.length; loopCount++) {
        element[loopCount].classList.replace("margin-when-side-panel-opened",
                "margin-when-side-panel-closed");
    }
}

/** 
 * Shows the side panel content by changing the left margin of 
 * elements of the side panel.
 *  * @param {Object} element, it is element of the side panel for which the
 * left margin should be altered. 
 */
function showSidePanelElement(element) {
    for (let loopCount = 0; loopCount < element.length; loopCount++) {
        element[loopCount].classList.replace("margin-when-side-panel-closed",
                "margin-when-side-panel-opened");
    }
}

/**
 * Hides the task detail panel with the consideration of side panel open or
 * closed.
 */
function hideTaskDetailPanel() {
    isTaskDetailPanelOpen = false;
    if (false == isSidePanelOpen) {
            retrieveElementbyIdOrClass(".list-detail").classList.remove("list-when-task-side-opened",
                    "list-when-side-opened", "list-when-task-opened");
            retrieveElementbyIdOrClass(".list-detail").classList.add("list-when-task-side-closed");
        } else {
            retrieveElementbyIdOrClass(".list-detail").classList.remove("list-when-task-side-opened",
                    "list-when-task-side-closed", "list-when-task-opened");
            retrieveElementbyIdOrClass(".list-detail").classList.add("list-when-side-opened");
        }
    retrieveElementbyIdOrClass(".task-detail").classList.replace("task-detail-width",
            "task-detail-width-none");
}

/**
 * Displays the task detail panel with the consideration od side panel.
 */
function showTaskDetailPanel() {
    isTaskDetailPanelOpen = true;
    if (false == isSidePanelOpen) {
        retrieveElementbyIdOrClass(".list-detail").classList.remove("list-when-task-side-opened",
                "list-when-task-side-closed", "list-when-side-opened");
        retrieveElementbyIdOrClass(".list-detail").classList.add("list-when-task-opened");
        } else {
            retrieveElementbyIdOrClass(".list-detail").classList.remove("list-when-task-opened",
                    "list-when-task-side-closed", "list-when-side-opened");
            retrieveElementbyIdOrClass(".list-detail").classList.add("list-when-task-side-opened");
        }
    retrieveElementbyIdOrClass(".task-detail").classList.replace("task-detail-width-none",
            "task-detail-width");
}

/**
 * Displays the given existing list with appropriate stylings. This also displays
 * the count of the tasks in the list.
 * 
 * @param {Object} list, it is the object which contains the details of the list
 * which has to be displayed. 
 */
function displayExistingList(list) {
    var taskListCollection = retrieveElementbyIdOrClass(".task-list-collection");
    var newList = createDivWithClassAndId(newList, "list-of-task", list.id);
    var listIcon = createElement("img");
    setAttributeForElemenet(listIcon, "id", list.id);
    listIcon.src = "css/images/list.png";
    appendChildWithParent(newList, listIcon);
    var listNameDiv = createDivWithClassAndId(listNameDiv,
            "list-name margin-when-side-panel-opened", list.id);
    var listName = document.createTextNode(list.name + list.nameSuffix);
    appendChildWithParent(listNameDiv, listName);
    appendChildWithParent(newList, listNameDiv);
    var tasks = list.tasks.filter(task => true == task.status) 
    var taskCount = tasks.length;
    if (0 < taskCount) {
        var taskCountSpan = createElement("span");
        setAttributeForElemenet(taskCountSpan, "class", "task-count");
        var taskCountText = document.createTextNode("" + taskCount);
        appendChildWithParent(taskCountSpan, taskCountText);
        appendChildWithParent(newList, taskCountSpan);
    }
    appendChildWithParent(taskListCollection, newList);
    addEventListenerForList(list.id);
}

/**
 * Creates a new list object and the styles for the list to be displayed.
 * 
 * @param {String} name, It is the name of the list entered by the user.
 */
function createList(name) {
    var list = createListObject(name);
    var taskListCollection = retrieveElementbyIdOrClass(".task-list-collection");
    var newList = createDivWithClassAndId(newList, "list-of-task", list.id);
    var listIcon = createElement("img");
    setAttributeForElemenet(listIcon, "id", list.id);
    listIcon.src = "css/images/list.png";
    appendChildWithParent(newList, listIcon);
    var listNameDiv = createDivWithClassAndId(listNameDiv,
            "list-name margin-when-side-panel-opened", list.id);
    var listName = document.createTextNode(list.name + list.nameSuffix);
    appendChildWithParent(listNameDiv, listName);
    appendChildWithParent(newList, listNameDiv);
    appendChildWithParent(taskListCollection, newList);
    retrieveElementbyIdOrClass("#newListInput").value = "";
    loadInnerHTML(retrieveElementbyIdOrClass(".list-of-task-name"), "" + name + list.nameSuffix + "");
    loadInnerHTML(retrieveElementbyIdOrClass(".task-collection"), "");
    addEventListenerForList(list.id);
}

/**
 * Creates an object of list and set the default attributes the list.
 * 
 * @param {String} listName, It is the name of the list for which the object
 * has to be created.
 */
function createListObject(listName) {

    //validates the name and prevents the duplication.
    var nameSuffix = validateName(listName, "list");
    var newlist = new Object();

    //This method creates a unique id for the list.
    var id = Date.now();
    newlist.name = "" + listName + "";
    newlist.nameSuffix = nameSuffix;
    newlist.id = id;
    newlist.tasks = [];
    newlist.status = true;
    activeListId = newlist.id;
    collectionOfList.push(newlist);
    return newlist;
}

/**
 * Adds the click event listener for the div, when the div is clicked it hides
 * task detail panel, assigns the div id as active list id, overwrites the name
 * of the list in the list detail area.
 * 
 * @param {Integer} id, It is the id div for which the event listener should be
 * added.
 */
function addEventListenerForList(id) {
    retrieveElementByIdUsingES5(id).addEventListener("click", function(event){
        var targetId = event.target.id;
        var activeList = collectionOfList.find(function(listToBeChecked) {
                return listToBeChecked.id == targetId;
        });
        hideTaskDetailPanel();
        loadInnerHTML(retrieveElementbyIdOrClass(".list-of-task-name"), "" + activeList.name + activeList.nameSuffix + "");
        loadInnerHTML(retrieveElementbyIdOrClass(".task-collection"), "");
        activeListId = activeList.id;
        activeList.tasks.forEach(function(task) {
            if (true == task.status) {
                displayExistingTask(task);
            }
        });
    });
}

/**
 * Displays the given existing task with appropriate stylings. This also displays
 * the count of the completed and total steps in the task.
 * 
 * @param {Object} task, it is the object which contains the details of the task
 * which has to be displayed. 
 */
function displayExistingTask(task){
    var taskCollection = retrieveElementbyIdOrClass(".task-collection");
    var newTask = createDivWithClassAndId(newTask, "task", task.id);
    var checkBoxId = task.id + task.name;
    var taskStatusLabel;
    var taskStatusCheckbox;
    createLabelAndCheckbox(taskStatusCheckbox, taskStatusLabel, newTask, checkBoxId, task.id);
    var taskNameDiv = createDivWithClassAndId(newTask, "task-name text-decoration-none", task.id);
    var taskName = document.createTextNode(task.name + task.nameSuffix);
    appendChildWithParent(taskNameDiv, taskName);
    appendChildWithParent(newTask, taskNameDiv);
    var completedSteps = task.steps.filter(step => true == step.isFinished);
    var completedStepCount = completedSteps.length;
    if (0 < completedStepCount) {
        var stepCountSpan = createElement("span");
        setAttributeForElemenet(stepCountSpan, "class", "step-count");
        var stepCountText = document.createTextNode(completedStepCount +"of" + task.steps.length);
        appendChildWithParent(stepCountSpan, stepCountText);
        appendChildWithParent(newTask, stepCountSpan);
    }
    appendChildWithParent(taskCollection, newTask);
    addEventListenerForTask(task.id);
    addEventListenerForTaskStatusCheckbox(checkBoxId);
    loadTaskCheckBox(task, task.id, checkBoxId);
}

/**
 * Refreshes the lists which present at the side panel area, and displays the 
 * list which is undeleted.
 */
function reloadLists() {    
    loadInnerHTML(retrieveElementbyIdOrClass(".task-list-collection"), "");
    collectionOfList.forEach(function(list) {
        if (true == list.status) {
            displayExistingList(list);
        }
    });
}

/**
 * Refreshes the tasks which present at the list detail area, and displays the 
 * tasks which is undeleted.
 */
function reloadTasks() {    
    loadInnerHTML(retrieveElementbyIdOrClass(".task-collection"), "");
    var activeList = collectionOfList.find(list => list.id == activeListId);
    activeList.tasks.forEach(function(activeTask) {
        if (true == activeTask.status) {
            displayExistingTask(activeTask);
        }
    });
}

/**
 * Creates a new task object and the styles for the task to be displayed.
 * 
 * @param {String} name, It is the name of the task entered by the user.
 */
function addNewTask(name) {
    var task = createTask(name);
    var taskCollection = retrieveElementbyIdOrClass(".task-collection");
    var newTask = createDivWithClassAndId(newTask, "task", "");
    var taskStatusLabel;
    var taskStatusCheckbox;
    var checkBoxId = task.id + task.name;
    createLabelAndCheckbox(taskStatusCheckbox, taskStatusLabel, newTask, checkBoxId, task.id);
    var taskNameDiv = createDivWithClassAndId(taskNameDiv, "task-name text-decoration-none", task.id);
    var taskName = document.createTextNode(task.name + task.nameSuffix);
    appendChildWithParent(taskNameDiv, taskName);
    appendChildWithParent(newTask, taskNameDiv);
    appendChildWithParent(taskCollection, newTask);
    retrieveElementbyIdOrClass("#new-task-input-box").value = "";
    activeTaskCheckboxId = checkBoxId
    addEventListenerForTask(task.id);
    addEventListenerForTaskStatusCheckbox(checkBoxId);
    loadInnerHTML(retrieveElementbyIdOrClass(".steps"), "");
    loadInnerHTML(retrieveElementbyIdOrClass(".task-name-detail"), "" + task.name + task.nameSuffix + "");
    reloadLists();
}

/**
 * Creates an object of task and set the default attributes the task.
 * 
 * @param {String} taskName, It is the name of the task for which the object
 * has to be created.
 */
function createTask(taskName) {

    //validates the name and prevents the duplication.
    var nameSuffix = validateName(taskName, "task");

    //This method creates a unique id for the list.
    var id = Date.now();
    var newtask = new Object();
    newtask.name = "" + taskName + "";
    newtask.nameSuffix = nameSuffix;
    newtask.id =  id;
    newtask.isFinished =  false;
    newtask.status =  true;
    newtask.steps = [];
    var activeList = collectionOfList.find(list => list.id == activeListId);
    activeList.tasks.push(newtask);
    activeTaskId = newtask.id;
    return newtask;
}

/**
 * Adds the click event listener for the div, assigns the div id as active task
 * id, overwrites the name of the task in the task detail area. 
 * Also displays the task detail panel.This also displays the steps in the
 * task which is undeleted and the status whether it is completed or not.
 * 
 * @param {Integer} id, It is the id div for which the event listener should be
 * added.
 */
function addEventListenerForTask(id) {
    retrieveElementByIdUsingES5(id).addEventListener("click", function(event){
        var targetId = event.target.id;
        var activeTask = retrieveTask(targetId);
        activeTaskId = activeTask.id;
        activeTaskCheckboxId = activeTask.id + activeTask.name;
        loadTaskCheckBox(activeTask, targetId, activeTaskCheckboxId);
        showTaskDetailPanel();
        loadInnerHTML(retrieveElementbyIdOrClass(".task-name-detail"), "" + activeTask.name + activeTask.nameSuffix + "");
        loadTaskName(activeTask, targetId);
        loadInnerHTML(retrieveElementbyIdOrClass(".steps"), "");
        activeTask.steps.forEach(function(step) {
            if (true == step.status) {
                displayExistingStep(step);
            }
        });
    });
}

/**
 * Adds the click event listener for the checkbox, When the checkbox is clicked
 * it checks the check box present in both list detail area and task detail,
 * area it displays the task detail panel, display the existing steps, and
 * performs a strike out operation on name of the task name in the list detail
 * area and task detail area.
 * 
 * @param {Integer} checkBoxId, It is the id of the checkbox, for which the
 * event listener should be added.
 */
function addEventListenerForTaskStatusCheckbox(checkBoxId) {
    retrieveElementByIdUsingES5(checkBoxId).addEventListener("click", function(event){
        var targetId = event.target.name;
        var activeTask = retrieveTask(targetId);
        showTaskDetailPanel();
        loadInnerHTML(retrieveElementbyIdOrClass(".task-name-detail"), "" + activeTask.name + activeTask.nameSuffix + "");
        loadTaskName(activeTask, targetId);
        loadInnerHTML(retrieveElementbyIdOrClass(".steps"), "");
        activeTask.steps.forEach(function(step) {
            if (true == step.status) {
                displayExistingStep(step);
            }
        });
        var checkBox = retrieveElementByIdUsingES5(checkBoxId);
        if(true == checkBox.checked) {
            activeTask.isFinished = true;
            retrieveElementByIdUsingES5("task-status-detail-checkbox").checked = true;
            loadTaskName(activeTask, targetId);
        } else {
            activeTask.isFinished = false;
            retrieveElementByIdUsingES5("task-status-detail-checkbox").checked = false;
            loadTaskName(activeTask, targetId);
        }
        loadInnerHTML(retrieveElementbyIdOrClass(".steps"), "");
        activeTaskId = activeTask.id;
        activeTaskCheckboxId = checkBoxId;
        activeTask.steps.forEach(function(step) {
            if (true == step.status) {
                displayExistingStep(step);
            }
        });
    });
}

/**
 * Deletes the active task, at first it a popup is displayed for the
 * confirmation. After the confirmation it hides the task detail panel,
 * soft deletes the active task, reload the remaining undeleted tasks and
 * refreshes the lists in the list area.
 */
function deleteTask (){
    var activeTask = retrieveTask(activeTaskId);
    var criteriaNameSpan =  retrieveElementbyIdOrClass(".criteria-name");
    loadInnerHTML(criteriaNameSpan, "" + activeTask.name + "");
    loadInnerHTML(retrieveElementbyIdOrClass(".delete-button"), "Delete task");
    retrieveElementbyIdOrClass(".modal").classList.replace("model-display-none", "model-display-block");
    retrieveElementbyIdOrClass(".delete-button").onclick = function () {
        activeTask.status = false;
        closeDeletePopup();
        hideTaskDetailPanel();
        loadInnerHTML(retrieveElementbyIdOrClass(".task-collection"), "");
        var activeList = collectionOfList.find(list => list.id == activeListId);
        activeList.tasks.forEach(function(task) {
            if (true == task.status) {
                displayExistingTask(task);
            }
        });
        reloadLists();
    };
}


function toggleTaskNameStrikeThrough(){
    var activeTask = retrieveTask(activeTaskId);
    var checkBox = retrieveElementByIdUsingES5("task-status-detail-checkbox");
    var taskCheckBox = retrieveElementByIdUsingES5(activeTaskCheckboxId);
    if(true == checkBox.checked) {
        activeTask.isFinished = true;
        taskCheckBox.checked = true;
        loadTaskName(activeTask, activeTask.id);
    } else {
        activeTask.isFinished = false;
        taskCheckBox.checked = false;
        loadTaskName(activeTask, activeTask.id);
    }
}

/**
 * Displays the given existing step with appropriate stylings. This also displays
 * the checkbox for the step with status whether it is completed or not.
 * 
 * @param {Object} step, it is the object which contains the details of the step
 * which has to be displayed. 
 */
function displayExistingStep(step) {
    var steps = retrieveElementbyIdOrClass(".steps");
    var newStep = createDivWithClassAndId(newStep, "step text-decoration-none", step.id);
    var checkBoxId = step.id + step.name;
    var stepkStatusLabel;
    var stepStatusCheckbox;
    createLabelAndCheckbox(stepStatusCheckbox, stepkStatusLabel, newStep, checkBoxId, step.id);
    var stepNameDiv = createDivWithClassAndId(stepNameDiv, "step-name text-decoration-none", step.id);
    var stepName = document.createTextNode(step.name + step.nameSuffix);
    appendChildWithParent(stepNameDiv, stepName);
    appendChildWithParent(newStep, stepNameDiv);
    var stepDeleteDiv = createDivWithClassAndId(stepDeleteDiv, "step-delete", step.id);
    appendChildWithParent(newStep, stepDeleteDiv);
    appendChildWithParent(steps, newStep);
    loadStepCheckBox(step, step.id, checkBoxId);
    addEventListenerForStepStatusCheckbox(checkBoxId);
    addEventListenerForDeleteStep(step.id);
}

/**
 * Creates a new step when the enter is pressed with step input text box as a
 * required feild.
 */
function addNewStepWhenEnterIsPressed() {
    if (event.keyCode === 13) {
        let inputText = retrieveElementbyIdOrClass("#new-step-input-box");
        if("" != inputText.value) {
            addNewStep(inputText.value);
        }
    }
}

/**
 * Creates a new step object and the styles for the step to be displayed.
 * 
 * @param {String} name, It is the name of the step entered by the user.
 */
function addNewStep(name) {
    var step = createStep(name);
    var steps = retrieveElementbyIdOrClass(".steps");
    var newStep = createDivWithClassAndId(newStep, "step text-decoration-none", step.id);
    var checkBoxId = step.id + step.name;
    var stepStatusLabel;
    var stepStatusCheckbox;
    createLabelAndCheckbox(stepStatusCheckbox, stepStatusLabel, newStep, checkBoxId, step.id);
    var stepNameDiv = createDivWithClassAndId(stepNameDiv, "step-name text-decoration-none", step.id)
    var stepName = document.createTextNode(step.name + step.nameSuffix);
    appendChildWithParent(stepNameDiv, stepName);
    appendChildWithParent(newStep, stepNameDiv);
    var stepDeleteDiv = createDivWithClassAndId(stepDeleteDiv, "step-delete", step.id);
    appendChildWithParent(newStep, stepDeleteDiv);
    appendChildWithParent(steps, newStep);
    retrieveElementbyIdOrClass("#new-step-input-box").value = "";
    addEventListenerForStepStatusCheckbox(checkBoxId)
    addEventListenerForDeleteStep(step.id);
    reloadTasks();
}

/**
 * Creates an object of step and set the default attributes the step.
 * 
 * @param {String} stepName, It is the name of the step for which the object
 * has to be created.
 */
function createStep(stepName) {
    var nameSuffix = validateName(stepName, "step");
    var step = new Object();
    var id = Date.now();
    step.id = id;
    step.name = "" + stepName + "";
    step.status = true;
    step.nameSuffix = nameSuffix;
    step.isFinished = false;
    var activeTask = retrieveTask(activeTaskId);
    activeTask.steps.push(step);
    return step;
}

function addEventListenerForStepStatusCheckbox(checkBoxId) {
    retrieveElementByIdUsingES5(checkBoxId).addEventListener("click", function(event){
        var targetId = event.target.name;
        var activeTask = retrieveTask(activeTaskId);
        var activeStep = activeTask.steps.find(step => step.id == targetId);
        var checkBox = retrieveElementByIdUsingES5(checkBoxId);
        if(true == checkBox.checked) {
            activeStep.isFinished = true;
            retrieveElementByIdUsingES5(targetId).classList.replace("text-decoration-none", "text-decoration-line");
        } else {
            activeStep.isFinished = false;
            retrieveElementByIdUsingES5(targetId).classList.replace("text-decoration-line", "text-decoration-none");
        }
        reloadTasks();
    });
}

function addEventListenerForDeleteStep(id) {
    retrieveElementByIdUsingES5(id).addEventListener("click", function(event){
        activeStepId = event.target.id;
        var activeTask = retrieveTask(activeTaskId);
        var activeStep = activeTask.steps.find(step => step.id == activeStepId);
        var criteriaNameSpan =  retrieveElementbyIdOrClass(".criteria-name");
        loadInnerHTML(criteriaNameSpan, activeStep.name);
        loadInnerHTML(retrieveElementbyIdOrClass(".delete-button"), "Delete step");
        retrieveElementbyIdOrClass(".modal").classList.replace("model-display-none", "model-display-block");
        retrieveElementbyIdOrClass(".delete-button").onclick = function () {
            var activeTask = retrieveTask(activeTaskId);
            var activeStep = activeTask.steps.find(step => step.id == activeStepId);
            activeStep.status = false;
            closeDeletePopup();
            loadInnerHTML(retrieveElementbyIdOrClass(".steps"), "");
            activeTask.steps.forEach(function(step) {
                if (true == step.status) {
                    displayExistingStep(step);
                }
            });
        };
    });
}

/**
 * Closes the delete popup.
 */
function closeDeletePopup() {
    retrieveElementbyIdOrClass(".modal").classList.replace("model-display-block", "model-display-none");
}

/**
 * Closes the delete popup whenever a click is happened other than the model
 * content area.
 */
window.onclick = function(event) {
    var modal = retrieveElementbyIdOrClass(".modal");
  if (event.target == modal) {
    modal.classList.replace("model-display-block", "model-display-none");
  }
}

/**
 * Creates a div, Sets the class name and id for the div. 
 * 
 * @param {element} div, It is the variable for which the div has to be created.
 * @param {element} classname, It is name of class that should be set as an
 * attribute fo the div.
 * @param {element} id, It is the name of the id that should be set as an
 * attribute of the div.
 */
function createDivWithClassAndId(div, classname, id) {
    div = createElement("div");
    setAttributeForElemenet(div, "class", classname);
    setAttributeForElemenet(div, "id", id);
    return div;
}

/**
 * Retereives the task with respect to the given id.
 * 
 * @param {Integer} taskId, It is id of the task which should be retreived.
 */
function retrieveTask(taskId) {
    var activeList = collectionOfList.find(list => list.id == activeListId);
    var activeTask = activeList.tasks.find(task => task.id == taskId);
    return activeTask;
}

/**
 * Refreshes the checkbox and toggles with checked and unchecked, It also performs
 * the strike out criteria at the name in the task detail area and list detail area.
 * 
 * @param {Object} activeTask, It is the object of the current task.
 * @param {Integer} targetId, It is the of the div at which contains the name of
 *  the task.
 * @param {element} taskCheckBox, It is the object of the checkbox.
 */
function loadTaskCheckBox(activeTask, targetId, taskCheckBox) {
    if(true == activeTask.isFinished) {
        retrieveElementByIdUsingES5(taskCheckBox).checked = true;
        retrieveElementByIdUsingES5("task-status-detail-checkbox").checked = true;
        loadTaskName(activeTask, targetId);
    } else {
        retrieveElementByIdUsingES5(taskCheckBox).checked = false;
        retrieveElementByIdUsingES5("task-status-detail-checkbox").checked = false;
        loadTaskName(activeTask, targetId);
    }
}

/**
 * Refreshes the checkbox and toggles with checked and unchecked, It also
 * performs the strike out criteria at the name in the task detail area.
 * 
 * @param {Object} step, It is the object of the current step.
 * @param {Integer} divId, It is the of the div at which contains the name of
 *  the step.
 * @param {element} CheckBoxId, It is the object of the checkbox.
 */
function loadStepCheckBox(step, divId, CheckBoxId) {
    if(true == step.isFinished) {
        retrieveElementByIdUsingES5(CheckBoxId).checked = true;
        retrieveElementByIdUsingES5(divId).classList.replace("text-decoration-none", "text-decoration-line");
    } else {
        retrieveElementByIdUsingES5(CheckBoxId).checked = false;
        retrieveElementByIdUsingES5(divId).classList.replace("text-decoration-line", "text-decoration-none");
    }
}

/**
 * Performs the striking and non striking operation of the name in the div.
 * 
 * @param {Object} activeTask, It is object of the current task
 * @param {Integer} targetId, it is the id of the div which contains the name of the
 * step for which the strike through has to be performed.
 */
function loadTaskName(activeTask, targetId) {
    if(true == activeTask.isFinished) {
        retrieveElementByIdUsingES5(targetId).classList.replace("text-decoration-none", "text-decoration-line");
        retrieveElementbyIdOrClass(".task-name-detail").classList.replace("text-decoration-none", "text-decoration-line");
    } else {
        retrieveElementByIdUsingES5(targetId).classList.replace("text-decoration-line", "text-decoration-none");
        retrieveElementbyIdOrClass(".task-name-detail").classList.replace("text-decoration-line", "text-decoration-none");
    }
}

/**
 * Validates the given name, checks whether the name is already present.
 * If the name is already present, then it appends a integer within brackets
 * to the name. The integer will be increased as the dupicate increases.
 * 
 * @param {String} rawName, It is name that should be validated.
 * @param {String} criteria, It is the string that denotes whether the
 * validation is for list or task or step.
 */
function validateName(rawName, criteria) {
    var duplicateNames = [];
    if ("list" == criteria) {
        duplicateNames = collectionOfList.filter(list => list.name == rawName);
    } else if ("task" == criteria) {
        var activeList = collectionOfList.find(list => list.id == activeListId);
        duplicateNames = activeList.tasks.filter(task => task.name == rawName);
    } else if ("step" == criteria) {
        var activeTask = retrieveTask(activeTaskId);
        duplicateNames = activeTask.steps.filter(step => step.name == rawName);
    }
    var duplicatesCount = duplicateNames.length;
    if (0 != duplicatesCount) {
        return " ("+duplicatesCount+")";
    } else {
        return "";
    }
}

/**
 * Retrieves the element either by class name or id.
 * 
 * @param {element} element, It is element which has to be get. 
 */
function retrieveElementbyIdOrClass(element) {
    return document.querySelector(element);
}

/**
 * Retrieves the element either by id using ES5 method.
 * 
 * @param {element} element, It is element which has to be get. 
 */
function retrieveElementByIdUsingES5(element) {
    return document.getElementById(element);
}

/**
 * Creates an element for the respective tag.
 * 
 * @param {String} tagName, It is tag which has to be created. 
 */
function createElement(tagName) {
    return document.createElement(tagName);
}

/**
 * Loads the inner html for the div with corressponding text.
 * 
 * @param {*} element, It is element where the inner HTML has to be changed. 
 * @param {String} textContent, It is text which has to loaded in the inner html.
 */
function loadInnerHTML(element, textContent) {
     element.innerHTML = textContent;
}
/**
 * Sets the attribute for the given element with coressponding attribute and name.
 * 
 * @param {element} element, It is the element for which the attribute has to
 * be set.
 * @param {String} attribute, It is the attribute which has to be set for the
 * element.
 * @param {String} attributeName, It is the name of attribute.
 */
function setAttributeForElemenet(element, attribute, attributeName) {
    return element.setAttribute(attribute, attributeName);
}

/**
 * Appends the child element with parent elemenet.
 * 
 * @param {element} parentElement, It is the parent element in which the child
 * has to be appended. 
 * @param {element} childElement, It is the child element which has to be
 * appended with parent element. 
 */
function appendChildWithParent(parentElement, childElement) {
    return parentElement.appendChild(childElement);
}

/**
 * 
 * @param {*} checkbox, It is the var where the checkbox has to be created 
 * @param {*} label 
 * @param {*} div 
 * @param {*} id 
 * @param {*} name 
 */
function createLabelAndCheckbox(checkbox, label, div, id, name) {
    var statusDiv = createElement("div");
    setAttributeForElemenet(statusDiv, "class", "task-status task-status-margin");
    checkbox = createElement("input");
    setAttributeForElemenet(checkbox, "type", "checkbox");
    setAttributeForElemenet(checkbox, "id", id);
    setAttributeForElemenet(checkbox, "name", name);
    appendChildWithParent(statusDiv, checkbox);
    label = createElement("label");
    setAttributeForElemenet(label, "for", id);
    appendChildWithParent(statusDiv, label);
    appendChildWithParent(div, statusDiv);
}