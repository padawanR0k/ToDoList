import axios from 'axios';

(function () {
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
  let state = 'viewAll';
  let allToggle = false;
  let todos = [];
  let filteredTodos = [];

  function render(filterd) {
    let html = '';
    if (!todos.length) {
      todo.innerHTML = '';
      return;
    }
    let completedTodos = 0;
    let leftedTodos = 0;
    filterd.forEach(item => {
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
    return todos.length ? Math.max.apply(null, todos.map(item => item.id)) + 1 : 1;
  }
  const getTodos = function () {
    axios.get('/todos')
      .then(({ data }) => {
        todos = data;
        filteredTodos = todos;
        if (state === 'ViewActive') {
          filteredTodos = todos.filter(item => item.completed === false);
        } else if (state === 'ViewCompleted') {
          filteredTodos = todos.filter(item => item.completed === true);
        } else if (state === 'viewAll') {
          filteredTodos = todos;
        }
        render(filteredTodos);
      })
      .catch(err => console.log(err.response));
  };

  const addTodo = function (content) {
    const newTodo = { id: generateNewID(), content, completed: false };
    axios.post('/todos', newTodo)
      .then(({ data }) => {

        todos = data;
        getTodos(state);
      })
      .catch(err => console.log(err.response));
  };
  const deleteTodo = function (id) {
    axios.delete(`/todos/id/${id}`)
      .then(() => {
        getTodos(state);
      })
      .catch(err => console.log(err));
  };


  // AddTodo
  inputbox.addEventListener('keyup', e => {
    if (e.keyCode === 13 && e.value !== '') {
      addTodo(e.target.value);
      getTodos(state);
      e.target.value = '';
    }
  });

  // Delete Todo
  todo.addEventListener('click', e => {
    if (e.target.nodeName === 'SPAN') {
      const dataId = e.target.getAttribute('data-id');
      deleteTodo(parseInt(dataId, 10));
      getTodos(state);
    }
  });

  const checkToggle = function (target, checkBoolean) {
    axios.patch(`/todos/id/${target}`, { completed: !checkBoolean })
      .then(() => {
        getTodos(state);
      })
      .catch(err => console.log(err));
  };

  // Check
  todo.addEventListener('click', e => {
    if (e.target.nodeName === 'LABEL') {
      const checkBoolean = e.target.children[0].checked;
      checkToggle(parseInt(e.target.getAttribute('for'), 10), checkBoolean);
      getTodos(state);
    }
  });
  const toggleAllTodo = function (toggleAll) {
    axios.patch('/todos', { completed: toggleAll })
      .then(() => {
        getTodos(state);
      })
      .catch(err => console.log(err));
  };
  btncheckAll.addEventListener('click', () => {
    allToggle = !allToggle;
    toggleAllTodo(allToggle);
    getTodos(state);
  });
  // clear completed

  const clearComplete = function () {
    axios.delete('/todos/completed')
      .then(() => getTodos(state))
      .catch(err => console.log(err));
  };

  clearCompleted.addEventListener('click', () => {
    clearComplete();
  });

  function activeBtnPills(btn) {
    for (let i = 0; i < navPill.length; i++) {
      navPill[i].className = '';
    }
    btn.classList += 'active';
  }

  // 필터 : All
  btnViewAll.addEventListener('click', e => {
    activeBtnPills(e.target.parentNode);
    state = 'viewAll';
    getTodos(state);
  });

  // 필터 : Active
  btnViewActive.addEventListener('click', e => {
    activeBtnPills(e.target.parentNode);
    state = 'ViewActive';
    if (todo.classList.contains('ViewCompleted')) {
      todo.classList = `list-group ${state}`;
    }
    getTodos(state);
  });


  // 필터 : Completed
  btnViewCompleted.addEventListener('click', e => {
    activeBtnPills(e.target.parentNode);
    state = 'ViewCompleted';
    if (todo.classList.contains('ViewActive')) {
      todo.classList = `list-group ${state}`;
    }
    getTodos(state);
  });

  window.addEventListener('load', () => getTodos(state));
}(axios));
