app.factory('mainFactory', ['$http', function($http){
	var factory = {};
	console.log('made it to the factory');
	factory.user = {};
	factory.users = [];
	factory.project = {};
	factory.projects = [];
	console.log('kept it going')
	factory.registerUser = function(formData, callback){
		console.log('made it to factory.register')
		$http.post('/register', formData).then(function(returned_data){
			if(typeof(callback) == 'function'){
				factory.user = returned_data.data.user
				callback(returned_data.data)
			}
		})
	};

	factory.loginUser = function(formData, callback){
		console.log('made it to factory.login');
		$http.post('/login', formData).then(function(returned_data){
			if(typeof(callback) == 'function'){
				factory.user = returned_data.data.user
				callback(returned_data.data);
			}
		})
	};

	factory.getLoggedInUserAndProjects = function(callback){
		$http.get('/user').then(function(returned_data){
			console.log('this is the user from persistence', returned_data.data.user)
			factory.user = returned_data.data.user
		});
		$http.get('/projects').then(function(returned_data){
			console.log('this is the project from persistence', returned_data.data.projects)
			factory.projects = returned_data.data.projects
			if(typeof(callback) == 'function'){
				callback({user: factory.user, projects: factory.projects})
			}
		})
	};

	factory.getCurrentProject = function(callback){
		$http.get('/currentProject')
	}

	factory.newProject = function(projectInfo, callback){
		$http.post('/projects', projectInfo).then(function(returned_data){
			console.log('this is projects returned_data', returned_data.data);
			factory.project = returned_data.data.project
			factory.projects.push(returned_data.data.project)
			if(typeof(callback) == "function"){
				callback(returned_data.data)
			}
		})
	}

	factory.goToProject = function(projectID, callback){
		$http.get('/projects/'+projectID).then(function(returned_data){
			factory.project = returned_data.data.project
			if(typeof(callback) == "function"){
				callback(returned_data.data)
			}
		})
	}
	factory.logout = function(callback){
		console.log('ran logout in factory')
		$http.get('/logout').then(function(returned_data){
			console.log('made it to callback in factory')
			factory.user = {};
			factory.users = [];
			factory.project = {};
			factory.projects = [];
			if(typeof(callback) == "function"){
				callback();
			}
		})
	}


	return factory
}])





