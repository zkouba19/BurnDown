app.controller('projectController', ['$scope', '$route', '$location', '$cookies', 'mainFactory', function($scope, $route, $location, $cookies, mainFactory){
	$scope.projects = mainFactory.projects;
	$scope.project = mainFactory.project;
	$scope.users = mainFactory.users;
	$scope.user = mainFactory.user;
	$scope.editTaskInfo = {};
	console.log($location)

	function getData(){
		console.log('running get data', $cookies.get('userLoggedIn'));
		if($cookies.get('userLoggedIn')){
			console.log('ran the first if statement' )
			mainFactory.getLoggedInUserAndProjects(function(data){
				$scope.user = data.user
				$scope.projects = data.projects
				console.log('**********current user and project********')
				console.log(data)
				console.log('******************')
				console.log($scope.user)
				if($cookies.get('CurrentProject')){
					console.log('made it to current porject cookie if statement')
					mainFactory.getCurrentProject(function(data){
					console.log('this is the data coming back ', data)
					$scope.project = data.project
					console.log('*********currentProject*********')
					console.log($scope.project)
					console.log('******************')
			})
		}
			});
		}
	}
	getData();

	function isLoggedIn(){
		if($cookies.get('userLoggedIn')){
			return
		} else {
			$location.url('/')
		}
	}
	isLoggedIn();

	$scope.logout = function(){
		console.log('ran logout in controller')
		$cookies.remove('CurrentProject')
		$cookies.remove('userLoggedIn')
		mainFactory.logout(function(){
			console.log('made it to callback in controller')
			$location.url('/');
		})
	}

	$scope.newProject = function(){
		mainFactory.newProject($scope.newProjectInfo,  function(data){
			$scope.project = data.project
			$cookies.put('CurrentProject', true);
			console.log("this is the project we just created", data)
			$location.url('/projects/'+data.project._id);
		})
	}

	$scope.goToProject = function(projectID){
		mainFactory.goToProject(projectID, function(data){
			$scope.project = data.project
			$cookies.put('CurrentProject', true);
			console.log('we just got the poject', $scope.project);
			$location.url('/projects/'+data.project._id);
		})
	}

	$scope.createTask = function(projectID){
		console.log('ran create task function in conroller');
		mainFactory.createTask($scope.newTaskInfo, projectID, function(data){
			console.log('made it back from the server')
			$scope.newTaskInfo = {};
			$location.url('/projects/'+$scope.project._id);
		})
	}

	$scope.getTask = function(taskID){
		console.log('made it to get task func')
		for(var i = 0; i < $scope.project.tasks.length; i++){
			if(taskID === $scope.project.tasks[i]._id){
				$scope.editTaskInfo = $scope.project.tasks[i]
				console.log($scope.editTaskInfo)
			}
		}
	}

	$scope.editTask = function(){
		mainFactory.editTask($scope.project._id, $scope.editTaskInfo, function(data){
			console.log('************** project after task edit **********', data.task)
			$scope.editTaskInfo = data.task;
			
		})
	}

}])
