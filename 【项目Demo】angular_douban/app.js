(function(angular) {
  // "use strict";

  // start your ride
  // 主模块，作用：将所有其他的模块依赖进来
  angular.module('moviecat', [
  	// 将 首页模块 加载进来
  	'moviecat.home',
    'moviecat.details',
  	'moviecat.movie_list',
    'moviecat.jsonp',
    'moviecat.menu_active',
  ]);

  // 我们的代码处理方式:
  // 1 每一个功能对应了一个独立的模块
  // 2 然后, 将所有的模块通过一个主模块引入
  // 3 主模块, 是通过模块依赖项的方法将其他所有的模块引入进来的
  // 4 模块引入是有顺序的
  // 5 那么, 影响到了每个模块中的路由
  // 6 路由也是根据模块的顺序来引入的

})(angular);
