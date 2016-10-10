const PORT = 8000;

const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')

const Todos = require('./models/todo');

const app = express();

//  APP MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // extended will allow different types of objects



// ROUTES
  // GET /
// app.get('/', (req, res) => {
//   let obj = {
//     message: 'Hello world!'
//   };
//   res.send(obj);
// });

app.get('/todos', (req, res) => {

  Todos.getAll((err, list) => {
    if(err) {
      return res.status(400).send(err);
    }
    res.send(list);

  });

})



// using url params. id is dynamic portion
app.get('/todos/:id', (req, res) => {

  console.log('req.params.id:', req.params.id);
  console.log('req.query:', req.query);

  res.send(req.params.id);
})

  // POST
app.post('/todos', (req, res) => {
  console.log('req.body:', req.body)  // points to bodyParser

  Todos.create(req.body, err => {
    if(err) return res.status(400).send(err);

    res.send();
  });
  res.send('task added');
})

// DETETE
app.delete('/todos/:id', (req, res) => {
  console.log('req.params.id', req.params.id);

  Todos.remove(req.params.id, err => {
    if(err) return res.status(400).send(err);
    res.send('task deleted');
  })
})




app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
