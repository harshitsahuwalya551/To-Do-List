const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");
const totalTasksElement = document.getElementById("total-tasks");
const completedTasksElement = document.getElementById("completed-tasks");

function addTask() {
    if (inputbox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputbox.value = "";
    updateTaskCount();
    saveData();
}

listcontainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        prioritizeTask(e.target);
        updateTaskCount();
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        updateTaskCount();
        saveData();
    }
}, false);

function prioritizeTask(taskElement) {
    if (taskElement.classList.contains("checked")) {
        listcontainer.prepend(taskElement); // Move checked task to the top
    } else {
        listcontainer.appendChild(taskElement); // Move unchecked task to the bottom
    }
}

function saveData() {
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showTask() {
    listcontainer.innerHTML = localStorage.getItem("data");
    updateTaskCount();
}

function updateTaskCount() {
    const totalTasks = document.querySelectorAll("li").length;
    const completedTasks = document.querySelectorAll(".checked").length;

    totalTasksElement.innerText = totalTasks;
    completedTasksElement.innerText = completedTasks;
}

showTask();

function clearTasks() {
    listcontainer.innerHTML = '';
    localStorage.removeItem("data");
    updateTaskCount();
}