var collectionOfList = [];
var activeList;
var task = {id:"", name: "", stpes:[]}
var step = {id:"", name: "", description: ""};

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

document.querySelector("#newListInput").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
    	var inputText = document.querySelector("#newListInput");
    	addNewList(inputText.value);
    }
});

/*
 * Adds a new list that can contain several tasks and steps for the
 * corresponding task.
 */
function addNewList(name) {
	var taskListCollection = document.querySelector(".task-list-collection");
	var id = name;
	var newList = document.createElement("div");
	newList.setAttribute("class" ,"list-of-task");
	newList.setAttribute("id" ,"" + id + "");
	var listIcon = document.createElement("img");
	listIcon.setAttribute("id" ,"" + id + "");
	listIcon.src = "images/list.png";
	newList.appendChild(listIcon);
	var listNameDiv = document.createElement("div");
	listNameDiv.setAttribute("class" ,"list-name list-name-width");
	listNameDiv.setAttribute("id" ,"" + id + "");
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
    newlist.id = "" + id + "";
    newlist.tasks = [];
    activeList = newlist;
    document.querySelector(".list-of-task-name").innerHTML = "" + newlist.name + "";
    collectionOfList.push(newlist);
    addEventListenerForList(id);
}

function addEventListenerForList(id) {
	document.querySelector("#" + id + "").addEventListener("click", function(event){
		var targetId = event.target.id;
		activeList = collectionOfList.find(function(listToBeChecked) {
    			return listToBeChecked.id === targetId;
    	});
		console.log(activeList);
		var activeTask = activeList.tasks;
		document.querySelector(".list-of-task-name").innerHTML = "" + activeList.name + "";
		document.querySelector(".task-collection").innerHTML ="";
		activeList.tasks.forEach(function(element) {
			addExistingTask(activeTask);
	    });

		document.querySelector("#" + id + "").style.background= "rgba(233, 233, 233, 0.5)";
    });
}

document.querySelector(".task-name-input").addEventListener("focus", function(event){
	document.querySelector(".task-plus-icon").src = "images/circle.png";
	document.querySelector(".task-plus-icon").style.height = "25px";
	document.querySelector(".task-plus-icon").style.width = "25px";
	document.querySelector(".task-plus-icon").style.margin = "2px 5px 0 0";
	});

document.querySelector(".task-name-input").addEventListener("focusout", function(event){
	document.querySelector(".task-plus-icon").src = "images/plus.png";
	document.querySelector(".task-plus-icon").style.height = "30px";
	document.querySelector(".task-plus-icon").style.width = "30px";
	document.querySelector(".task-plus-icon").style.margin = "0 0 0 0";
	});

document.querySelector("#new-task-input-box").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
    	var inputText = document.querySelector("#new-task-input-box");
    	addNewTask(inputText.value);
    }
});

/*
 * Adds a new list that can contain several tasks and steps for the
 * corresponding task.
 */
function addNewTask(name) {
	var taskCollection = document.querySelector(".task-collection");
	var id = name;
	var newTask = document.createElement("div");
	newTask.setAttribute("class" ,"task");
	newTask.setAttribute("id" ,"" + id + "");
	var taskStatus = document.createElement("img");
	taskStatus.setAttribute("id" ,"" + id + "");
	taskStatus.src = "images/circle.png";
	newTask.appendChild(taskStatus);
	var taskNameDiv = document.createElement("div");
	taskNameDiv.setAttribute("class" ,"task-name");
	taskNameDiv.setAttribute("id" ,"" + id + "");
	var taskName = document.createTextNode(name);
	taskNameDiv.appendChild(taskName);
	newTask.appendChild(taskNameDiv);
	taskCollection.appendChild(newTask);
	document.querySelector("#new-task-input-box").value = "";
	createTask(name, id);
}

function createTask(taskName, id) {
    var newtask = new Object();
    newtask.name = "" + taskName + "";
    activeList.tasks.push(newtask);
    document.querySelector(".task-name").innerHTML = "" + newtask.name + "";
}
function addExistingTask(task){
	var taskCollection = document.querySelector(".task-collection");
	var newTask = document.createElement("div");
	newTask.setAttribute("class" ,"task");
	newTask.setAttribute("id" ,"" + task.id + "");
	var taskStatus = document.createElement("img");
	taskStatus.setAttribute("id" ,"" + task.id + "");
	taskStatus.src = "images/circle.png";
	newTask.appendChild(taskStatus);
	var taskNameDiv = document.createElement("div");
	taskNameDiv.setAttribute("class" ,"task-name");
	taskNameDiv.setAttribute("id" ,"" + task.id + "");
	var taskName = document.createTextNode(task.name);
	taskNameDiv.appendChild(taskName);
	newTask.appendChild(taskNameDiv);
	taskCollection.appendChild(newTask);
}