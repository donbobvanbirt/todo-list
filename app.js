const PORT = 8000;

const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')

const Todos = require('./models/todo');

const app = express();

//  APP MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// ROUTES
// GET /
// app.get('/', (req, res) => {
//   let obj = {
//     message: 'Hello world!'
//   };
//   res.send(obj);
// });

app.get('/todos', (req, res) => {
  let { complete } = req.query;
  console.log('complete:', complete);

  if(complete === 'true') {
    Todos.getComplete((err, compList) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send(compList);
    })
  } else if(complete === 'false') {
    Todos.getIncomplete((err, compList) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send(compList);
    })
  } else {

    Todos.getAll((err, list) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send(list);

    });
  }

})



// app.get('/todos/:id', (req, res) => {
//
//   console.log('req.params.id:', req.params.id);
//   console.log('req.query:', req.query);
//
//   res.send(req.params.id);
// })

// POST
app.post('/todos', (req, res) => {
  console.log('req.body:', req.body)  // points to bodyParser

  Todos.create(req.body, err => {
    if(err) return res.status(400).send(err);

    res.send();
  });
  res.send('task added');
})

// TOGGLE
app.put('/todos/:id', (req, res) => {
  Todos.toggle(req.params.id, err => {
    if(err) return res.status(400).send(err);
    res.send('task updated');
  })
})

// DETETE
app.delete('/todos/:id', (req, res) => {
  let { id } = req.params;
  console.log('req.params.id', id);

  if(id === "complete") {
    Todos.removeComplete(err => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send('Completed tasks deleted');
    })
  } else {
    Todos.remove(req.params.id, err => {
      if(err) return res.status(400).send(err);
      res.send('task deleted');
    })
  }
})

// app.delete('todos/complete', (req, res) => {
//
//   Todos.removeComplete((err, tasks) => {
//     if(err) {
//       return res.status(400).send(err);
//     }
//     res.send('Completed tasks deleted');
//   })
//
// })




app.listen(PORT, err => {
  console.log(err || `Express listening on port ${PORT}`);
});
