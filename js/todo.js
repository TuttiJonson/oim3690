const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const dueInput = document.getElementById('todo-due');
const list = document.getElementById('todo-list');
const count = document.getElementById('todo-count');

let todos = load();
render();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: Date.now(), text, done: false, due: dueInput.value });
  input.value = '';
  dueInput.value = '';
  save();
  render();
});

list.addEventListener('click', (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  const id = Number(li.dataset.id);
  if (e.target.classList.contains('delete')) {
    todos = todos.filter((t) => t.id !== id);
  } else if (e.target.type === 'checkbox') {
    const todo = todos.find((t) => t.id === id);
    todo.done = e.target.checked;
  } else {
    return;
  }
  save();
  render();
});

function render() {
  list.innerHTML = '';
  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'item' + (todo.done ? ' done' : '');
    li.dataset.id = todo.id;

    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = todo.done;
    box.setAttribute('aria-label', 'Mark done');

    const span = document.createElement('span');
    span.textContent = todo.text;

    const del = document.createElement('button');
    del.type = 'button';
    del.className = 'delete';
    del.textContent = 'Delete';

    li.append(box, span);

    if (todo.due) {
      const due = document.createElement('small');
      due.className = 'due';
      due.textContent = 'Due ' + new Date(todo.due + 'T00:00:00').toLocaleDateString();
      if (!todo.done && todo.due < today()) due.classList.add('overdue');
      li.appendChild(due);
    }

    li.appendChild(del);
    list.appendChild(li);
  });

  const left = todos.filter((t) => !t.done).length;
  count.textContent = todos.length
    ? `${left} of ${todos.length} left`
    : 'No tasks yet';
}

// Today's date as YYYY-MM-DD in local time, to compare with date input values
function today() {
  const d = new Date();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${month}-${day}`;
}

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function load() {
  try {
    return JSON.parse(localStorage.getItem('todos')) || [];
  } catch {
    return [];
  }
}
