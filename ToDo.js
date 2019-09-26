var collectionOfList = [];
var activeListId;
var activeTaskId;
var activeStepId;
var activeTaskCheckboxId;

document.querySelector(".task-name-input").addEventListener("focus", function(event){
    document.querySelector(".task-plus-icon").src = "images/circle.png";
    document.querySelector(".task-plus-icon").style.height = "22px";
    document.querySelector(".task-plus-icon").style.width = "22px";
    document.querySelector(".task-plus-icon").style.margin = "2px -2px 0 4px";
    });

document.querySelector(".task-name-input").addEventListener("focusout", function(event){
    document.querySelector(".task-plus-icon").src = "images/plus.png";
    document.querySelector(".task-plus-icon").style.height = "30px";
    document.querySelector(".task-plus-icon").style.width = "30px";
    document.querySelector(".task-plus-icon").style.margin = "0 0 0 0";
    });

document.querySelector(".menu-button").addEventListener("click", function(){
    var menuButton = document.querySelector(".menu-button");
    if (menuButton.getAttribute("aria-pressed")==="true") {
        navigateSidePanel("open");
    } else {
        navigateSidePanel("close");
        menuButton.style.background= "none";
    }
});


document.querySelector(".task-detail-panel-close").addEventListener("click", function(){
    hideTaskDetailPanel();
});

document.querySelector(".new-list-button").addEventListener("click", function(){
    navigateSidePanel("open");
});

var isTaskDetailPanelOpen = false;
var isSidePanelOpen = false;
/*
 * Opens the side panel in a sliding manner, whenever menu bar icon or add task
 * is clicked.
 */
function navigateSidePanel(action){
    var navigationDetail = document.querySelectorAll(".navigation-detail");
    var sidePanel = document.querySelector(".side-panel");
    var listDetail = document.querySelector(".list-detail");
    var menuButton = document.querySelector(".menu-button");
    var listNames = document.querySelectorAll(".list-name");
    var menuNames = document.querySelectorAll(".menu-name");
    if (action==="open") {
        isSidePanelOpen = true;
        sidePanel.style.width = "22%";
        if (false == isTaskDetailPanelOpen) {
            listDetail.style.width = "77%";
        } else {
            listDetail.style.width = "50%";
        }
        showSidePanelElement(navigationDetail);
        showSidePanelElement(listNames);
        showSidePanelElement(menuNames);
        menuButton.setAttribute("aria-pressed", "false");
    } else {
        isSidePanelOpen = false;
        sidePanel.style.width = "3.7%";
        if (false == isTaskDetailPanelOpen) {
            listDetail.style.width = "93.3%";
        } else {
            listDetail.style.width = "68.3%";
        }
        hideSidePanelElement(navigationDetail);
        hideSidePanelElement(listNames);
        hideSidePanelElement(menuNames);
        menuButton.setAttribute("aria-pressed", "true");
    }
}

/*
 * Hides the given content from the screen by changing the left margin.
 */
function hideSidePanelElement(element) {
    var loopCount;
    for (loopCount = 0; loopCount < element.length; loopCount++) {
        element[loopCount].style.margin = "0 0 0 -18.5vw";
    }
}

/*
 * Displays the given content to the screen by changing the left margin.
 */
function showSidePanelElement(element) {
    var loopCount;
    for (loopCount = 0; loopCount < element.length; loopCount++) {
        element[loopCount].style.margin = "0 0 0 3.5vw";
    }
}

/*
 * Hides the given content from the screen by changing the left margin.
 */
function hideTaskDetailPanel() {
    isTaskDetailPanelOpen = false;
    if (false == isSidePanelOpen) {
            document.querySelector(".list-detail").style.width = "93.3%";
        } else {
            document.querySelector(".list-detail").style.width = "77%";
        }
    document.querySelector(".task-detail").style.width = "0%";
    document.querySelector(".task-detail").style.padding = "0%";
}

/*
 * Displays the given content to the screen by changing the left margin.
 */
function showTaskDetailPanel() {
    isTaskDetailPanelOpen = true;
    if (false == isSidePanelOpen) {
            document.querySelector(".list-detail").style.width = "68.3%";
        } else {
            document.querySelector(".list-detail").style.width = "50%";
        }
    document.querySelector(".task-detail").style.width = "25%";
    document.querySelector(".task-detail").style.padding = "1%";
}

document.querySelector("#newListInput").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        var inputText = document.querySelector("#newListInput");
        if ("" != inputText.value) {
            hideTaskDetailPanel();
            addNewList(inputText.value);
        }
    }
});

/*
 * Adds a new list that can contain several tasks and steps for the
 * corresponding task.
 */
function displayExistingList(list) {
    var taskListCollection = document.querySelector(".task-list-collection");
    var newList = createDivWithClassAndId(newList, "list-of-task", list.id);
    var listIcon = document.createElement("img");
    listIcon.setAttribute("id" , list.id);
    listIcon.src = "images/list.png";
    newList.appendChild(listIcon);
    var listNameDiv = createDivWithClassAndId(listNameDiv, "list-name list-name-width", list.id);
    var listName = document.createTextNode(list.name + list.nameSuffix);
    listNameDiv.appendChild(listName);
    newList.appendChild(listNameDiv);
    var tasks = list.tasks.filter(task => true == task.status) 
    var taskCount = tasks.length;
    if (0 < taskCount) {
        var taskCountSpan = document.createElement("span");
        taskCountSpan.setAttribute("class" , "task-count");
        var taskCountText = document.createTextNode("" + taskCount);
        taskCountSpan.appendChild(taskCountText);
        newList.appendChild(taskCountSpan);
    }
    taskListCollection.appendChild(newList);
    addEventListenerForList(list.id);
}

function addNewList(name) {
    var list = createList(name);
    var taskListCollection = document.querySelector(".task-list-collection");
    var newList = createDivWithClassAndId(newList, "list-of-task", list.id);
    var listIcon = document.createElement("img");
    listIcon.setAttribute("id" , list.id);
    listIcon.src = "images/list.png";
    newList.appendChild(listIcon);
    var listNameDiv = createDivWithClassAndId(listNameDiv, "list-name list-name-width", list.id);
    var listName = document.createTextNode(list.name + list.nameSuffix);
    listNameDiv.appendChild(listName);
    newList.appendChild(listNameDiv);
    taskListCollection.appendChild(newList);
    document.querySelector("#newListInput").value = "";
    document.querySelector(".list-of-task-name").innerHTML = "" + name + list.nameSuffix + "";
    document.querySelector(".task-collection").innerHTML = "";
    addEventListenerForList(list.id);
}

function createList(listName) {
    var nameSuffix = validateName(listName, "list");
    var newlist = new Object();
    var id = Date.now();
    newlist.name = "" + listName + "";
    newlist.nameSuffix = nameSuffix;
    newlist.id = id;
    newlist.tasks = [];
    activeListId = newlist.id;
    collectionOfList.push(newlist);
    return newlist;
}

function addEventListenerForList(id) {
    document.getElementById(id).addEventListener("click", function(event){
        var targetId = event.target.id;
        var activeList = collectionOfList.find(function(listToBeChecked) {
                return listToBeChecked.id == targetId;
        });
        hideTaskDetailPanel();
        document.querySelector(".list-of-task-name").innerHTML = "" + activeList.name + activeList.nameSuffix + "";
        document.querySelector(".task-collection").innerHTML ="";
        activeListId = activeList.id;
        activeList.tasks.forEach(function(task) {
            if (true == task.status) {
                displayExistingTask(task);
            }
        });
    });
}

/**
 * 
 * @param {*} task 
 */
function displayExistingTask(task){
    var taskCollection = document.querySelector(".task-collection");
    var newTask = createDivWithClassAndId(newTask, "task", task.id);
    var checkBoxId = task.id + task.name;
    var taskStatusLabel;
    var taskStatusCheckbox;
    createLabelAndCheckbox(taskStatusCheckbox, taskStatusLabel, newTask, checkBoxId, task.id);
    var taskNameDiv = createDivWithClassAndId(newTask, "task-name", task.id);
    var taskName = document.createTextNode(task.name + task.nameSuffix);
    taskNameDiv.appendChild(taskName);
    newTask.appendChild(taskNameDiv);
    var completedSteps = task.steps.filter(step => true == step.isFinished);
    var completedStepCount = completedSteps.length;
    console.log(completedStepCount);
    if (0 < completedStepCount) {
        var stepCountSpan = document.createElement("span");
        stepCountSpan.setAttribute("class" , "step-count");
        var stepCountText = document.createTextNode(completedStepCount +"of" + task.steps.length);
        stepCountSpan.appendChild(stepCountText);
        newTask.appendChild(stepCountSpan);
    }
    taskCollection.appendChild(newTask);
    addEventListenerForTask(task.id);
    addEventListenerForTaskStatusCheckbox(checkBoxId);
    loadTaskCheckBox(task, task.id, checkBoxId);
}

document.querySelector("#new-task-input-box").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        var inputText = document.querySelector("#new-task-input-box");
        if ("" != inputText.value) {
            addNewTask(inputText.value);
        }
    }
});

function reloadLists() {    
    document.querySelector(".task-list-collection").innerHTML ="";
    collectionOfList.forEach(function(list) {
        displayExistingList(list);
    });
}

function reloadTasks() {    
    document.querySelector(".task-collection").innerHTML ="";
    var activeList = collectionOfList.find(list => list.id == activeListId);
    activeList.tasks.forEach(function(activeTask) {
        displayExistingTask(activeTask);
    });
}

/*
 * Adds a new list that can contain several tasks and steps for the
 * corresponding task.
 */
function addNewTask(name) {
    var task = createTask(name);
    var taskCollection = document.querySelector(".task-collection");
    var newTask = createDivWithClassAndId(newTask, "task", "");
    var taskStatusLabel;
    var taskStatusCheckbox;
    var checkBoxId = task.id + task.name;
    createLabelAndCheckbox(taskStatusCheckbox, taskStatusLabel, newTask, checkBoxId, task.id);
    var taskNameDiv = createDivWithClassAndId(taskNameDiv, "task-name", task.id);
    var taskName = document.createTextNode(task.name + task.nameSuffix);
    taskNameDiv.appendChild(taskName);
    newTask.appendChild(taskNameDiv);
    taskCollection.appendChild(newTask);
    document.querySelector("#new-task-input-box").value = "";
    activeTaskCheckboxId = checkBoxId
    addEventListenerForTask(task.id);
    addEventListenerForTaskStatusCheckbox(checkBoxId);
    document.querySelector(".steps").innerHTML ="";
    document.querySelector(".task-name-detail").innerHTML = "" + task.name + task.nameSuffix + "";
    reloadLists();
}

function createTask(taskName) {
    var nameSuffix = validateName(taskName, "task");
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

function addEventListenerForTask(id) {
    document.getElementById(id).addEventListener("click", function(event){
        var targetId = event.target.id;
        console.log(targetId);
        var activeTask = retrieveTask(targetId);
        activeTaskId = activeTask.id;
        activeTaskCheckboxId = activeTask.id + activeTask.name;
        loadTaskCheckBox(activeTask, targetId, activeTaskCheckboxId);
        showTaskDetailPanel();
        document.querySelector(".task-name-detail").innerHTML = "" + activeTask.name + activeTask.nameSuffix + "";
        loadTaskName(activeTask, targetId);
        document.querySelector(".steps").innerHTML ="";
        activeTask.steps.forEach(function(step) {
            if (true == step.status) {
                displayExistingStep(step);
            }
        });
    });
}

function addEventListenerForTaskStatusCheckbox(checkBoxId) {
    document.getElementById(checkBoxId).addEventListener("click", function(event){
        var targetId = event.target.name;
        var activeTask = retrieveTask(targetId);
        showTaskDetailPanel();
        document.querySelector(".task-name-detail").innerHTML = "" + activeTask.name + activeTask.nameSuffix + "";
        loadTaskName(activeTask, targetId);
        document.querySelector(".steps").innerHTML ="";
        activeTask.steps.forEach(function(step) {
            if (true == step.status) {
                displayExistingStep(step);
            }
        });
        var checkBox = document.getElementById(checkBoxId);
        if(true == checkBox.checked) {
            activeTask.isFinished = true;
            document.getElementById("task-status-detail-checkbox").checked = true;
            loadTaskName(activeTask, targetId);
        } else {
            activeTask.isFinished = false;
            document.getElementById("task-status-detail-checkbox").checked = false;
            loadTaskName(activeTask, targetId);
        }
        document.querySelector(".steps").innerHTML ="";
        activeTaskId = activeTask.id;
        activeTaskCheckboxId = checkBoxId;
        activeTask.steps.forEach(function(step) {
            if (true == step.status) {
                displayExistingStep(step);
            }
        });
    });
}

document.querySelector(".task-detail-delete").addEventListener("click", function(event){
    var activeTask = retrieveTask(activeTaskId);
    var criteriaNameSpan =  document.querySelector(".criteria-name");
    criteriaNameSpan.innerHTML = "" + activeTask.name + "";
    document.querySelector(".delete-button").innerHTML = "Delete task";
    document.querySelector(".modal").style.display = "block";
    document.querySelector(".delete-button").onclick = function () {
        console.log("Delete method reached");
        activeTask.status = false;
        closeDeletePopup();
        hideTaskDetailPanel();
        document.querySelector(".task-collection").innerHTML = "";
        var activeList = collectionOfList.find(list => list.id == activeListId);
        activeList.tasks.forEach(function(task) {
            if (true == task.status) {
                displayExistingTask(task);
            }
        });
        reloadLists();
    };
});


document.getElementById("task-status-detail-checkbox").addEventListener("click", function(event){

    var activeTask = retrieveTask(activeTaskId);
    var checkBox = document.getElementById("task-status-detail-checkbox");
    var taskCheckBox = document.getElementById(activeTaskCheckboxId);
    if(true == checkBox.checked) {
        activeTask.isFinished = true;
        taskCheckBox.checked = true;
        loadTaskName(activeTask, activeTask.id);
    } else {
        activeTask.isFinished = false;
        taskCheckBox.checked = false;
        loadTaskName(activeTask, activeTask.id);
    }
});

function displayExistingStep(step) {
    var steps = document.querySelector(".steps");
    var newStep = createDivWithClassAndId(newStep, "step", step.id);
    var checkBoxId = step.id + step.name;
    var stepkStatusLabel;
    var stepStatusCheckbox;
    createLabelAndCheckbox(stepStatusCheckbox, stepkStatusLabel, newStep, checkBoxId, step.id);
    var stepNameDiv = createDivWithClassAndId(stepNameDiv, "step-name", step.id);
    var stepName = document.createTextNode(step.name + step.nameSuffix);
    stepNameDiv.appendChild(stepName);
    newStep.appendChild(stepNameDiv);
    var stepDeleteDiv = createDivWithClassAndId(stepDeleteDiv, "step-delete", step.id);
    newStep.appendChild(stepDeleteDiv);
    steps.appendChild(newStep);
    loadStepCheckBox(step, step.id, checkBoxId);
    addEventListenerForStepStatusCheckbox(checkBoxId);
    addEventListenerForDeleteStep(step.id);
}

document.querySelector("#new-step-input-box").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        let inputText = document.querySelector("#new-step-input-box");
        if("" != inputText.value) {
            addNewStep(inputText.value);
        }
    }
});

/*
 * Adds a new list that can contain several tasks and steps for the
 * corresponding task.
 */
function addNewStep(name) {
    var step = createStep(name);
    var steps = document.querySelector(".steps");
    var newStep = createDivWithClassAndId(newStep, "step", step.id);
    var checkBoxId = step.id + step.name;
    var stepStatusLabel;
    var stepStatusCheckbox;
    createLabelAndCheckbox(stepStatusCheckbox, stepStatusLabel, newStep, checkBoxId, step.id);
    var stepNameDiv = createDivWithClassAndId(stepNameDiv, "step-name", step.id)
    var stepName = document.createTextNode(step.name + step.nameSuffix);
    stepNameDiv.appendChild(stepName);
    newStep.appendChild(stepNameDiv);
    var stepDeleteDiv = createDivWithClassAndId(stepDeleteDiv, "step-delete", step.id);
    newStep.appendChild(stepDeleteDiv);
    steps.appendChild(newStep);
    document.querySelector("#new-step-input-box").value = "";
    addEventListenerForStepStatusCheckbox(checkBoxId)
    addEventListenerForDeleteStep(step.id);
    reloadTasks();
}

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
    document.getElementById(checkBoxId).addEventListener("click", function(event){
        var targetId = event.target.name;
        var activeTask = retrieveTask(activeTaskId);
        var activeStep = activeTask.steps.find(step => step.id == targetId);
        var checkBox = document.getElementById(checkBoxId);
        if(true == checkBox.checked) {
            activeStep.isFinished = true;
            document.getElementById(targetId).style.textDecoration = "line-through";
        } else {
            activeStep.isFinished = false;
            document.getElementById(targetId).style.textDecoration = "none";
        }
        reloadTasks();
    });
}

function addEventListenerForDeleteStep(id) {
    document.getElementById(id).addEventListener("click", function(event){
        activeStepId = event.target.id;
        var activeTask = retrieveTask(activeTaskId);
        var activeStep = activeTask.steps.find(step => step.id == activeStepId);
        var criteriaNameSpan =  document.querySelector(".criteria-name");
        criteriaNameSpan.innerHTML = "" + activeStep.name + "";
        document.querySelector(".delete-button").innerHTML = "Delete step";
        document.querySelector(".modal").style.display = "block";
        document.querySelector(".delete-button").onclick = function () {
            var activeTask = retrieveTask(activeTaskId);
            var activeStep = activeTask.steps.find(step => step.id == activeStepId);
            activeStep.status = false;
            closeDeletePopup();
            document.querySelector(".steps").innerHTML = "";
            activeTask.steps.forEach(function(step) {
                if (true == step.status) {
                    displayExistingStep(step);
                }
            });
        };
    });
}

function closeDeletePopup() {
    document.querySelector(".modal").style.display = "none";
}

window.onclick = function(event) {
    var modal = document.querySelector(".modal");
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function createDivWithClassAndId(div, classname, id) {
    div = document.createElement("div");
    div.setAttribute("class" ,classname);
    div.setAttribute("id" , id);
    return div;
}

function retrieveTask(taskId) {
    var activeList = collectionOfList.find(list => list.id == activeListId);
    var activeTask = activeList.tasks.find(task => task.id == taskId);
    return activeTask;
}

function loadTaskCheckBox(activeTask, targetId, taskCheckBox) {
    if(true == activeTask.isFinished) {
        document.getElementById(taskCheckBox).checked = true;
        document.getElementById("task-status-detail-checkbox").checked = true;
        loadTaskName(activeTask, targetId);
    } else {
        document.getElementById(taskCheckBox).checked = false;
        document.getElementById("task-status-detail-checkbox").checked = false;
        loadTaskName(activeTask, targetId);
    }
}
function loadStepCheckBox(step, divId, CheckBoxId) {
    if(true == step.isFinished) {
        document.getElementById(CheckBoxId).checked = true;
        document.getElementById(divId).style.textDecoration = "line-through";
    } else {
        document.getElementById(CheckBoxId).checked = false;
        document.getElementById(divId).style.textDecoration = "none";
    }
}
function loadTaskName(activeTask, targetId) {
    if(true == activeTask.isFinished) {
        document.getElementById(targetId).style.textDecoration = "line-through";
        document.querySelector(".task-name-detail").style.textDecoration = "line-through";
    } else {
        document.getElementById(targetId).style.textDecoration = "none";
        document.querySelector(".task-name-detail").style.textDecoration = "none";
    }
}
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
function createLabelAndCheckbox(checkbox, label, div, id, name) {
    var statusDiv = document.createElement("div");
    statusDiv.setAttribute("class", "task-status task-status-margin");
    checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", id);
    checkbox.setAttribute("name", name);
    statusDiv.appendChild(checkbox);
    label = document.createElement("label");
    label.setAttribute("for", id);
    statusDiv.appendChild(label);
    div.appendChild(statusDiv);
}
retreiveElementById() {
    
}
