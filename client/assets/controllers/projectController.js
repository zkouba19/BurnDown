app.controller('projectController', ['$scope', '$location', '$cookies', 'mainFactory', function($scope, $location, $cookies, mainFactory){
	$scope.projects = mainFactory.projects;
	$scope.project = mainFactory.project;
	$scope.users = mainFactory.users;
	$scope.user = mainFactory.user;
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
			});
		}
		if($cookies.get('CurrentProject')){
			mainFactory.getCurrentProject(function(data){
				$scope.project = data.project
				console.log('*********currentProject*********')
				console.log(data)
				console.log('******************')
			})
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
			$location.url('/projects/'+data.project._id);
		})
	}
	$scope.logout = function(){
		console.log('ran logout in controller')
		$cookies.remove('CurrentProject')
		$cookies.remove('userLoggedIn')
		mainFactory.logout(function(){
			console.log('made it to callback in controller')
			$location.url('/');
		})
	}

}])
