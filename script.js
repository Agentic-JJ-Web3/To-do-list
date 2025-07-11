function addTask() {
  const input = document.getElementById("task-input");
  const taskText = input.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  const list = document.getElementById("task-list");

  const listItem = document.createElement("li");
  listItem.textContent = taskText;

  // Toggle done when clicked
  listItem.addEventListener("click", function () {
    listItem.classList.toggle("done");
  });

  // Add delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function (event) {
    event.stopPropagation(); // So it doesn't mark as done
    list.removeChild(listItem);
  });

  listItem.appendChild(deleteBtn);
  list.appendChild(listItem);

  input.value = ""; // Clear input
}
