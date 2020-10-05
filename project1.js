//Define UI vars

const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all event listeners

loadEventListeners();

function loadEventListeners() {
  //DOM load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //Add task event
  form.addEventListener("submit", addTask);

  //remove task event
  taskList.addEventListener("click", removeTask);

  //clear task event
  clearBtn.addEventListener("click", clearTasks);

  //filter task event
  filter.addEventListener("keyup", filterTasks);
}

//Get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function (task) {
    //create li element
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    //add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append teh link to li
    li.appendChild(link);
    //append the li to ul
    taskList.appendChild(li);
  });
}
//Add task
function addTask(e) {
  if (taskInput.value === "") {
    alert("add a task");
  }

  //create li element
  const li = document.createElement("li");
  //add class
  li.className = "collection-item";
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement("a");
  //add class
  link.className = "delete-item secondary-content";
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //Append teh link to li
  li.appendChild(link);
  //append the li to ul
  taskList.appendChild(li);

  //store in local storage
  storeTaskInLocalStorage(taskInput.value);
  //clear the input
  taskInput.value = "";
  e.preventDefault();
}

//Store task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you Sure?")) e.target.parentElement.parentElement.remove();

    //Remove from local storage
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);
  }
  e.preventDefault();
}

//Remove from Local storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//clear Tasks
function clearTasks(e) {
  //method 1 of clearing
  taskList.innerHTML = "";

  //clear from local storage
  clearTasksFromLocalStorage();

  e.preventDefault();
}
//clear task from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
