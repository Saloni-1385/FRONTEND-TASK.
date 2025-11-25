function loadTasks() {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

document.getElementById('add-task-btn').onclick = function() {
  const input = document.getElementById('task-input');
  let val = input.value.trim();
  if (val.length > 0) {
    const tasks = loadTasks();
    tasks.push({ text: val });
    saveTasks(tasks);
    renderTasks();
    input.value = '';
    input.focus();
  }
};

document.getElementById('task-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    document.getElementById('add-task-btn').click();
  }
});

window.onload = renderTasks;

function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  const tasks = loadTasks();
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    if (task.editing) {
      const input = document.createElement('input');
      input.value = task.text;
      input.className = 'edit-input';
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') finishEdit();
      });
      li.appendChild(input);

      const finishEdit = () => {
        tasks[index].text = input.value.trim();
        tasks[index].editing = false;
        saveTasks(tasks);
        renderTasks();
      };

      input.focus();

      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Save';
      saveBtn.className = 'task-btn edit';
      saveBtn.onclick = finishEdit;
      li.appendChild(saveBtn);

      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = 'Cancel';
      cancelBtn.className = 'task-btn delete';
      cancelBtn.onclick = () => {
        tasks[index].editing = false;
        saveTasks(tasks);
        renderTasks();
      };
      li.appendChild(cancelBtn);

    } else {
      const span = document.createElement('span');
      span.textContent = task.text;
      span.className = 'task-text';
      li.appendChild(span);

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.className = 'task-btn edit';
      editBtn.onclick = () => {
        tasks[index].editing = true;
        saveTasks(tasks);
        renderTasks();
      };
      li.appendChild(editBtn);

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.className = 'task-btn delete';
      delBtn.onclick = () => {
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
      };
      li.appendChild(delBtn);
    }
    taskList.appendChild(li);
  });
}
