import { getFilters } from "./filters";
import { toggleTodo, getTodos, removeTodo, setTodos } from "./todos";

const todos = getTodos();

const incompleteTodos = (todos) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('list-title');
    const incompleteTodos = todos.filter((todo) => !todo.completed);
    const plural = incompleteTodos.length === 1 ? `` :`s`;
    newDiv.innerHTML = `<h2>You have ${incompleteTodos.length} todo${plural} left to complete<h2>`;
    document.querySelector('#todos').appendChild(newDiv);
};

const sortTodos = (todos) => {
    todos.sort((a, b) => {
        if(!a.completed && b.completed) {
            return -1;
        } else if (a.completed && !b.completed) {
            return 1;
        } else {
            return 0;
        }
    })
};


const renderTodos  = () => {
    const todosElement = document.querySelector('#todos');
    const {text: textFilter, hideCompletedTodos} = getFilters();
    
    //Clear todos list
    todosElement.innerHTML = "";

    //Carry out filtering
    const filteredTodos = todos.filter((todo) => {
        const searchFilterMatch = todo.text.toLowerCase().includes(textFilter.toLowerCase());
        const completedMatch = hideCompletedTodos ? !todo.completed : true;
        return searchFilterMatch && completedMatch;
    });

    //Render data
    incompleteTodos(filteredTodos);
    sortTodos(filteredTodos);

    if(filteredTodos.length < 1) {
        const message = document.createElement('p');
        message.textContent = "There are currently no todos to show."
        message.classList.add('empty-message');
        todosElement.appendChild(message);
        return;
    }

    filteredTodos.forEach((todo) => {
        todosElement.appendChild(generateTodoDOM(todo));
    });
};

const generateTodoDOM = (todo) => {
    const todoLabel = document.createElement('label');
    const todoContainer = document.createElement('div');
    const todoCheckBox = document.createElement('input')
    const todoText = document.createElement('span');
    const todoRemoveButton = document.createElement('button');

    todoRemoveButton.classList.add('button', 'button--text');
    todoLabel.classList.add('list-item');
    todoContainer.classList.add('list-item__container');
    
    todoRemoveButton.addEventListener('click', (e) => {
        removeTodo(todo.id);
        setTodos();
        renderTodos();
    });

    todoCheckBox.setAttribute('type', 'checkbox');
    todoCheckBox.addEventListener('click', (e) => {
        toggleTodo(todo.id);
        setTodos();
        renderTodos();
    });

    todoCheckBox.checked = todo.completed;

    todoText.textContent = todo.text;
    todoRemoveButton.textContent = 'remove';

    todoContainer.appendChild(todoCheckBox);
    todoContainer.appendChild(todoText);
    todoLabel.appendChild(todoContainer);
    todoLabel.appendChild(todoRemoveButton);

    return todoLabel;
};

export {
    renderTodos as default
}