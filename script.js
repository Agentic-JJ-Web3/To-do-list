
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

let tasks = loadTasks();

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task, idx) => {
    const listItem = document.createElement("li");
    listItem.textContent = task.text;
    if (task.done) listItem.classList.add("done");

    // Toggle done when clicked
    listItem.addEventListener("click", function () {
      tasks[idx].done = !tasks[idx].done;
      saveTasks(tasks);
      renderTasks();
    });

    // Add delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function (event) {
      event.stopPropagation(); // So it doesn't mark as done
      tasks.splice(idx, 1);
      saveTasks(tasks);
      renderTasks();
    });

    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);
  });
}

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }
  if (tasks.some(task => task.text === taskText)) {
    alert("Task already exists!");
    return;
  }
  tasks.push({ text: taskText, done: false });
  saveTasks(tasks);
  renderTasks();
  input.value = "";
}

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

// Initial render
renderTasks();
