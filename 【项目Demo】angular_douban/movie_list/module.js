(function(angular) {

angular
	.module('moviecat.movie_list', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {

		// :page? 用来表示当前页码，并且这个参数是可选的！！！
		// :movieType 能够匹配：
		// /top250/1
		// /in_theaters/4
		// /coming_soon/3
		$routeProvider.when('/:movieType/:page?', {
			templateUrl: './movie_list/view.html',
			controller: 'MovieListController'
		});

	}])
	.controller('MovieListController', ['$scope', '$routeParams' ,'$route' ,  'JSONPSrv', function($scope, $routeParams, $route, JSONPSrv){
		// 通过 $routeParams.page 获取到当前页

		// 展示加载动画
		$scope.isShow = true;

		var curPage = $routeParams.page || '1';
		var COUNT = 10;
		var start = (curPage - 1) * COUNT;

		// 暴露给视图进行展示
		$scope.curPage = curPage;

		$scope.goPage = function( curPage ) {
			// 如果页码不符合要求，就不更新 路由参数
			if(curPage < 1 || curPage > $scope.pageCount) {
				return;
			}
			$route.updateParams({page: curPage});
		};

		JSONPSrv.jsonp('https://api.douban.com/v2/movie/' + $routeParams.movieType, {
			start: start,
			count: COUNT,
			// 对于 正在热映 等3个模块，接口是不需要q参数的，但是，我们额外的加一个参数
			// 也不会产生影响，因为接口中是没有使用q参数的！
			// 但是，搜索功能是需要 q参数 的，所以，我们不管是什么请求，都添加一个q参数！
			q: $routeParams.q || ''
		}, function( data ) {
			console.log( data );
			$scope.movieData = data;
			$scope.pageCount = Math.ceil(data.total / COUNT);
			// 隐藏加载动画
			$scope.isShow = false;

			$scope.$apply();
		});
	}]);

})(angular);