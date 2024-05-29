// backend/server.js

/*
const express = require('express');
const app = express();
const port = 8080;
let data = []

app.get('/', (req, res) => {
  res.send(data);
});

app.get('/iampost', (req, res) => {
  data.push(req.query.payload)
  console.log('req.query.payload: ', req.query.payload)
  console.log('data: ', data)
  res.send(data);
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
*/

const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

let todos = [];

// 取得所有 Todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// 創建新的 Todo
app.post('/todos', (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// 更新指定的 Todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedTodo = req.body;
  todos[id] = updatedTodo;
  res.json(updatedTodo);
});

// 刪除指定的 Todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos.splice(id, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
