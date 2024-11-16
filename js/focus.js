// Timer Functionality
let timer;
let timerTime = 25 * 60; // 25 minutes in seconds
let isRunning = false;
let progressBar = document.getElementById("progressBar");
let timeDisplay = document.getElementById("time");
let timerContainer = document.getElementById("timerContainer");

function startTimer() {
    console.log("start timer")
    if (!isRunning) {
        isRunning = true;
        timerContainer.classList.add("active");
        timer = setInterval(() => {
            if (timerTime > 0) {
                timerTime--;
                timeDisplay.textContent = formatTime(timerTime);
                updateProgressBar(timerTime);
            } else {
                clearInterval(timer);
                alert("Time's up!");
                resetTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
    timerContainer.classList.remove("active");
}

function resetTimer() {
    isRunning = false;
    clearInterval(timer);
    timerTime = 25 * 60;
    timeDisplay.textContent = '25:00';
    progressBar.style.width = "0";
    timerContainer.classList.remove("active");
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateProgressBar(seconds) {
    let percentage = (1 - seconds / (25 * 60)) * 100;
    progressBar.style.width = `${percentage}%`;
}

// To-Do List Functionality
const todoInput = document.getElementById('todoInput');
const todoItems = document.getElementById('todoItems');

// Add task to the list
function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const li = document.createElement('li');
    li.innerHTML = `${taskText} 
                    <button onclick="removeTask(this)">Delete</button>
                    <button onclick="completeTask(this)">Complete</button>`;
    todoItems.appendChild(li);

    // Store the updated list in localStorage
    saveTasks();
    
    todoInput.value = ''; // Clear input after adding the task
}

// Remove task from the list
function removeTask(button) {
    button.parentElement.remove();
    // Store the updated list in localStorage
    saveTasks();
}

// Mark task as complete and show confirmation
function completeTask(button) {
    const task = button.parentElement;
    const taskText = task.firstChild.textContent.trim();

    // Show confirmation prompt
    if (confirm(`Have you completed your task: "${taskText}"?`)) {
        // Mark task as completed
        task.classList.add('completed');
        
        // Change the button text to 'Completed' and make it green
        button.textContent = 'Completed';
        button.style.backgroundColor = 'green';
        button.disabled = true; // Disable the button to prevent further clicks

        alert("Great! Keep up the good work.");
        
        // Store the updated list in localStorage
        saveTasks();
    }
}


// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    const taskItems = todoItems.getElementsByTagName('li');
    
    for (let item of taskItems) {
        tasks.push({
            text: item.firstChild.textContent.trim(),
            completed: item.classList.contains('completed')
        });
    }

    localStorage.setItem('todoList', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('todoList'));

    if (storedTasks) {
        storedTasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `${task.text} 
                            <button onclick="removeTask(this)">Delete</button>
                            <button onclick="completeTask(this)">Complete</button>`;
            if (task.completed) {
                li.classList.add('completed');
            }
            todoItems.appendChild(li);
        });
    }
}

// Listen for enter key to add task
todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Load tasks when the page loads
window.onload = loadTasks;
