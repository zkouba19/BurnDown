console.log('made it to the routes');
var UserController = require('./../controllers/userController.js');
var ProjectController = require('./../controllers/projectController.js');
var session = require('cookie-session');
require('dotenv').load();
var secretKey = process.env.SECRET_KEY;
module.exports = function(app){


//////////// valid user / authentication  functions /////////////
	function loginRequired(req, res, next){
		if(!req.session.userID){
			console.log('no session created')
			return
		} else {
			next();
		}
	}

	function ensureCorrectUser(req, res, next){
		if(req.params.userID !== req.session.userID){
			return;
		} else {
			next();
		}
	}

	function ensureCorrectProject(req, res, next){
		if(req.params.projectID !== req.session.currentProjectID){
			return;
		} else {
			next();
		}
	}
//////////////////////////////////////////////////////////////////
	app.use(session({
		secret: "secretKey"
	}))

	app.post('/register', function(req, res){
		console.log('made it to server /register');
		UserController.register(req, res);
	});

	app.post('/login', function(req, res){
		console.log('made it to server /login');
		UserController.login(req, res);
	});

	app.get('/logout', function(req, res){
		console.log('made it to logout route')
		ProjectController.logout(req, res);
		console.log('this is session after clearing', req.session)
	})

	app.get('/user', loginRequired, function(req, res){
		console.log("made it to /user route in server", req.session)
		UserController.index(req, res);
	})

	app.get('/projects', loginRequired, function(req, res){
		console.log('made it to server /projects get route');
		ProjectController.index(req, res);
	})

	app.post('/projects', loginRequired, function(req, res){
		console.log('made it to the server /projects post route');
		ProjectController.createProject(req, res);
	})
	 app.get('/projects/:projectID', loginRequired, function(req, res){
	 	console.log('made it to the /project/:id get route')
	 	ProjectController.findProject(req, res);
	 })

	 app.get('/currentProject', loginRequired, function(req, res){
	 	console.log('making it to currentproject route.')
	 	ProjectController.getCurrentProject(req, res)
	 })

	 app.post('/projects/:projectID/task', loginRequired, ensureCorrectProject, function(req, res){
	 	console.log('made it to create task route')
	 	ProjectController.createTask(req, res);
	 })

	 app.post('/projects/:projectID/task/:taskID', loginRequired, ensureCorrectProject, function(req, res){
	 	console.log('made it to create task route')
	 	ProjectController.editTask(req, res);
	 })





}	