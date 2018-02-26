var todo = document.getElementById('todo-list');
var inputbox = document.getElementById('input-todo');
var btnViewAll = document.getElementById('all');
var btnViewActive = document.getElementById('active');
var btnViewCompleted = document.getElementById('completed');
var navPills = document.getElementsByClassName('nav-pills')[0];
var navPill = document.querySelectorAll('.nav-pills li');
var btncheckAll = document.getElementById('chk-allComplete');
var leftNum = document.getElementById('activeTodos');
var completedNum = document.getElementById('completedTodos');
var clearCompleted = document.getElementById('btn-removeCompletedTodos');
var renderFilter = '';
var todos = [];

// XMLHttpRequest 객체의 생성
var req = new XMLHttpRequest();

// 비동기 방식으로 Request를 오픈한다
req.open('GET', '/webserver-express/public/data.json');
// Request를 전송한다
req.send();

req.onreadystatechange = function () {
  // 서버 응답 완료 && 정상 응답
  if (req.readyState === XMLHttpRequest.DONE) {
    if (req.status === 200) {
      todos = JSON.parse(req.responseText);
    }
  }
}


function render(filter) {
  var html = '';
  var filteredTodos = [];
  var leftedTodos =  0;
  var completedTodos =  0;

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

  // completed, lefted 갯수 확인
  todos.map(function (item) {
    item.completed ? completedTodos++ : leftedTodos++;
  });
  leftNum.innerHTML = leftedTodos;
  completedNum.innerHTML = completedTodos;
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
  todos.forEach(function(item) {
    if (item.id == target) item.completed = !item.completed;
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

function activeBtnPills(btn) {
  for(var i = 0; i < navPill.length; i++) {
    navPill[i].className = '';
  }
  btn.classList += 'active';
}

// 전부 체크 함수
function toggleAllTodo (checkBoolean) {
  todos.forEach(function(item) {
    item.completed = checkBoolean;
  });
}

// completed 전부 삭제
function clearDoneTodo() {
  todos = todos.filter(function(item) {
    return item.completed === false;
  });
  if (todos.length === 0) completedNum.innerHTML = '0';
}
// 할일추가
inputbox.addEventListener('keyup', function(e) {
  if ( e.keyCode === 13 && this.value !== '' ) {
    addTodo(this.value);
    render(renderFilter);
    this.value = '';
  }
});

todo.addEventListener('click', function (e) {
  if (e.target.nodeName === 'LABEL') {
    check(e.target.getAttribute('for'));
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

// 필터 : 전체
btnViewAll.addEventListener('click', function (e) {
  activeBtnPills(e.target.parentNode);
  renderFilter = 'ViewAll';
  todo.classList = 'list-group';
  render(renderFilter);
});

// 필터 : Active
btnViewActive.addEventListener('click', function (e) {
  activeBtnPills(e.target.parentNode);
  renderFilter = 'ViewActive';
  todo.classList += ' ViewCompleted';
  if (todo.classList.contains('ViewCompleted')) {
    todo.classList = 'list-group ' + renderFilter;
  }
  render(renderFilter);
});

// 필터 : Completed
btnViewCompleted.addEventListener('click', function(e) {
  activeBtnPills(e.target.parentNode);
  renderFilter = 'ViewCompleted';
  todo.classList += ' ViewActive';
  if (todo.classList.contains('ViewActive')) {
    todo.classList = 'list-group ' + renderFilter;
  }
  render(renderFilter);
});

// 전부 체크 버튼
btncheckAll.addEventListener('click', function(e) {
  toggleAllTodo(e.target.checked);
  render(renderFilter);
});

// clear completed
clearCompleted.addEventListener('click', function() {
  clearDoneTodo();
  render(renderFilter);
});



window.addEventListener('load', function(){
  render(renderFilter);
});

