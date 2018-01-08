(function(angular) {


	angular
		.module('moviecat.jsonp', [])
		.service('JSONPSrv', ['$window', function($window){

			var doc = $window.document;
			
			// 发送 jsonp 请求的服务功能
			this.jsonp = function jsonp(url, params, callback) {
				url += '?';

				for(var k in params) {
					url += k + '=' + params[k] + '&'
				}

				// 随机生成一个不重复的函数名
				var callbackName = 'itcast_' + (new Date - 0);
				url += 'callback=' + callbackName;

				$window[callbackName] = function( data ) {
					callback( data );

					// 获取到数据后，就可以将script标签以及函数都销毁掉
					doc.head.removeChild( script );
					delete $window[callbackName];
				};

				// 动态创建script
				var script = doc.createElement('script');
				script.src = url;
				doc.head.appendChild( script );
			}

		}])

})(angular);