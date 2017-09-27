(function(angular) {

angular
	.module('moviecat.in_theaters', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		
		// :page? 用来表示当前页码，并且这个参数是可选的！！！
		$routeProvider.when('/in_theaters/:page?', {
			templateUrl: './in_theaters/view.html',
			controller: 'InTheatersController'
		});

	}])
	.controller('InTheatersController', ['$scope', '$routeParams' ,'$route' ,  'JSONPSrv', function($scope, $routeParams, $route, JSONPSrv){
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

		// 分页功能的说明：
		// 第一页：0 1 2 3 4
		// 第二页：5 6 7 8 9
		// 第三页：10 11 12 13 14
		// 
		// 一般情况下，通过 start（开始条数） 以及 count（每页数量）
		// 0 5 10 。。。
		// 所以，需要计算start
		// 第一页：0       => start
		// 第二页：5			 => start
		// 第三页：10      => start
		// 
		// 公式：start = (page - 1) * count

		
		JSONPSrv.jsonp('https://api.douban.com/v2/movie/in_theaters', {
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

		/*// 根据 data.json 文件中的数据，展示内容！！！
		$http({
		  method: 'GET',
		  url: './in_theaters/data.json'
		})
		.then(function successCallback(response) {
			// console.log('成功', response)
			
			$scope.movieData = response.data;

	  }, function errorCallback(response) {
	  	console.log('失败', response)
	  });*/

	}]);

})(angular);