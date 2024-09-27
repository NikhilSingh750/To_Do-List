
// Load tasks from localStorage when the app is loaded
document.addEventListener('DOMContentLoaded', loadTasks);

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Event listener to add a new task
addTaskBtn.addEventListener('click', addTask);

// Function to load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task);
    });
}

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        id: Date.now(),
        text: taskText
    };

    // Save task to localStorage
    saveTaskToLocalStorage(task);

    // Create a new task element and append it to the list
    createTaskElement(task);

    taskInput.value = '';
}

// Function to create a task element in the DOM
function createTaskElement(task) {
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);

    const span = document.createElement('span');
    span.className = 'task-text';
    span.innerText = task.text;
    li.appendChild(span);

    const editBtn = document.createElement('button');
    editBtn.className = 'edit';
    editBtn.innerText = 'Edit';
    li.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete';
    deleteBtn.innerText = 'Delete';
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    // Add event listeners for edit and delete buttons
    editBtn.addEventListener('click', () => editTask(li));
    deleteBtn.addEventListener('click', () => deleteTask(li));
}

// Function to save a task to localStorage
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
document.getElementById("Tasks").addEventListener(('click',async ()=>{
    Array.from(task).forEach((elem,input)=>{
        alert(elem,input)
    })
}))

// Function to delete a task
function deleteTask(taskElement) {
    const taskId = taskElement.getAttribute('data-id');

    // Remove task from DOM
    taskElement.remove();

    // Remove task from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to edit a task
function editTask(taskElement) {
    const taskId = taskElement.getAttribute('data-id');
    const taskText = taskElement.querySelector('.task-text').innerText;

    // Ask user for new task text
    const newTaskText = prompt('Edit your task:', taskText);
    if (newTaskText === null || newTaskText.trim() === '') return;

    // Update DOM
    taskElement.querySelector('.task-text').innerText = newTaskText;

    // Update localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.findIndex(task => task.id == taskId);
    tasks[taskIndex].text = newTaskText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
