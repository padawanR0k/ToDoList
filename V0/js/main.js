var todo = document.getElementById('todo-list');
var inputbox = document.getElementById('input-todo');
var selectAll = document.getElementById('Btn_select-All');
var someDelete = document.getElementById('Btn_select-Delete');
var todos = [];

// html을 그려주는 코드로 todos 추가,삭제시 매번 실행할 함수
function Repaint(e) {
  var html = '';
  return todos.map(function(item) {
    var completedChk = item.completed ? 'checked' : '';
    html += '<li class="todolist" value="' ;
    html += item.id ;
    html += '"><input type="checkbox" class="checkBox" ';
    html += completedChk;
    html += '>' ;
    html += '<span class="todoText" contenteditable="true">';
    html += item.content;
    html += '</span>';
    html += '<button class="BtnTodo-Delete" type="button">❌</button>';
    html += '</li>';
    todo.innerHTML = html;
  });
}

function selectAlltodo() {
  todos.forEach(function(item) {
    item.completed = true;
  });
}

function deleteSelected() {
  todos = todos.filter(function(item) {
    return item.completed !== true;
  });
}

function edit(target) {
  target.contentEditable = true;
}

function editCompleted(editTarget) {
  editTarget.contentEditable = 'false';
  todos.forEach(function(item) {
    if (e.target.parentNode.value === item.id) item.content = editTarget.innerText;
  });
  editTarget.contentEditable = true;
}


// todos 요소 추가
inputbox.addEventListener('keyup', function(e) {
  var Addtodo = this.value;
  if (e.keyCode === 13 && Addtodo !== '') {
    var thisId = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;
    var thisCompleted = false;
    todos = todos.concat([
      { id: thisId, content: Addtodo, completed: thisCompleted }
    ]);
    Repaint(e);
    this.value = '';
  }
});

function btnTodo(todo) {
  todos = todos.filter(function(item) {
    return item.id !== todo.parentNode.value;
  });
}

function checkTodo(todo) {
  todos.forEach(function(item) {
    if (item.id === todo.parentNode.value) item.completed = !item.completed;
  });
}

// todos 자식들 이벤트
todo.addEventListener('click', function(e) {
  var checkBox = e.target.children;
  // 삭제버튼?
  if (e.target.nodeName === 'BUTTON') {
    btnTodo(e.target);
    Repaint(e);
  } else if (e.target.nodeName === 'INPUT') {
    // 체크박스
    checkTodo(e.target);
    Repaint(e);
  } else if (e.target.nodeName === 'SPAN') {
    edit(e.target);
  }
});



// todo 수정할때 이벤트리스너
todo.addEventListener('keypress', function(e) {
  if (e.keyCode === 13 && e.target.innerText !== '') {
    editCompleted(e.target);
  }
});


// selectAll
selectAll.addEventListener('click', function(e) {
  selectAlltodo();
  Repaint(e);
});

// 선택리스트삭제
someDelete.addEventListener('click', function(e) {
  deleteSelected();
  Repaint(e);
});

window.addEventListener('load', function(e) {
  todos = [
    { id: 1, content: 'Javascript', completed: false },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'HTML', completed: false }
  ];
  Repaint(e);
});
