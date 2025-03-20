window.addEventListener('load', () => {
	let todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');
	const clearCompletedBtn = document.querySelector('#clear-completed');
	const username = localStorage.getItem('username') || '';
	
	nameInput.value = username;
	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	});
	
	newTodoForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			dueDate: e.target.elements.dueDate.value || "No due date",
			done: false,
			createdAt: new Date().getTime()
		};
		todos.push(todo);
		localStorage.setItem('todos', JSON.stringify(todos));
		e.target.reset();
		DisplayTodos();
	});
	
	clearCompletedBtn.addEventListener('click', () => {
		todos = todos.filter(todo => !todo.done);
		localStorage.setItem('todos', JSON.stringify(todos));
		DisplayTodos();
	});
	
	// Helper function to get category class
	const getCategoryClass = (category) => {
		switch (category.toLowerCase()) {
			case 'xetech':
				return 'Xetech';
			case 'basecamp':
				return 'Basecamp';
			case 'emails':
				return 'Emails';
			case 'personal':
				return 'Personal';
			default:
				return '';
		}
	};

	function DisplayTodos() {
		const todoList = document.querySelector('#todo-list');
		todoList.innerHTML = "";
		todos.forEach(todo => {
			const todoItem = document.createElement('div');
			todoItem.classList.add('todo-item', getCategoryClass(todo.category)); // Apply category class
			
			if (todo.done) todoItem.classList.add('done');
			
			const label = document.createElement('label');
			const input = document.createElement('input');
			const span = document.createElement('span');
			const content = document.createElement('div');
			const dueDateDisplay = document.createElement('div');
			const actions = document.createElement('div');
			const edit = document.createElement('button');
			const deleteButton = document.createElement('button');
			
			input.type = 'checkbox';
			input.checked = todo.done;
			span.classList.add('bubble', getCategoryClass(todo.category).toLowerCase());
			content.classList.add('todo-content');
			actions.classList.add('actions');
			edit.classList.add('edit');
			deleteButton.classList.add('delete');
			
			content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
			dueDateDisplay.innerHTML = `<small class="due-date">Due: ${new Date(todo.dueDate).toLocaleString()}</small>`;
			edit.innerText = 'Edit';
			deleteButton.innerText = 'Delete';
			
			label.appendChild(input);
			label.appendChild(span);
			actions.appendChild(edit);
			actions.appendChild(deleteButton);
			todoItem.appendChild(label);
			todoItem.appendChild(content);
			todoItem.appendChild(dueDateDisplay);
			todoItem.appendChild(actions);
			
			todoList.appendChild(todoItem);
			
			// Checkbox event to mark as done/undone
			input.addEventListener('change', () => {
				todo.done = input.checked;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos();
			});
			
			// Edit event
			edit.addEventListener('click', () => {
				const inputField = content.querySelector('input');
				inputField.removeAttribute('readonly');
				inputField.focus();
				inputField.addEventListener('keypress', (e) => {
					if (e.key === 'Enter') {
						inputField.setAttribute('readonly', true);
						todo.content = inputField.value;
						localStorage.setItem('todos', JSON.stringify(todos));
						DisplayTodos();
					}
				});
			});
			
			// Delete event
			deleteButton.addEventListener('click', () => {
				todos = todos.filter(t => t !== todo);
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos();
			});


			
		});
	}

	DisplayTodos();
});
