!(function() {
    // config router
    var router = new Router({
        container: 'routerContainer',
        cacheView: true,
        beforeFn: function() {
            console.log('beforeFn');
            NProgress.start();
        },
        afterFn: function() {
            // console.log('afterFn');
            NProgress.done();
        },
    });
    router.when('/dream', {
        styles: ['./css/s1.css'],
        controllers: ['./js/c1.js'],
        view: './view/xx1.html',
    }).when('/news', {
        controllers: ['./js/c2.js'],
        styles: ['./css/s2.css'],
        view: './view/xx2.html',
        data: {
            existData: {
                name: 'xiaoming',
                age: 18
            }
        },
    }).when('/text', {
        styles: ['./css/s3.css'],
        view: './view/xx3.html',
    }).otherwise('/text').run();

})();