var todo = document.getElementById('todo-list');
var inputbox = document.getElementById('input-todo');
var btnViewAll = document.getElementById('btn_select-all');
var btnViewActive = document.getElementById('btn_select-active');
var btnViewCompleted = document.getElementById('btn_select-completed');
var foo = '';
var todos = [
  { id: 1, content:'1', completed: false},
  { id: 2, content:'2', completed: true},
  { id: 3, content:'3', completed: false}
];

function render(filter) {
  var html = '';
  var filteredTodos = [];
  if (!todos.length) {
    todo.innerHTML = '';
    return;
  }

  if ( filter === 'ViewActive') {
    filteredTodos = todos.filter(function(item) {
      return item.completed === false;
    });
  }else if (filter === 'ViewCompleted') {
    filteredTodos = todos.filter(function(item) {
      return item.completed === true;
    });
  }else{
    filteredTodos = todos;
  }

  filteredTodos.forEach(function(todo) {
    var dataID = todo.id;
    var labelFor = todo.content;
    var checked = todo.completed ? 'checked' : '';
     html += '<li class="list-group-item">';
     html += '<div class="hover-anchor">';
     html += '<a class="hover-action text-muted">';
     html += '<span class="glyphicon glyphicon-remove-circle pull-right" data-id="' + dataID + '"></span>';
     html += '</a>';
     html += '<label class="i-checks" for="' + dataID + '">';
     html += '<input type="checkbox" class="checkBox" id="' + dataID + '" ' + checked + '><i></i>';
     html += '<span>' + todo.content + '</span>';
     html += '</label>';
     html += '</div>';
    });
  todo.innerHTML = html;
}

function addTodo(inputValue) {
  var newID = generateNewID() + 1;
  todos = todos.concat([{ id: newID , content: inputValue, completed: false }]);
}

function generateNewID() {
  return Math.max.apply(null,todos.map(function (todo) {
    return todo.id;
  }));
}

function check (target) {
  var labelFor = target.getAttribute('for');
  todos.forEach(function(item) {
    if (item.id == labelFor) item.completed = !item.completed;
  });
}

function SelectAll() {
  todos.forEach(function(item) {
    item.completed = true;
  });
}

function deletTodo(deletedataId) {
  todos = todos.filter(function(item) {
    return item.id != deletedataId;
  });
}

// 할일추가
inputbox.addEventListener('keyup', function(e) {
  if ( e.keyCode === 13 && this.value !== '' ) {
    addTodo(this.value);
    console.log(todos);
    render(foo);
    this.value = '';
  }
});

todo.addEventListener('click', function (e) {
  if (e.target.nodeName === 'LABEL') {
    check(e.target);
    if (todo.classList.length !== 1 ) {
      render(todo.classList[1]);
    }else{
      render('ViewAll');
    }
  }
});

todo.addEventListener('click', function (e) {
  if (e.target.nodeName === 'SPAN') {
    var dataId = e.target.getAttribute('data-id');
    deletTodo(dataId);
    render();
  }
});

btnViewAll.addEventListener('click', function () {
  foo = 'ViewAll';
  todo.classList = 'list-group';
  render(foo);
});

btnViewActive.addEventListener('click', function () {
  foo = 'ViewActive';
  todo.classList += ' ViewCompleted';
  if (todo.classList.contains('ViewCompleted')) {
    todo.classList = 'list-group ' + foo;
  }
  render(foo);
});

btnViewCompleted.addEventListener('click', function() {
  foo = 'ViewCompleted';
  todo.classList += ' ViewActive';
  if (todo.classList.contains('ViewActive')) {
    todo.classList = 'list-group ' + foo;
  }
  render(foo);
});


window.addEventListener('load', function(){
  render();
});