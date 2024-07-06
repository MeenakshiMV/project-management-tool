document.addEventListener('DOMContentLoaded', () => {
    const projectNameInput = document.getElementById('project-name');
    const projectDescriptionInput = document.getElementById('project-description');
    const createProjectBtn = document.getElementById('create-project-btn');
    const taskNameInput = document.getElementById('task-name');
    const taskDescriptionInput = document.getElementById('task-description');
    const taskDeadlineInput = document.getElementById('task-deadline');
    const addTaskBtn = document.getElementById('add-task-btn');
    const projectForm = document.getElementById('project-form');
    const taskForm = document.getElementById('task-form');
    const projectListDiv = document.getElementById('project-list');
    const projectsUl = document.getElementById('projects');
    const taskListDiv = document.getElementById('task-list');
    const tasksUl = document.getElementById('tasks');
    
    let projects = [];
    let currentProjectIndex = -1;
    
    createProjectBtn.addEventListener('click', () => {
        const projectName = projectNameInput.value.trim();
        const projectDescription = projectDescriptionInput.value.trim();
        
        if (!projectName) {
            alert('Please enter a project name');
            return;
        }
        
        const project = {
            name: projectName,
            description: projectDescription,
            tasks: []
        };
        
        projects.push(project);
        displayProjects();
        
        // Reset project form
        projectNameInput.value = '';
        projectDescriptionInput.value = '';
    });
    
    addTaskBtn.addEventListener('click', () => {
        const taskName = taskNameInput.value.trim();
        const taskDescription = taskDescriptionInput.value.trim();
        const taskDeadline = taskDeadlineInput.value;
        
        if (!taskName || !taskDeadline) {
            alert('Please enter task name and deadline');
            return;
        }
        
        const task = {
            name: taskName,
            description: taskDescription,
            deadline: taskDeadline,
            completed: false  // New property to track task completion
        };
        
        projects[currentProjectIndex].tasks.push(task);
        
        // Display tasks for the current project
        displayTasks(currentProjectIndex);
        
        // Reset task form
        taskNameInput.value = '';
        taskDescriptionInput.value = '';
        taskDeadlineInput.value = '';
    });
    
    function displayProjects() {
        projectsUl.innerHTML = '';
        projects.forEach((project, index) => {
            const li = document.createElement('li');
            li.textContent = project.name;
            li.classList.add('btn');
            li.addEventListener('click', () => {
                showTasks(index);
            });
            projectsUl.appendChild(li);
        });
        
        projectListDiv.style.display = 'block';
        taskForm.style.display = 'none';
        taskListDiv.style.display = 'none';
    }
    
    function showTasks(index) {
        currentProjectIndex = index;
        const project = projects[index];
        
        tasksUl.innerHTML = '';
        project.tasks.forEach((task, taskIndex) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${task.name}</strong><br>
                ${task.description}<br>
                Deadline: ${task.deadline}<br>
                Status: ${task.completed ? 'Completed' : 'Incomplete'}
            `;
            if (!task.completed) {
                const completeBtn = document.createElement('button');
                completeBtn.textContent = 'Mark Complete';
                completeBtn.addEventListener('click', () => {
                    markTaskComplete(index, taskIndex);
                });
                li.appendChild(completeBtn);
            }
            tasksUl.appendChild(li);
        });
        
        taskListDiv.style.display = 'block';
        taskForm.style.display = 'block';
    }
    
    function markTaskComplete(projectIndex, taskIndex) {
        projects[projectIndex].tasks[taskIndex].completed = true;
        displayTasks(projectIndex);
    }
});

