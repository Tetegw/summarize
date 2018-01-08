(function(angular) {

// 方式一
/*angular
	.module('moviecat.menu_active', [])
	.directive('menuActive', function() {

		return {
			// templateUrl: './directive/view.html',
			restrict: 'A',
			// replace: true,
			link: function($scope, element, attribute) {
				// console.log($scope);
				// console.log(element)
				// 
				// element 是一个 jqLite 对象
				// 
				// 思路:
				// 单击的时候, 修改当前元素的选中状态, 兄弟元素移除选中状态
				element.children().on('click', function() {
					// console.dir( element )
					// 思路: 让所有的子元素全部移除选中状态,给当前元素添加选中状态
					element.children().removeClass('active');
					// 给当前对象添加 active 样式, this 是一个DOM对象
					this.className = 'active';
				});
			}
		};
	});*/

// 方式二:
angular
	.module('moviecat.menu_active', [])
	.directive('menuActive', ['$location', function($location) {

		return {
			restrict: 'A',
			link: function($scope, element, attribute) {
				// 思路:
				// 通过获取到 URL 中的 hash 值, 就可以通过这个值,来获取到是哪一个li元素
				// 需要添加类, 并且给它的兄弟元素移除类

				// console.log($location.url())
				$scope.location = $location;
				$scope.$watch('location.url()', function(newValue) {
					// console.log(newValue)

					// lis 是一个jqLite对象
					var lis = element.children();
					for(var i = 0; i < lis.length; i++) {
						var href = lis.eq(i).children().attr('href').substr(1);
						if( newValue.indexOf( href ) === 0 ) {
							lis.eq(i).addClass('active')
						} else {
							lis.eq(i).removeClass('active')
						}
					}

				});

			}
		};
	}]);


})(angular);