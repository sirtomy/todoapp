//get the form element
var form = document.getElementById('form-input');
//get the ul
var taskList = document.getElementById('tasks');
console.log(taskList);
//get input value
var todoVal = document.getElementById("task");

//form submit event
form.addEventListener('submit', function(e) {
    //prevent form submit default behaviour
    e.preventDefault();
    addTask(todoVal.value);
});

//array which stores every todo
let todos = [];

//add todo
function addTask(item) {
    //check if item is not empty
    if (item !== '') {
        //create a todo object
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        //push it to todos array
        todos.push(todo);
        addToLocalStorage(todos);

        todoVal.value='';
    }
};

function renderTodos(todos) {
    //clear ul
    taskList.innerHTML = '';
    //run through todos items
    todos.forEach(function(item) {
        //check if the item is completed
        const checked = item.completed ? 'checked' : null;
        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        if (item.completed === true) {
            li.classList.add('checked');
        };
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${checked}>
            ${item.name}
            <button class = "delete-button">X</button>
        `;
        taskList.appendChild(li);
    });
};

//add todos to localStorage
function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos(todos);
}


//to get todos from local storage
function getFromLocalStorage() {
    const reference = localStorage.getItem('todos');
    if (reference) {
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
}


//toggle the value to completed or not
function toggle(id) {
    todos.forEach(function(item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    });
   addToLocalStorage(todos);
}

//delete a todo from todos array, and update localStorage
function deleteTodo(id) {
    todos = todos.filter(function(item) {
        return item.id != id;
    });
    //update local storage
    addToLocalStorage(todos);
}
getFromLocalStorage();

//adding event listener to ul
taskList.addEventListener('click', function(event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }
    if (event.target.classList.contains('delete-button')){
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
        console.log(2)
    }
});