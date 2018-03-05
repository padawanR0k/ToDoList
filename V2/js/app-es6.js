const todo = document.getElementById('todo-list');
const inputbox = document.getElementById('input-todo');
const btnViewAll = document.getElementById('all');
const btnViewActive = document.getElementById('active');
const btnViewCompleted = document.getElementById('completed');
const navPill = document.querySelectorAll('.nav-pills li');
const btncheckAll = document.getElementById('chk-allComplete');
const leftNum = document.getElementById('activeTodos');
const completedNum = document.getElementById('completedTodos');
const clearCompleted = document.getElementById('btn-removeCompletedTodos');

let renderFilter = 'viewAll';
let todos = [];

// XMLHttpRequest 객체의 생성
const req = new XMLHttpRequest();

// 비동기 방식으로 Request를 오픈한다
req.open('GET', '/webserver-express/public/data.json');
// Request를 전송한다
req.send();

req.onreadystatechange = () => {
  // 서버 응답 완료 && 정상 응답
  if (req.readyState === XMLHttpRequest.DONE) {
    if (req.status === 200) {
      todos = JSON.parse(req.responseText);
    }
  }
};


function render(filter) {
  let html = '';
  let filteredTodos = [];

  if (!todos.length) {
    todo.innerHTML = '';
    return;
  }

  if (filter === 'ViewActive') {
    filteredTodos = todos.filter(item => item.completed === false);
  } else if (filter === 'ViewCompleted') {
    filteredTodos = todos.filter(item => item.completed === true);
  } else if (filter === 'viewAll') {
    filteredTodos = todos;
  }
  let completedTodos = 0;
  let leftedTodos = 0;
  filteredTodos.forEach((item) => {
    const dataID = item.id;
    const TODOcontents = item.content;
    const checked = item.completed ? 'checked' : '';
    // completed, lefted 갯수 확인
    html += `<li class="list-group-item">
              <div class="hover-anchor">
                <a class="hover-action text-muted">
                  <span class="glyphicon glyphicon-remove-circle pull-right" data-id="${dataID}"></span>
                </a>
                <label class="i-checks" for="${dataID}">
                  <input type="checkbox" class="checkBox" id="${dataID}" ${checked}><i></i>
                  <span>${TODOcontents}</span>
                </label>
              </div>
            </li>`;
    if (item.completed) {
      completedTodos += 1;
    } else {
      leftedTodos += 1;
    }
  });
  leftNum.innerHTML = leftedTodos;
  completedNum.innerHTML = completedTodos;
  todo.innerHTML = html;
}

function generateNewID() {
  return Math.max.apply(null, todos.map(item => item.id));
}
function addTodo(inputValue) {
  const newID = generateNewID() + 1;
  todos = todos.concat([{ id: newID, content: inputValue, completed: false }]);
}


function check(target) {
  todos.forEach((item) => {
    if (item.id === target + 0) item.completed = !item.completed;
  });
}


function deletTodo(deletedataId) {
  todos = todos.filter(item => item.id !== deletedataId);
}

function activeBtnPills(btn) {
  for (let i = 0; i < navPill.length; i++) {
    navPill[i].className = '';
  }
  btn.classList += 'active';
}

// 전부 체크 함수
function toggleAllTodo(checkBoolean) {
  todos.forEach((item) => {
    item.completed = checkBoolean;
  });
}

// completed 전부 삭제
function clearDoneTodo() {
  todos = todos.filter(item => item.completed === false);
  if (todos.length === 0) completedNum.innerHTML = '0';
}
// 할일추가
inputbox.addEventListener('keyup', (e) => {
  if (e.keyCode === 13 && this.value !== '') {
    addTodo(e.target.value);
    render(renderFilter);
    e.target.value = '';
  }
});

todo.addEventListener('click', (e) => {
  if (e.target.nodeName === 'LABEL') {
    check(parseInt(e.target.getAttribute('for')));
    if (todo.classList.length !== 1) {
      render(todo.classList[1]);
    } else {
      render('viewAll');
    }
  }
});

todo.addEventListener('click', (e) => {
  if (e.target.nodeName === 'SPAN') {
    const dataId = e.target.getAttribute('data-id');
    deletTodo(parseInt(dataId));
    render(renderFilter);
  }
});

// 필터 : 전체
btnViewAll.addEventListener('click', (e) => {
  activeBtnPills(e.target.parentNode);
  renderFilter = 'viewAll';
  todo.classList = 'list-group';
  render(renderFilter);
});

// 필터 : Active
btnViewActive.addEventListener('click', (e) => {
  activeBtnPills(e.target.parentNode);
  renderFilter = 'ViewActive';
  todo.classList += ' ViewCompleted';
  if (todo.classList.contains('ViewCompleted')) {
    todo.classList = `list-group ${renderFilter}`;
  }
  render(renderFilter);
});

// 필터 : Completed
btnViewCompleted.addEventListener('click', (e) => {
  activeBtnPills(e.target.parentNode);
  renderFilter = 'ViewCompleted';
  todo.classList += ' ViewActive';
  if (todo.classList.contains('ViewActive')) {
    todo.classList = `list-group ${renderFilter}`;
  }
  render(renderFilter);
});

// 전부 체크 버튼
btncheckAll.addEventListener('click', (e) => {
  toggleAllTodo(e.target.checked);
  render(renderFilter);
});

// clear completed
clearCompleted.addEventListener('click', () => {
  clearDoneTodo();
  render(renderFilter);
});

window.addEventListener('load', () => {
  render(renderFilter);
});

