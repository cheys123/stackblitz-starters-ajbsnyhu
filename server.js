const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Sample Data
let users = [
  { id: 1, name: 'Carmela', email: 'mela@gmail.com', age: 25, salary: 25000 },
  { id: 2, name: 'Joseph', email: 'joe@yahoo.com', age: 30, salary: 45000 },
  { id: 3, name: 'James', email: 'james@msn.com', age: 35, salary: 30000 },
  { id: 4, name: 'John', email: 'john@gmail.com', age: 40, salary: 25000 },
  { id: 5, name: 'Frank', email: 'frank@yahoo.com', age: 45, salary: 45000 },
  { id: 6, name: 'Alex', email: 'alex@msn.com', age: 21, salary: 33000 },
];


app.get('/', (req, res) => {
  res.send({
    message: 'Available Routes',
    routes: [
      'GET /api/users',
      'GET /api/users/:id',
      'POST /api/users',
      'DELETE /api/delete/:id',
    ],
  });
});

app.get('/api/users', (req, res) => {
  res.json(users);
});


app.get('/api/users/:id', (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});


app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    salary: req.body.salary,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.delete('/api/delete/:id', (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('User not found');

  const deletedUser = users.splice(userIndex, 1);
  res.json(deletedUser);
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
