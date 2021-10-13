const elTodoForm = document.querySelector('.form-todos');
const elTodoInput = document.querySelector('.input-todo');
const elTodoList = document.querySelector('.list-todo');

const elAllBtn = document.querySelector('.all-todo-btn');
const elCompletedBtn = document.querySelector('.completed-todo-btn');
const elUncompletedBtn = document.querySelector('.uncompleted-todo-btn');
const elAllCount = document.querySelector('.allCount');
const elCompletedCount = document.querySelector('.completedCount');
const elUncompletedCount = document.querySelector('.uncompletedCount');
const elTodosControls = document.querySelector('.controls-todos');

const localTodos = JSON.parse(window.localStorage.getItem('todos'));
const todos = localTodos || [];

function updateTodos() {
	renderTodos(todos, elTodoList);
	window.localStorage.setItem('todos', JSON.stringify(todos));
}

updateTodos();

function renderTodos(arr, node) {
	node.innerHTML = null;

	const allCount = todos.length;
	const completedCount = todos.filter(
		(row) => row.isCompleted === true,
	).length;

	elAllCount.textContent = allCount;
	elCompletedCount.textContent = completedCount;
	elUncompletedCount.textContent = allCount - completedCount;

	arr.forEach((todo) => {
		const newLi = document.createElement('li');
		const newButton = document.createElement('button');
		const newCheckbox = document.createElement('input');

		newLi.textContent = todo.title;
		newButton.textContent = 'Delete';

		newCheckbox.type = 'checkbox';
		newButton.classList.add('todo__delete-btn');
		newCheckbox.classList.add('todo__checkbox');
		newButton.dataset.todoId = todo.id;
		newCheckbox.dataset.todoId = todo.id;

		if (todo.isCompleted) {
			newCheckbox.checked = true;
			newLi.style.textDecoration = 'line-through';
		}

		newLi.appendChild(newCheckbox);
		newLi.appendChild(newButton);
		node.appendChild(newLi);
	});
}
elTodoList.addEventListener('click', (evt) => {
	if (evt.target.matches('.todo__delete-btn')) {
		const todoId = Number(evt.target.dataset.todoId);
 
		const foundTodoIndex = todos.findIndex((todo) => todo.id === todoId);

		todos.splice(foundTodoIndex, 1);

		updateTodos();
	} else if (evt.target.matches('.todo__checkbox')) {
		const todoId = Number(evt.target.dataset.todoId);

		const foundTodo = todos.find((todo) => todo.id === todoId);

		foundTodo.isCompleted = !foundTodo.isCompleted;

		updateTodos();
	}
});

elTodoForm.addEventListener('submit', (evt) => {
	evt.preventDefault();

	const inputValue = elTodoInput.value.trim();

	const newTodo = {
		id: todos[todos.length - 1]?.id + 1 || 0,
		title: inputValue,
		isCompleted: false,
	};

	todos.push(newTodo);

	updateTodos();

	elTodoInput.value = null;
});

elTodosControls.addEventListener('click', (evt) => {
	if (evt.target.matches('.all-todo-btn')) {
		renderTodos(todos, elTodoList);
	} 
	else if (evt.target.matches('.completed-todo-btn')) {
		const filtered = todos.filter((todo) => todo.isCompleted === true);

		renderTodos(filtered, elTodoList);
	} 
	else if (evt.target.matches('.uncompleted-todo-btn')) {
		const filtered = todos.filter((todo) => todo.isCompleted === false);

		renderTodos(filtered, elTodoList);
	}
});
