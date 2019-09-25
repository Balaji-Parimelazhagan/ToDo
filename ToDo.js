var collectionOfList = [];
var activeListId;
var activeTaskId;
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

document.querySelector(".new-list-button").addEventListener("click", function(){
	navigateSidePanel("open");
});

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
		sidePanel.style.width = "22%";
		listDetail.style.width = "50%";
		showSidePanelElement(navigationDetail);
		showSidePanelElement(listNames);
		showSidePanelElement(menuNames);
		menuButton.setAttribute("aria-pressed", "false");
	} else {
		sidePanel.style.width = "3.7%";
		listDetail.style.width = "68.3%";
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
	document.querySelector(".task-detail").style.width = "0%";
	document.querySelector(".task-detail").style.padding = "0%";
}

/*
 * Displays the given content to the screen by changing the left margin.
 */
function showTaskDetailPanel() {
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
function addNewList(name) {
	var taskListCollection = document.querySelector(".task-list-collection");
	var id = Date.now();
	var newList = createDivWithClassAndId(newList, "list-of-task", id);
	var listIcon = document.createElement("img");
	listIcon.setAttribute("id" , id);
	listIcon.src = "images/list.png";
	newList.appendChild(listIcon);
	var listNameDiv = createDivWithClassAndId(listNameDiv, "list-name list-name-width", id);
	var listName = document.createTextNode(name);
	listNameDiv.appendChild(listName);
	newList.appendChild(listNameDiv);
	taskListCollection.appendChild(newList);
	document.querySelector("#newListInput").value = "";
    createList(name, id);
}

function createList(listName, id) {
    var newlist = new Object();
    newlist.name = "" + listName + "";
    newlist.id = id;
    newlist.tasks = [];
    activeListId = newlist.id;
	document.querySelector(".list-of-task-name").innerHTML = "" + newlist.name + "";
	document.querySelector(".task-collection").innerHTML = "";
    collectionOfList.push(newlist);
    addEventListenerForList(id);
}

function addEventListenerForList(id) {
	document.getElementById(id).addEventListener("click", function(event){
		var targetId = event.target.id;
		var activeList = collectionOfList.find(function(listToBeChecked) {
    			return listToBeChecked.id == targetId;
		});
		hideTaskDetailPanel();
		document.querySelector(".list-of-task-name").innerHTML = "" + activeList.name + "";
		document.querySelector(".task-collection").innerHTML ="";
		activeListId = activeList.id;
		activeList.tasks.forEach(function(task) {
			displayExistingTask(task);
	    });
		document.getElementById(id).style.background= "rgba(233, 233, 233, 0.5)";
    });
}

function displayExistingTask(task){
	var taskCollection = document.querySelector(".task-collection");
	var newTask = createDivWithClassAndId(newTask, "task", task.id);
	var checkBoxId = task.id + task.name;
	var taskStatusLabel;
	var taskStatusCheckbox;
	createLabelAndCheckbox(taskStatusCheckbox, taskStatusLabel, newTask, checkBoxId, task.id);
	var taskNameDiv = createDivWithClassAndId(newTask, "task-name", task.id);
	var taskName = document.createTextNode(task.name);
	taskNameDiv.appendChild(taskName);
	newTask.appendChild(taskNameDiv);
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

/*
 * Adds a new list that can contain several tasks and steps for the
 * corresponding task.
 */
function addNewTask(name) {
	var taskCollection = document.querySelector(".task-collection");
	var id = Date.now();
	var newTask = createDivWithClassAndId(newTask, "task", "");
	var taskStatusLabel;
	var taskStatusCheckbox;
	var checkBoxId = id + name;
	createLabelAndCheckbox(taskStatusCheckbox, taskStatusLabel, newTask, checkBoxId, id);
	var taskNameDiv = createDivWithClassAndId(taskNameDiv, "task-name", id);
	var taskName = document.createTextNode(name);
	taskNameDiv.appendChild(taskName);
	newTask.appendChild(taskNameDiv);
	taskCollection.appendChild(newTask);
	document.querySelector("#new-task-input-box").value = "";
	createTask(name, id, checkBoxId);
}

function createTask(taskName, id, checkBoxId) {
    var newtask = new Object();
	newtask.name = "" + taskName + "";
	newtask.id =  id;
	newtask.isFinished =  false;
	newtask.steps = [];
	var activeList = collectionOfList.find(function(list) {
		return list.id == activeListId;
    });
    activeList.tasks.push(newtask);
	activeTaskId = newtask.id;
	activeTaskCheckboxId = checkBoxId;
	var activeTask = retrieveTask(newtask.id);
	addEventListenerForTask(newtask.id);
	addEventListenerForTaskStatusCheckbox(checkBoxId);
	document.querySelector(".task-name-detail").innerHTML = "" + activeTask.name + "";
}

function addEventListenerForTask(id) {
	document.getElementById(id).addEventListener("click", function(event){
		var targetId = event.target.id;
		var activeTask = retrieveTask(targetId);
		activeTaskId = activeTask.id;
		activeTaskCheckboxId = activeTask.id + activeTask.name;
		loadTaskCheckBox(activeTask, targetId, activeTaskCheckboxId);
		showTaskDetailPanel();
		document.querySelector(".task-name-detail").innerHTML = "" + activeTask.name + "";
		loadTaskName(activeTask, targetId);
		document.querySelector(".steps").innerHTML ="";
		activeTask.steps.forEach(function(step) {
			displayExistingStep(step);
	    });
		document.getElementById(id).style.background= "rgba(233, 233, 233, 0.5)";
    });
}

function addEventListenerForTaskStatusCheckbox(checkBoxId) {
	document.getElementById(checkBoxId).addEventListener("click", function(event){
		var targetId = event.target.name;
		var activeTask = retrieveTask(targetId);
		showTaskDetailPanel();
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
			displayExistingStep(step);
	    });
		document.getElementById(id).style.background= "rgba(233, 233, 233, 0.5)";
    });
}

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
	var stepName = document.createTextNode(step.name);
	stepNameDiv.appendChild(stepName);
	newStep.appendChild(stepNameDiv);
	steps.appendChild(newStep);
	loadStepCheckBox(step, step.id, checkBoxId);
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
	var steps = document.querySelector(".steps");
	var id = Date.now();
	var newStep = createDivWithClassAndId(newStep, "step", id);
	var checkBoxId = id + name;
	var stepStatusLabel;
	var stepStatusCheckbox;
	createLabelAndCheckbox(stepStatusCheckbox, stepStatusLabel, newStep, checkBoxId, id);
	var stepNameDiv = createDivWithClassAndId(stepNameDiv, "step-name", id)
	var stepName = document.createTextNode(name);
	stepNameDiv.appendChild(stepName);
	newStep.appendChild(stepNameDiv);
	steps.appendChild(newStep);
	document.querySelector("#new-step-input-box").value = "";
	createStep(name, id);
	addEventListenerForStepStatusCheckbox(checkBoxId)
}

function createStep(stepName, id) {
    var step = new Object();
	step.id = id;
	step.name = "" + stepName + "";
	step.isFinished = false;
	var activeTask = retrieveTask(activeTaskId);
    activeTask.steps.push(step);
}

function addEventListenerForStepStatusCheckbox(checkBoxId) {
	document.getElementById(checkBoxId).addEventListener("click", function(event){
		var targetId = event.target.name;
		var activeTask = retrieveTask(activeTaskId);
		var activeStep = activeTask.steps.find(step => step.id == targetId);
		console.log("ative task " + activeTaskId);
		console.log("ative finished " + activeStep.isFinished);
		var checkBox = document.getElementById(checkBoxId);
		if(true == checkBox.checked) {
			activeStep.isFinished = true;
			document.getElementById(targetId).style.textDecoration = "line-through";
		} else {
			activeStep.isFinished = false;
			document.getElementById(targetId).style.textDecoration = "none";
		}
		document.getElementById(id).style.background= "rgba(233, 233, 233, 0.5)";
    });
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