const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);
    });
}


function addTask() {
    const value = taskInput.value.trim();
    if (!value) return;
    tasks.push(taskInput.value);
    saveTasks();
    renderTasks();
    taskInput.value = "";
    taskInput.focus();
}

addBtn.addEventListener("click", addTask);

renderTasks();




























