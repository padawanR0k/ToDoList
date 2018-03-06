// ENV
require('dotenv').config(); // dotenv 패키지 호출
// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express(); // express 인스턴스 객체 생성
const port = process.env.PORT || 4500; // 지정한 PORT읽어옴

// Static File Service
app.use(express.static('public')); // 정작파일을 위한 루트폴더 경로

// Body-parser 클라이언트가 보낸 페이로드를 리퀘스트객체에 담음
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Node의 native Promise 사용
mongoose.Promise = global.Promise;

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
// The `useMongoClient` option is no longer necessary in mongoose 5.x, please remove it.
mongoose.connect(process.env.MONGO_URI) // 설정한 URI를 불러옴
  // promise객체를 리턴
  // 성공시
  .then(() => console.log('Successfully connected to mongodb'))
  // 에러
  .catch(e => console.error(e));

// ROUTERS todos라는 요청이 들어오면 모두 /routes/todos에 보내서 처리한다.
app.use('/todos', require('./routes/todos'));

// app.get('/', (req, res) => res.send('Hello World!'));

// Create a model and insert a new doc
// const User = mongoose.model('User', new mongoose.Schema({ name: String }));
// User.create({ name: 'Lee' }).then(doc => console.log(doc));
// 서버를 기동시킴
app.listen(port, () => console.log(`Server listening on port ${port}`));
