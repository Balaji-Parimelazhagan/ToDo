document.querySelector(".menu-button").addEventListener("click", function(){
	var menuButton = document.querySelector(".menu-button");
	if (menuButton.getAttribute("aria-pressed")==="true") {
		navigateSidePanel("open");
		menuButton.style.background= "#FAFAFA";
	} else {
		navigateSidePanel("close");
		menuButton.style.background= "none";
	}
});

document.querySelector(".new-list-button").addEventListener("click", function(){
	navigateSidePanel("open");
});

document.querySelector("#newListInput").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
    	var inputText = document.querySelector("#newListInput");
    	addNewList(inputText.value);
    }
});

function addNewList(listName) {
	var taskListCollection = document.querySelector(".task-list-collection");
	var newList = document.createElement("div");
	newList.setAttribute("class" ,"list-of-task");
	var listIconDiv = document.createElement("p");
	listIconDiv.setAttribute("class" ,"fa fa-list");
	newList.appendChild(listIconDiv);
	var listNameDiv = document.createElement("div");
	listNameDiv.setAttribute("class" ,"list-name");
	listNameDiv.setAttribute("id" ,"list-name-display");
	var listName = document.createTextNode(listName);
	listNameDiv.appendChild(listName);
	newList.appendChild(listNameDiv);
	taskListCollection.appendChild(newList);
	document.querySelector("#newListInput").value = "";
}

function navigateSidePanel(action){
	var navigationDetail = document.querySelectorAll(".navigation-detail");
	var sidePanel = document.querySelector(".side-panel");
	var menuButton = document.querySelector(".menu-button");
	var listNames = document.querySelectorAll(".list-name");
	var menuNames = document.querySelectorAll(".menu-name");
	if (action==="open") {
		sidePanel.style.width = "22%";
		showDiv(navigationDetail);
		showDiv(listNames);
		showDiv(menuNames);
		menuButton.setAttribute("aria-pressed", "false");
	} else {
		sidePanel.style.width = "3.843vw";
		hideDiv(navigationDetail);
		hideDiv(listNames);
		hideDiv(menuNames);
		menuButton.setAttribute("aria-pressed", "true");
	}
}

function hideDiv(element) {
	var loopCount;
	for (loopCount = 0; loopCount < element.length; loopCount++) {
		element[loopCount].style.display = "none";
    }
}


function showDiv(element) {
	var loopCount;
	for (loopCount = 0; loopCount < element.length; loopCount++) {
		element[loopCount].style.display = "inline-block";
    }
}