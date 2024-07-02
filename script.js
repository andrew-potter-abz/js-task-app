var selectedRow = null;

// Show Alerts
const showAlert = (message, className) => {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
};

// Clear All Fields

const clearFields = () => {
  document.querySelector("#assignee").value = "";
  document.querySelector("#labels").value = "";
  document.querySelector("#task").value = "";
};

// Add Tasks

document.querySelector("#task-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get Form Values
  const assignee = document.querySelector("#assignee").value;
  const labels = document.querySelector("#labels").value;
  const task = document.querySelector("#task").value;

  // Validate
  if (assignee === "" || task === "") {
    showAlert("Please fill in all fields.", "danger");
  } else {
    if (selectedRow === null) {
      const list = document.querySelector("#task-list");
      const row = document.createElement("tr");

      row.innerHTML = `
            <td>${task}</td>
            <td>${labels}</td>
            <td>${assignee}</td>
            <td>
                <label class="switch">
                  <input type="checkbox" />
                  <span class="slider round"></span>
                </label>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a
                ><a href="#" class="btn btn-danger btn-sm delete">Delete</a>
              </td>
        `;
      list.appendChild(row);
      selectedRow = null;
      showAlert("Task Added!", "success");
    } else {
      selectedRow.children[0].textContent = task;
      selectedRow.children[1].textContent = labels;
      selectedRow.children[2].textContent = assignee;
      selectedRow = null;
      showAlert("Task Edited!", "info");
    }
    clearFields();
  }
});

//Edit Tasks

document.querySelector("#task-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;
    document.querySelector("#task").value = selectedRow.children[0].textContent;
    document.querySelector("#labels").value =
      selectedRow.children[1].textContent;
    document.querySelector("#assignee").value =
      selectedRow.children[2].textContent;
  }
});

// Delete Tasks

document.querySelector("#task-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("Task Deleted.", "danger");
  }
});
