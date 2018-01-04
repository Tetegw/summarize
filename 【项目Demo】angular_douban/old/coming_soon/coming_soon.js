(function(angular) {

angular
	.module('moviecat.coming_soon', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		
		// :page? 用来表示当前页码，并且这个参数是可选的！！！
		$routeProvider.when('/coming_soon/:page?', {
			templateUrl: './coming_soon/view.html',
			controller: 'ComingSoonController'
		});

	}])
	.controller('ComingSoonController', ['$scope', '$routeParams' ,'$route' ,  'JSONPSrv', function($scope, $routeParams, $route, JSONPSrv){
		// 通过 $routeParams.page 获取到当前页

		var curPage = $routeParams.page || '1';
		var COUNT = 5;
		var start = (curPage - 1) * COUNT;
		
		// 暴露给视图进行展示
		$scope.curPage = curPage;
		
		$scope.goPage = function( curPage ) {
			// 如果页码不符合要求，就不更新 路由参数
			if(curPage < 1 || curPage > $scope.pageCount) {
				return;
			}

			// 作用：用来更新路由参数！只能更新路由规则中指定的参数
			$route.updateParams({page: curPage});
		};
		
		JSONPSrv.jsonp('https://api.douban.com/v2/movie/coming_soon', {
			start: start,
			count: COUNT
		}, function( data ) {
			console.log( data );
			$scope.movieData = data;

			$scope.pageCount = Math.ceil(data.total / COUNT);
			
			$scope.$apply();
		});
	}]);

})(angular);