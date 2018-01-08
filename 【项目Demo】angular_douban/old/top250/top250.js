(function(angular) {

angular
	.module('moviecat.top250', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		
		// :page? 用来表示当前页码，并且这个参数是可选的！！！
		$routeProvider.when('/top250/:page?', {
			templateUrl: './top250/view.html',
			controller: 'Top250Controller'
		});
		
	}])
	.controller('Top250Controller', ['$scope', '$routeParams' ,'$route' ,  'JSONPSrv', function($scope, $routeParams, $route, JSONPSrv){
		// 通过 $routeParams.page 获取到当前页
		// console.log($routeParams.page)

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
			// 只要路由地址，发生了变化，路由的机制：
			// 	重新执行 contorller 中的代码！！！
			$route.updateParams({page: curPage});
		};

		
		JSONPSrv.jsonp('https://api.douban.com/v2/movie/top250', {
			start: start,
			count: COUNT
		}, function( data ) {
			console.log( data );
			$scope.movieData = data;

			$scope.pageCount = Math.ceil(data.total / COUNT);
			
			// 手动触发angualr中的脏检查机制，这样，才会将 $scope 中值的变化通过双向绑定机制
			// 渲染到页面中！！！
			$scope.$apply();
		});


	}]);

})(angular);