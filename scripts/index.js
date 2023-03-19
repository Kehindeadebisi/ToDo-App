//Today's date

window.onload = todayDate();
function todayDate() {
    let day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let now = new Date();
    let dateString = day[now.getDay()] + ", " + month[now.getMonth()] + " " + now.getDate();
    document.getElementById("date").innerText = dateString;
}

//Typing Effect
let i = 0;
let txt = 'Welcome!'
let speed = 200;

window.onload = typeWriter();
function typeWriter() {
    if (i < txt.length) {
        document.getElementById("welcome").innerText += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    };
};

/**let addTask = document.getElementById('addButton');
let taskContainer = document.getElementById("item-wrap");
let inputField = document.getElementById('tasks')
let deleteTask = document.getElementById('delete')

addTask.addEventListener('click', function () {
    let paragraph = document.createElement('div');
    paragraph.style.cssText = 'border-radius: 20px;background-color: rgba(206, 194, 194, 0.2) ; padding: 10px 20px; width: 70%;';

    let toDo = document.createElement('input');
    toDo.style.cssText = 'background-color:rgba(206, 194, 194, 0.2) ;background: transparent;border: none;color: white;font-size: large;scroll-behavior: smooth;font-weight: 500; position: relative;text-decoration: underline; width: 80%; box-shadow: 0 15px 30px rgb(0,0,0,0.3); height: 30px';
    toDo.innerText = toDo.value;
    
    let time = document.createElement('input');
    time.style.cssText = 'background-color:rgba(206, 194, 194, 0.2) ;background: transparent;border: none;color: white;font-size: large;scroll-behavior: smooth;font-weight: 500; position: relative';

    let notes = document.createElement('input');
    notes.style.cssText = 'background-color:rgba(206, 194, 194, 0.2) ;background: transparent;border: none;color: white;font-size: large;scroll-behavior: smooth;font-weight: 500; position: relative';

    

    taskContainer.appendChild(toDo);
    toDo.value ="";

    taskContainer.appendChild(time);
    time.value ="";

    taskContainer.appendChild(notes);
    notes.value ="";

})
**/


//Initial References
const newTaskInput = document.querySelector("#new-task input");
const tasksDiv = document.querySelector("#tasks");
let deleteTasks, editTasks, tasks;
let updateNote = "";
let count;

//Function on window load
window.onload = () => {
  updateNote = "";
  count = Object.keys(localStorage).length;
  displayTasks();
};

//Function to Display The Tasks
const displayTasks = () => {
  if (Object.keys(localStorage).length > 0) {
    tasksDiv.style.display = "inline-block";
  } else {
    tasksDiv.style.display = "none";
  }

  //Clear the tasks
  tasksDiv.innerHTML = "";

  //Fetch All The Keys in local storage
  let tasks = Object.keys(localStorage);
  tasks = tasks.sort();

  for (let key of tasks) {
    let classValue = "";

    //Get all values
    let value = localStorage.getItem(key);
    let taskInnerDiv = document.createElement("div");
    taskInnerDiv.classList.add("task");
    taskInnerDiv.setAttribute("id", key);
    taskInnerDiv.innerHTML = `<span id="taskname">${key.split("_")[1]}</span>`;
    //localstorage would store boolean as string so we parse it to boolean back
    let editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.innerHTML = `<ion-icon name="create-outline"></ion-icon>`;
    if (!JSON.parse(value)) {
      editButton.style.visibility = "visible";
    } else {
      editButton.style.visibility = "hidden";
      taskInnerDiv.classList.add("completed");
    }
    taskInnerDiv.appendChild(editButton);
    taskInnerDiv.innerHTML += `<button class="delete"><ion-icon name="trash-outline" size="medium"></ion-icon></i></button>`;

    tasksDiv.appendChild(taskInnerDiv);
  }

  //tasks completed
  tasks = document.querySelectorAll(".task");
  tasks.forEach((element, index) => {
    element.onclick = () => {
      //local storage update
      if (element.classList.contains("completed")) {
        updateStorage(element.id.split("_")[0], element.innerText, false);
      } else {
        updateStorage(element.id.split("_")[0], element.innerText, true);
      }
    };
  });

  //Edit Tasks
  editTasks = document.getElementsByClassName("edit");
  Array.from(editTasks).forEach((element, index) => {
    element.addEventListener("click", (e) => {
      //Stop propogation to outer elements (if removed when we click delete eventually rhw click will move to parent)
      e.stopPropagation();
      //disable other edit buttons when one task is being edited
      disableButtons(true);
      //update input value and remove div
      let parent = element.parentElement;
      newTaskInput.value = parent.querySelector("#taskname").innerText;
      //set updateNote to the task that is being edited
      updateNote = parent.id;
      //remove task
      parent.remove();
    });
  });

  //Delete Tasks
  deleteTasks = document.getElementsByClassName("delete");
  Array.from(deleteTasks).forEach((element, index) => {
    element.addEventListener("click", (e) => {
      e.stopPropagation();
      //Delete from local storage and remove div
      let parent = element.parentElement;
      removeTask(parent.id);
      parent.remove();
      count -= 1;
    });
  });
};

//Disable Edit Button
const disableButtons = (bool) => {
  let editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

//Remove Task from local storage
const removeTask = (taskValue) => {
  localStorage.removeItem(taskValue);
  displayTasks();
};

//Add tasks to local storage
const updateStorage = (index, taskValue, completed) => {
  localStorage.setItem(`${index}_${taskValue}`, completed);
  displayTasks();
};

//Function To Add New Task
document.querySelector("#push").addEventListener("click", () => {
  //Enable the edit button
  disableButtons(false);
  if (newTaskInput.value.length == 0) {
    alert("Please Enter A Task");
  } else {
    //Store locally and display from local storage
    if (updateNote == "") {
      //new task
      updateStorage(count, newTaskInput.value, false);
    } else {
      //update task
      let existingCount = updateNote.split("_")[0];
      removeTask(updateNote);
      updateStorage(existingCount, newTaskInput.value, false);
      updateNote = "";
    }
    count += 1;
    newTaskInput.value = "";
  }
});




/**let add =document.querySelector('#addButton')
add.addEventListener('click', function() {
    if(document.querySelector('#tasks input').value.length == 0) {
        alert('Please Enter a Task')
    }
    else{
        document.querySelector('#tasks').innerHTML += `<div class = "task">
        <span id = "taskname">
            ${document.querySelector('#tasks input').value}
        </span>
        </div>`
    }
});**/


