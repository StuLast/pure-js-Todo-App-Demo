'use strict'

//Data Storage

import moment from 'moment';
import uuidv4 from 'uuid/v4';

let todos = getTodos();



//startup
//=======

renderTodos(todos, filters);

//Define event listeners
//======================

document.querySelector('#add-todo').addEventListener('submit', (e) => {
    e.preventDefault();
    const dataSource = e.target.elements.inputAddTodo;
    const text = dataSource.value.trim();
    if(!text) {
        console.log("There is no content to add");
        return;
    }

    todos.push({
        id:  uuidv4(),
        text,
        completed: false 
    });
    setTodos(todos);
    dataSource.value = ""; 
    renderTodos(todos, filters);
});

document.querySelector('#input-search-todo').addEventListener('input', (e) => {
    e.preventDefault();
    filters.text = e.target.value;
    renderTodos(todos, filters);
});

document.querySelector('#hide-completed-todos').addEventListener('change', (e) => {
    e.preventDefault();
    filters.hideCompletedTodos = e.target.checked;
    renderTodos(todos, filters);
});



