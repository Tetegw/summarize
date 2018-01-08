(function(angular) {
    angular.module('TodoApp.controller', ['ngRoute'])
    .config(['$routeProvider',function($routeProvider) {
        $routeProvider
            .when('/:name?',{
                templateUrl: './view/view.html',
                controller: 'TodoController'
            })
    }])
    .controller('TodoController', ['$scope', '$routeParams','TodoServer', TodoController]);

    //控制器函数
    function TodoController($scope, $routeParams,TodoServer) {
        var vm = $scope;
        //获取数据, vm.task指向 {return this.task} 的引用
        //只要后者数据改变,前者就会改变
        vm.task = TodoServer.getData();

        //增加数据
        vm.submitTask = function() {
            TodoServer.addData( vm.newTask );
            vm.newTask = '';
        };

        //删除任务
        vm.deleteTask = function( deleteId ) {
            TodoServer.deleteData( deleteId );
        };

        //给label绑定双击事件 可以修改
        //用一个变量和传进来的ID比较,得出布尔值,用来[排他]
        vm.focusId = 0;
        vm.edit = function(updateId) {
            vm.focusId = updateId;
        };
        vm.undate = function() {
            vm.focusId = 0;
        }

        //全选按钮
        vm.allChecked = false;
        vm.toggleAll = function() {
            TodoServer.toggleAll( vm.allChecked );
        };

        //监听每一个数据变化
        vm.$watch('task', function() {
            TodoServer.saveData();
            //如果数组中没有选项, 则初始化all选框,并返回
            if (vm.task.length === 0) {
                vm.allChecked = false;
                vm.clearShow = false;
                vm.num = 0;
                return;
            }
            //每一个都被选中,才选中全选按钮
            vm.allChecked = TodoServer.everyTrue();
            //只要有一个选中, 就显示clear按钮
            vm.clearShow = TodoServer.someTrue();
            //多少未完成任务,返回值给vm.num
            vm.num = TodoServer.left();
            //数据变化,就保存
            TodoServer.saveData();
        }, true);


        //清除已经完成的任务
        vm.clearCom = function() {
            TodoServer.clearComData();
        };

        //展示的内容
        // console.log($routeParams)
        vm.hash = undefined;
        switch($routeParams.name){
            case 'active':
                vm.hash = false;
                break;
            case 'completed':
                vm.hash = true;
                break;
            default:
                vm.hash = undefined;
                break;
        }

    }
})(angular)
