const apiUrl = 'https://localhost:7239/api/Task';

async function fetchTasks() {
    const res = await fetch(apiUrl);
    const tasks = await res.json();
    renderTasks(tasks);
}

function renderTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card d-flex justify-content-between align-items-center';

        const taskInfo = document.createElement('div');
        taskInfo.className = 'task-title' + (task.isCompleted ? ' completed' : '');
        taskInfo.innerHTML = `
            <input type="checkbox" ${task.isCompleted ? 'checked' : ''} onclick="toggleTask(${task.id})"> 
            ${task.title}
        `;

        const deleteBtn = document.createElement('span');
        deleteBtn.className = 'btn-delete';
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.onclick = () => deleteTask(task.id);

        taskCard.appendChild(taskInfo);
        taskCard.appendChild(deleteBtn);

        taskList.prepend(taskCard);

    });
}

document.getElementById('addTaskBtn').addEventListener('click', async () => {
    const taskTitle = document.getElementById('taskInput').value.trim();
    if (taskTitle === '') return;

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: taskTitle, isCompleted: false })
    });

    document.getElementById('taskInput').value = '';
    fetchTasks();
});

document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.getElementById('addTaskBtn').click();
    }
});


async function toggleTask(id) {
    await fetch(`${apiUrl}/${id}/toggle`, { method: 'PUT' });
    fetchTasks();
}

async function deleteTask(id) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchTasks();
}

new Sortable(document.getElementById('taskList'), {
    animation: 150,
    ghostClass: 'sortable-ghost'
});


fetchTasks();
