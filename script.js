
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Save and display tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    taskList.innerHTML = "";
    
    if (tasks.length === 0) {
    taskList.innerHTML = `
        <div class="empty-message">
            <h3>📋 No tasks yet!</h3>
            <p>Add your first task and get started.</p>
        </div>
    `;
}
    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        const span = document.createElement("span");
        span.textContent = task.text;
        span.style.cursor = "pointer";

        // Mark task as completed
        span.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        });

        // Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
        });
        
// Edit button
const editBtn = document.createElement("button");
editBtn.textContent = "Edit";
editBtn.classList.add("edit-btn");

editBtn.addEventListener("click", () => {
    const newText = prompt("Edit your task:", task.text);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks();
    }
});

        li.appendChild(span);
li.appendChild(editBtn);
li.appendChild(deleteBtn);
taskList.appendChild(li);
    });
    
// Update task statistics
document.getElementById("totalTasks").textContent = tasks.length;

document.getElementById("pendingTasks").textContent =
    tasks.filter(task => !task.completed).length;

document.getElementById("completedTasks").textContent =
    tasks.filter(task => task.completed).length;

}

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
}

// Save tasks in LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

addBtn.addEventListener("click", addTask);

// Add task using Enter key
taskInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

displayTasks();

const clearAllBtn = document.getElementById("clearAllBtn");

clearAllBtn.addEventListener("click", () => {

    if (tasks.length === 0) {
        alert("No tasks to clear!");
        return;
    }

    const confirmDelete = confirm("Are you sure you want to delete all tasks?");

    if (confirmDelete) {
        tasks = [];
        saveTasks();
    }
});
// Display current date
const dateElement = document.getElementById("currentDate");

const today = new Date();

dateElement.textContent = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});