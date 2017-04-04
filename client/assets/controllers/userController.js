app.controller('userController', ['$scope', '$location', '$cookies', 'mainFactory', function($scope, $location, $cookies, mainFactory){
	// all $scope Variables //
	$scope.user = {};
	$scope.users = [];
	$scope.messages = [];
	// end of $scope variables //
	// controller functions //
	////// session validations //////
	function getLoggedInData(){
		if($cookies.userLoggedIn){
			mainFactory.getLoggedInUserAndProjects(function(data){
				console.log("************************ this is the data from the factory*****************", data)
				$scope.user = data.user
				$scope.projects = data.projects
			});
		} else {
			console.log('there is no user')
		}
	}
	function isloggedIn(){
		
		if($cookies.get('userLoggedIn') && $location.url() == '/'){
			console.log('user signed in. Going to homepage')
			$location.url('/homepage');
		}
	} 
	/// envoke session validations //////
	getLoggedInData();
	isloggedIn()
	//////// API call functons ///////
	$scope.registerUser = function(){
		console.log('made it to usercontroller register function')
		mainFactory.registerUser($scope.register, function(data){
			if(!data.messages){
				$scope.user = data.user
				$cookies.put('userLoggedIn', true);
				$location.url('/homepage')
			} else {
				$scope.messages = data.messages
			}
		})
	}
	$scope.loginUser = function(){
		console.log('made it to the controller login fucntion');
		mainFactory.loginUser($scope.login, function(data){
			if(data.messages){
				$scope.messages = data.messages
				$location.url('/');
			} else {
				$scope.user = data.user;
				$cookies.put('userLoggedIn', true);
				console.log($cookies.get('userLoggedIn'))
				$location.url('/homepage');
			}
		})
	}




}])