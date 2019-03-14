var express = require('express');
var router = express.Router();
var Todo = require('./Todo');//get Instance with path and alias

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//Create
router.post('/create', function (req, res, next) {
  var todo = new Todo(req.body);
  try{
    todo.save();
    res.status(200).json({"message": "Todo successfully added"});
  }catch (e) {
    res.status(400).send("Error when saving to database");
  }
});

//Read(all)
router.get('/todos', function (req, res, next) {
  Todo.find(function (err, todos) {
    if(err) return res.status(400).send("Error when saving to database");
    res.json(todos);
  });
});

//Read(id)
router.get('/todos/:id', function (req, res, next) {
  var id = req.params.id;
  Todo.findById(id, function (err, todo) {
    if(err) return res.status(400).send("Error when saving to database");
    res.json(todo);
  });
});

//Update
router.put('/todos/:id', function (req, res, next) {
  Todo.findById(req.params.id, function (err, todo) {
    if(!todo)
      return next(new Error('Error when saving to database'));
    else{
      todo.name = req.body.name;

      try{
        todo.save();
        res.json('Todo updated successfully');
      }catch (e) {
        res.status(400).send("Error when updating the todo");
      }
    }
  })
});

//Delete
router.delete('/todos/:id', function (req, res, next) {
  Todo.findByIdAndRemove(req.params.id, function (err, todo) {
    if(err) res.json(err);
    else res.json('Todo successfully removed');
  });
});



module.exports = router;
