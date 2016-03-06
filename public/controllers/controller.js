var myApp = angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',
	function($scope, $http){

		//Refreshes the contact UI to correctly represent in the information in the database.
		//This is called whenever an operation is done that changes the data in the database.
		var refresh = function(){
			$http.get("/contactlist").success(function(response){
				$scope.contactlist = response;
				
			});
		};

		setInterval(function(){
			refresh();
		},1000);
		

		//Sends a post request to the database when the user adds a contact.
		$scope.addContact = function(){
			console.log($scope.task);

			$http.post('/addToArray', $scope.task).success(function(response){
				refresh();
			});

		};

		

}]);
