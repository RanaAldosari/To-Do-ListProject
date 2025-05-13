let addBtn = document.getElementById("taskBtn");
let taskInput = document.getElementById("input-task");
let taskShow = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("task_key")) || [];
let deleteAllbtn = document.getElementById("deleteAll-btn");

addBtn.addEventListener("click", function () {
    let taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Write something please!");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false,
        time: new Date().toLocaleDateString()
    });
    localStorage.setItem("task_key", JSON.stringify(tasks));
    showAllTasks();
    taskInput.value = "";
});

function showAllTasks() {
    taskShow.innerHTML = "";

    deleteAllbtn.style.display = tasks.length > 0 ? "block" : "none";

    tasks.forEach((task, index) => {
        
        let taskItem = document.createElement("li");
        taskItem.className = "task-item d-flex justify-content-between align-items-center";

        //Task&date
        let contentDiv = document.createElement("div");
        contentDiv.className = "contentDiv";

        let taskText = document.createElement("span");
        taskText.textContent = task.text;

        let taskTime = document.createElement("span");
        taskTime.className = "task-time";
        taskTime.textContent = task.time;

        contentDiv.appendChild(taskText);
        contentDiv.appendChild(taskTime);

       
        let iconsDiv = document.createElement("div");
        iconsDiv.className = "iconsDiv";

        // Check
        let taskCheck = document.createElement("i");
        taskCheck.className = "fa-solid fa-check";
        if(task.completed){
            taskText.style.textDecoration="line-through"
        }
        if(tasks[index].completed){
            alert("The Task Is Done!")
        }else{
alert("The Task Is Not Completed")
        }
        taskCheck.onclick = function () {
            tasks[index].completed=!tasks[index].completed
            localStorage.setItem("task_key",JSON.stringify(tasks))
            showAllTasks() 
        };

        // Edit
        let taskEdit = document.createElement("i");
        taskEdit.className = "fa-regular fa-pen-to-square";
        taskEdit.onclick = function () {
            let newEdit = prompt("Edit task", task.text);
            if (newEdit && newEdit.trim() !== "") {
                tasks[index].text = newEdit;
                localStorage.setItem("task_key", JSON.stringify(tasks));
                showAllTasks();
            }
        };

        // Delete
        let xMark = document.createElement("i");
        xMark.className = "fa-solid fa-x";
        xMark.onclick = function () {
            let confirmDelete = confirm("Are you sure you want to delete the task?");
            if (confirmDelete) {
                tasks.splice(index, 1);
                localStorage.setItem("task_key", JSON.stringify(tasks));
                showAllTasks();
            }
        };

        iconsDiv.appendChild(taskCheck);
        iconsDiv.appendChild(taskEdit);
        iconsDiv.appendChild(xMark);

        taskItem.appendChild(contentDiv);
        taskItem.appendChild(iconsDiv);

        taskShow.appendChild(taskItem);
    });
}

showAllTasks();
// DeleteAll
deleteAllbtn.addEventListener("click", function () {
    let confirmDelete = confirm("Are you sure you want to delete all tasks?");
    if (confirmDelete) {
        tasks = [];
        localStorage.setItem("task_key", JSON.stringify(tasks));
        showAllTasks();
    }
});
// sign

