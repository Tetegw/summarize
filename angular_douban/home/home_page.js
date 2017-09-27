(function(angular) {

// 创建首页模块
angular
	.module('moviecat.home', ['ngRoute'])
	.config(['$routeProvider',function($routeProvider) {
		// 配置路由规则
		$routeProvider.when('/home_page', {
			templateUrl: './home/view.html'
		})
		// 默认跳转
		.otherwise({
			redirectTo: '/home_page'
		});

	}])
	.controller('HomeController', ['$scope', '$location', function($scope, $location){
		$scope.searchTxt = '';
		
		$scope.search = function() {
			// 点击按钮，修改 URL 中的 hash 值，也就是修改路由！！！
			// $location.url() 获取 hash 值
			// $location.url('/search?q=' + $scope.searchTxt) 设置 hash 值

			// 调用 url() 方法更新 URL 中的 hash 内容！
			$location.url('/search?q=' + $scope.searchTxt);
		};

	}])

})(angular);