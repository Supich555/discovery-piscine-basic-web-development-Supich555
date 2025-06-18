// Helper: set cookie
function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/`;
}

// Helper: get cookie
function getCookie(name) {
  const cookieArr = document.cookie.split(';');
  for (let c of cookieArr) {
    const [k, v] = c.trim().split('=');
    if (k === name) return decodeURIComponent(v);
  }
  return "";
}

function saveTodos(todos) {
  setCookie('todoList', JSON.stringify(todos), 365);
}

function loadTodos() {
  const cookie = getCookie('todoList');
  return cookie ? JSON.parse(cookie) : [];
}

function renderTodos(todos) {
  const list = document.getElementById('ft_list');
  list.innerHTML = '';
  todos.forEach((text, i) => {
    const div = document.createElement('div');
    div.className = 'todo';
    div.textContent = text;
    div.addEventListener('click', () => {
      if (confirm("Do you want to delete this TO DO?")) {
        todos.splice(i, 1);
        saveTodos(todos);
        renderTodos(todos);
      }
    });
    list.appendChild(div);
  });
}

function newTodo() {
  const text = prompt("Enter your new TO DO:");
  if (text && text.trim().length > 0) {
    todos.unshift(text.trim());
    saveTodos(todos);
    renderTodos(todos);
  }
}

// Load on page
let todos = loadTodos();
renderTodos(todos);