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