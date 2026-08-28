// =========================
// DOM ELEMENTS
// =========================

const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addBtn");
const taskList = document.querySelector("#taskList");
const stats = document.querySelector("#stats");

const clearAll = document.querySelector("#clearAll");
const clearCompleted = document.querySelector("#clearCompleted");

const search = document.querySelector("#search");
const deadline = document.querySelector("#deadline");
const priority = document.querySelector("#priority");

const sort = document.querySelector("#sort");
const filter = document.querySelector("#filter");

// Edit modal
const editModal = document.querySelector("#editModal");
const editTaskInput = document.querySelector("#editTaskInput");
const editPriority = document.querySelector("#editPriority");
const editDeadline = document.querySelector("#editDeadline");

const cancelEdit = document.querySelector("#cancelEdit");
const saveEdit = document.querySelector("#saveEdit");


// =========================
// DATA
// =========================
const STORAGE_KEY = "vanillaTodoTasks";

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

let editingTask = null;

let debounceTimer;


// =========================
// CONSTANTS
// =========================

const priorityOrder = {
    High: 3,
    Medium: 2,
    Low: 1
};

const priorityMap = {
    High: "🔴 High",
    Medium: "🟡 Medium",
    Low: "🟢 Low"
};


// =========================
// LOCAL STORAGE
// =========================

function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}


// =========================
// ADD TASK
// =========================

function addTask() {
    const value = taskInput.value.trim();

    if (!value) return;

    const newTask = {
        text: value,
        completed: false,
        priority: priority.value,
        deadline: deadline.value
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    // Reset inputs
    taskInput.value = "";
    deadline.value = "";
    priority.value = "Low";

    taskInput.focus();
}


// =========================
// RENDER TASKS
// =========================

function renderTasks() {
    taskList.innerHTML = "";

    const keyword = search.value.toLowerCase();

    // Search
    let filtered = tasks.filter((task) =>
        task.text.toLowerCase().includes(keyword)
    );


    // =========================
    // FILTER
    // =========================

    if (filter.value === "active") {
        filtered = filtered.filter((task) => !task.completed);
    }

    if (filter.value === "completed") {
        filtered = filtered.filter((task) => task.completed);
    }


    // =========================
    // SORT
    // =========================

    if (sort.value === "low") {
        filtered.sort(
            (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
        );
    }

    if (sort.value === "high") {
        filtered.sort(
            (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
        );
    }

    if (sort.value === "date") {
        filtered.sort((a, b) => {

            if (!a.deadline) return 1;

            if (!b.deadline) return -1;

            return new Date(a.deadline) - new Date(b.deadline);
        });
    }


    // =========================
    // CREATE TASK ELEMENTS
    // =========================

    filtered.forEach((task) => {

        const realIndex = tasks.indexOf(task);

        const li = document.createElement("li");


        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;


        // Task text
        const span = document.createElement("span");

        span.classList.add("task-text");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }


        // Priority
        const priorityBadge = document.createElement("span");

        priorityBadge.textContent = priorityMap[task.priority];

        priorityBadge.classList.add(
            "priority-badge",
            task.priority.toLowerCase()
        );


        // Deadline
        const date = document.createElement("small");

        if (task.deadline) {

            const today = new Date();

            today.setHours(0, 0, 0, 0);

            const taskDate = new Date(task.deadline);

            taskDate.setHours(0, 0, 0, 0);


            if (taskDate.getTime() === today.getTime()) {

                date.textContent =
                    "📅 " + task.deadline + " 🔥 Due today";

            } else if (taskDate < today) {

                date.textContent =
                    "📅 " + task.deadline + " ⚠️ Overdue";

            } else {

                date.textContent =
                    "📅 " + task.deadline;
            }

        } else {

            date.textContent = "📅 No deadline";
        }


        // =========================
        // DELETE BUTTON
        // =========================

        const deleteBtn = document.createElement("button");

        deleteBtn.classList.add("delete");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            if (!confirm("Delete this task?")) return;

            tasks.splice(realIndex, 1);

            saveTasks();
            renderTasks();
        });


        // =========================
        // EDIT BUTTON
        // =========================

        const editBtn = document.createElement("button");

        editBtn.classList.add("edit");
        editBtn.textContent = "✏️ Edit";

        editBtn.addEventListener("click", (e) => {

            e.stopPropagation();

            editingTask = task;

            editTaskInput.value = task.text;
            editPriority.value = task.priority;
            editDeadline.value = task.deadline;

            editModal.style.display = "flex";
        });


        // =========================
        // COMPLETE TASK
        // =========================

        checkbox.addEventListener("change", () => {

            task.completed = checkbox.checked;

            saveTasks();
            renderTasks();
        });


        // =========================
        // APPEND ELEMENTS
        // =========================

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(priorityBadge);
        li.appendChild(date);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });


    updateStats();
}


// =========================
// UPDATE STATISTICS
// =========================

function updateStats() {

    if (tasks.length === 0) {

        stats.innerText = "No tasks yet.";

        return;
    }

    const completed = tasks.filter(
        (task) => task.completed
    ).length;

    const remaining = tasks.length - completed;

    stats.innerHTML = `
        📋 Total: ${tasks.length}
        |
        ✅ Completed: ${completed}
        |
        ⌛ Remaining: ${remaining}
    `;
}


// =========================
// EDIT MODAL
// =========================

saveEdit.addEventListener("click", () => {

    if (!editingTask) return;

    const newText = editTaskInput.value.trim();

    if (!newText) return;

    editingTask.text = newText;
    editingTask.priority = editPriority.value;
    editingTask.deadline = editDeadline.value;

    saveTasks();
    renderTasks();

    closeEditModal();
});


cancelEdit.addEventListener("click", () => {

    closeEditModal();
});


editModal.addEventListener("click", (e) => {

    if (e.target === editModal) {

        closeEditModal();
    }
});


function closeEditModal() {

    editModal.style.display = "none";

    editingTask = null;
}


// =========================
// CLEAR ALL
// =========================

clearAll.addEventListener("click", () => {

    if (!confirm("Delete all tasks?")) return;

    tasks = [];

    saveTasks();
    renderTasks();
});


// =========================
// CLEAR COMPLETED
// =========================

clearCompleted.addEventListener("click", () => {

    tasks = tasks.filter(
        (task) => !task.completed
    );

    saveTasks();
    renderTasks();
});


// =========================
// ADD TASK EVENTS
// =========================

addBtn.addEventListener("click", addTask);


taskInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        addTask();
    }
});


// =========================
// SEARCH - DEBOUNCE
// =========================

function refresh() {

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {

        renderTasks();

    }, 300);
}

search.addEventListener("input", refresh);


// =========================
// SORT & FILTER
// =========================

sort.addEventListener("change", renderTasks);

filter.addEventListener("change", renderTasks);


// =========================
// INITIAL RENDER
// =========================

renderTasks();