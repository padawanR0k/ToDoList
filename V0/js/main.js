var todo = document.getElementById('todo-list');
var inputbox = document.getElementById('input-todo');
var selectAll = document.getElementById('Btn_select-All');
var someDelete = document.getElementById('Btn_select-Delete');
var todos = [];

// html을 그려주는 코드로 todos 추가,삭제시 매번 실행할 함수
function Repaint(e) {
  todo.innerHTML = '';
  return todos.map(function(item) {
    var completedChk = item.completed ? 'checked' : '';
    todo.innerHTML +=
      '<li class="todolist" value="' +
      item.id +
      '"><input type="checkbox" class="checkBox" ' +
      completedChk +
      '>' +
      '<span class="todoText" contenteditable="true">' +
      item.content +
      '</span>' +
      '<button class="BtnTodo-Delete" type="button">❌</button></li>';
  });
}

window.addEventListener('load', function(e) {
  todos = [
    { id: 1, content: 'Javascript', completed: false },
    { id: 2, content: 'CSS', completed: false },
    { id: 3, content: 'HTML', completed: false }
  ];
  Repaint(e);
});

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

// todos 자식들 이벤트
todo.addEventListener('click', function(e) {
  var checkBox = e.target.children;
  if (e.target.nodeName === 'BUTTON') {
    todos = todos.filter(function(item) {
      return item.id !== e.target.parentNode.value;
    });
    Repaint(e);
  } else if (e.target.nodeName === 'INPUT') {
    todos.forEach(function(item) {
      if (item.id === e.target.parentNode.value)
        item.completed = !item.completed;
    });
    Repaint(e);
  } else if (e.target.nodeName === 'SPAN') {
    edit(e.target);
  }
});

function edit(target) {
  target.contentEditable = true;
}
// todo 수정할때 이벤트리스너
todo.addEventListener('keypress', function(e) {
  if (e.keyCode === 13 && e.target.innerText !== '') {
    e.target.contentEditable = 'false';
    todos.forEach(function(item) {
      if (e.target.parentNode.value === item.id)
        item.content = e.target.innerText;
    });
    e.target.contentEditable = 'true';
  }
  console.log(todos);
});

// selectAll
selectAll.addEventListener('click', function(e) {
  todos.forEach(function(item) {
    item.completed = true;
  });
  Repaint(e);
});

// 선택리스트삭제
someDelete.addEventListener('click', function(e) {
  todos = todos.filter(function(item) {
    return item.completed !== true;
  });
  Repaint(e);
});