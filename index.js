const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var todos = [
      {content: 'Đi học'},
      {content: 'Nấu cơm'},
      {content: 'Rửa bát'},
      {content: 'Học code tại CodersX'}
    ];

app.get('/todos', function(req, res) {
	res.render('todos/index', {
		todos: todos
	});
});

app.get('/todos/search', function(req, res)  {
	var q = req.query.q;
	var matchedTodos = todos;
	if (q) {
		matchedTodos = todos.filter(function(todo) {
			return todo.content.toLowerCase().indexOf(q.toLowerCase()) !== -1;
		});
	}
	
	res.render('todos/index', {
		todos: matchedTodos,
		q: q
	});
});

app.get('/todos/create', function(req, res) {
	res.render('todos/create');
});

app.post('/todos/create', function(req, res) {
	todos.push(req.body);
	res.redirect('/todos');
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
