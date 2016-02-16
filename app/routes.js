var path = require('path');

// load the todo model
var Todo = require('./models/todo');

// expose routes to app with module.exports
module.exports = function (app) {
    //api =============================
    // get all todos
        app.get('/api/todos', function (req, res) {

            // use mongoose to get all todos in the database
            Todo.find(function (err, todos) {

                //if there is an error retrieving, send the error.
                if (err) res.send(err);

                res.json(todos); // return all todos as JSON
            });
        });

    // create todo and send back all todos after creation
        app.post('/api/todos', function (req, res) {
            console.log(req.body);
            //create a todo, information comes from AJAX request from Angular
            Todo.create({
                text: req.body.text,
                done:  false
            }, function (err, todo) {

                console.log(err, todo);
                if (err) {res.send(err)}

                // get and return all teh todos after you create another
                Todo.find(function (err, todos) {
                    if (err) res.send(err);

                    res.json(todos);
                })
            });
        });

    //delete a todo
        app.delete('/api/todos/:todo_id', function (req, res) {
            Todo.remove({
                _id: req.params.todo_id
            }, function (err, todo) {
                if (err) res.send(err);

                //get and return all the todos after delete
                Todo.find(function (err, todos) {
                    if (err) res.send(err);

                    res.json(todos);
                })
            });
        });

    // application ========================
        app.get('', function (req, res) {
            res.sendFile(path.join(__dirname, '../public', 'index.html')); //load the single view file (angular will handle the page changes on the frontend)
        });
};


