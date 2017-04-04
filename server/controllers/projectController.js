var mongoose = require('mongoose');
var Project = mongoose.model('Project');
var Task = mongoose.model('Task');
var session = require('cookie-session')
module.exports = {
	index: function(req, res){
		Project.find({owner: req.session.userID }).populate('tasks').exec(function(err, projects){
			if(err){
				console.log(err);
			} else {
				console.log('found projects')
				res.json({projects: projects})
			}
		})
	},
	logout: function(req, res){
		console.log('made it to logout function in server controller');
		req.session = null
		res.json({message: "you successfully logged out"})
	},
	createProject: function(req, res){
		console.log('ran the create project route')
		var data = req.body
		var newProject = new Project({name: data.name, owner: req.session.userID});
		newProject.save(function(err){
			if(err){
				console.log('unable to create new project');
				console.log(err);
				res.json({messages: ['unable to create a new project']})
			} else {
				console.log('successfully created a new project');
				console.log(newProject._id)
				req.session.currentProjectID = newProject._id
				console.log('this is the session project ID', req.session.currentProjectID)
				res.json({project: newProject, messages: ["success"]});
			}
		})
	},

	// everything under this line has not been modified for this app //////////
	getCurrentProject: function(req, res){
		Project.findOne({projectID: req.session.currentProjectID}).populate('tasks').exec(function(err, project){
			if(err){
				console.log(err);
			} else {
				console.log('found the project');
				res.json({project: project})
			}
		})
	},

	update: function(req, res){

	},
	delete: function(req, res){

	},
	findProject: function(req, res){
		Project.findOne({_id: req.params.projectID}).populate('tasks').exec(function(err, project){
			if(err){
				console.log(err);
			} else {
				console.log('found the project');
				res.json({project: project})
			}
		})
	},

	// will need to put in a validation function that checks wether the current logged in user 
	// is either the owner or a collaborator of the project

	createTask: function(req, res){
		var data = req.body
		var newTask = new Task({name: data.name, description: data.description, dueDate: data.dueDate, status: data.status})
		newTask.save(function(err){
			if(err){
				console.log(err)
			} else {
				console.log("able to successfully create a task");
				Project.findOne({_id: req.params.id}, function(err, project){
					project.tasks.push(newTask._id);
					project.save(function(err){
						if(err){
							console.log('unable to add newtask to projects tasks array');
						} else {
							console.log('added task to project')
							res.json({project: project})
						}
					})
				})
			}
		})
	},
	findTask: function(req, res){
		Task.findOne({id: req.params.taskId}, function(err, task){
			if(err){
				console.log(err)
			} else {
				console.log('found task')
				res.json({task: task})
			}
		})
	}
}
