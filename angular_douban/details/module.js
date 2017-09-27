(function(angular) {

angular
	.module('moviecat.details', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		
		$routeProvider.when('/subject/:id', {
			templateUrl: './details/view.html',
			controller: 'DetailsController'
		})

	}])
	.controller('DetailsController', ['$scope', '$routeParams', 'JSONPSrv', function($scope, $routeParams, JSONPSrv){

		$scope.isShow = true;
		
		JSONPSrv.jsonp('https://api.douban.com/v2/movie/subject/' + $routeParams.id, 
			{}, function( data ) {
				console.log( data );

				$scope.details = data;
				$scope.isShow = false;

				$scope.$apply();
			});

	}]);

})(angular);