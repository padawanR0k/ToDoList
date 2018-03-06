const router = require('express').Router();
const Todo = require('../models/todo');

// Find All
router.get('/', (req, res) => {
// 서버에서 todos/ 지정했기때문에 여기서 '/' 는 루트폴더가아니라 todos폴더이다
  Todo.findAll() // 프로미스
    .then(todos => {
      // if (!todos.length) return res.status(404).send({ err: 'Todo not found' });
      res.send(todos); // 가져온 모든 todos 클라이언트에게 전송
    })
    .catch(err => res.status(500).send(err));
});

// Find One by id
// router.get('/id/:id', (req, res) => {
//   Todo.findOneByTodoid(req.params.id)
//     .then(todo => {
//       if (!todo) return res.status(404).send({ err: 'Todo not found' });
//       res.send(todo);
//     })
//     .catch(err => res.status(500).send(err));
// });

// Create new todo document
router.post('/', (req, res) => { // create 호출
  Todo.create(req.body) // req의 바디를 보고 생성
    .then(todo => res.send(todo)) // 성공시 todo로
    .catch(err => res.status(500).send(err));
});

// Create dummy todo document
router.get('/dummy', (req, res) => {
  const todos = [
    { id: 3, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 1, content: 'Javascript', completed: false }
  ];

  Todo.create(todos[0])
    .then(() => Todo.create(todos[1]))
    .then(() => Todo.create(todos[2]))
    .then(() => res.send(todos))
    .catch(err => res.status(500).send(err));
});

// Update All
router.patch('/', (req, res) => {
  Todo.updateAll(req.body) // 페이로드는 req.body = completed true를 가지고있는 객체
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

// Update by id
router.patch('/id/:id', (req, res) => {
  Todo.updateByTodoid(req.params.id, req.body)
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

// Delete All
// router.delete('/', (req, res) => {
//   Todo.deleteAll()
//     .then(() => res.sendStatus(200))
//     .catch(err => res.status(500).send(err));
// });

// Delete by id
router.delete('/id/:id', (req, res) => {
  Todo.deleteByTodoid(req.params.id) // 파라미터의 id를 deleteByTodoid함수 실행
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

// Delete by completed
router.delete('/completed', (req, res) => {
  Todo.deleteByCompleted()
    .then(() => res.sendStatus(200))
    .catch(err => res.status(500).send(err));
});

module.exports = router;
