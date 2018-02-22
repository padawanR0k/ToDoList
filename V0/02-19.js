var todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

// 1. todos의 각 요소 중, id 프로퍼티의 값만을 추출한 배열을 생성하는 함수를 작성하라.
// => [3, 2, 1]
function todosID () {
  return todos.map(function(item){
    return item.id;
  });
}
var todosIDs = todosID();
console.log('id값 추출');
console.log(todosIDs);
// 2. 1에서 생성한 배열의 최대값을 구하는 함수를 작성하라.
// => 3
function MaxId () {
  // return todosIDs.sort().pop(); 내가한 것
  return Math.max.apply(null, todosIDs);
}
console.log('제일 큰 요소');
console.log(MaxId());

// 3. todos에 선두에 새로운 요소로서 객체 { id: 4, content: 'Test', completed: false }를 추가하는 함수를 작성하라
// todos = [
//   { id: 4, content: 'Test', completed: false },
//   { id: 3, content: 'HTML', completed: false },
//   { id: 2, content: 'CSS', completed: true },
//   { id: 1, content: 'Javascript', completed: false }
// ];
function addNew(newTodo) {
  todos = [newTodo].concat(todos);
  return todos;
}
var newTodo = { id: 4, content: 'Test', completed: false };

var todos = addNew(newTodo);
console.log('요소추가');
console.log(todos);

// 4. todos에서 id가 4인 요소를 삭제하는 함수를 작성하라
// todos = [
//   { id: 3, content: 'HTML', completed: false },
//   { id: 2, content: 'CSS', completed: true },
//   { id: 1, content: 'Javascript', completed: false }
// ];
function Delete4(id) {
  return todos = todos.filter(function(item){
    return item.id !== id;
  });

}
console.log('삭제');
console.log(Delete4(4));
var asd =0 ;




// 5. todos에서 id가 3인 요소의 completed 프로퍼티 값을 반전하는 함수를 작성하라
// todos = [
//   { id: 3, content: 'HTML', completed: true },
//   { id: 2, content: 'CSS', completed: true },
//   { id: 1, content: 'Javascript', completed: false }
// ];

  // 내가 작성
  // todos.map(function(item, index, array) {
  //   if(item.id === 3)  return !(item.completed);
  // });
  // return todos;

  // 새로 작성

  todos = todos.map(function (todo) {
    return todo.id === 3 ?  Object.assign({}, todo, {completed: !todo.completed}) :  todo;
  });

console.log('반전');
console.log(todos);

// 6. todos에서 모든 요소의 completed 프로퍼티 값을 true로 설정하는 함수를 작성하라
// todos = [
//   { id: 3, content: 'HTML', completed: true },
//   { id: 2, content: 'CSS', completed: true },
//   { id: 1, content: 'Javascript', completed: true }
// ];
// 내 작성
// function allTrue() {
//   todos.map(function(item, index, array) {
//     item.completed = true;
//   });
//   return todos;
// }
  todos = todos.map(function (todo) {
    return Object.assign({},todo, {completed: true});
  });

console.log('all true');
console.log(todos);

// 7. todos에서 완료(completed: true)한 할일의 갯수를 구하는 함수를 작성하라

function howManyTure() {
  var num = 0;
  todos.map(function (item) {
    if (item.completed === true)  num++;
  });
  return num;
}
console.log('true 갯수');
console.log(howManyTure());