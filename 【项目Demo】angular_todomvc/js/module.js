(function(angular) {
    angular.module('TodoApp.module', [])
        .service('TodoServer', ['$window', function($window) {

            //获取本地数据
            this.getData = function() {
                var task = $window.localStorage.getItem('todos');
                this.autoId = $window.localStorage.getItem('todoId');
                this.task = JSON.parse(task) || [];
                return this.task;
            };

            //增加数据
            this.addData = function(newTask) {
                if (newTask.trim() === '') {
                    return;
                };
                //每次提交都让id增加,避免重复的id,和删除没关系
                this.autoId++;
                this.task.unshift({ id: this.autoId, name: newTask, isCompleted: false });
            };

            //保存数据
            this.saveData = function() {
                $window.localStorage.setItem('todos', JSON.stringify(this.task));
                $window.localStorage.setItem('todoId', this.autoId);
            }

            //删除数据
            this.deleteData = function(deleteId) {
                var This = this;
                this.task.forEach(function(value, index) {
                    if (value.id === deleteId) {
                        This.task.splice(index, 1);
                    }
                });
            };

            //全选按钮
            this.toggleAll = function(allChecked) {
                this.task.forEach(function(value, index) {
                    value.isCompleted = allChecked;
                });
            };

            //监听数据变化
            //全选按钮是否被选中
            this.everyTrue = function() {
                var everyRes = this.task.every(function(value, index) {
                    return value.isCompleted;
                });
                return everyRes;
            };

            //clear按钮是否显示
            this.someTrue = function() {
                var someRes = this.task.some(function(value) {
                    return value.isCompleted;
                });
                return someRes;
            };

            //多少未完成任务
            this.left = function() {
                var This = this;
                this.num = 0;
                this.task.forEach(function(value) {
                    if (value.isCompleted === false) {
                        This.num++;
                    }
                })
                return this.num;
            };

            //清除所有已完成的任务
            this.clearComData = function(){
                for (var i = 0; i < this.task.length; i++) {
                    if (this.task[i].isCompleted === true) {
                        this.task.splice(i, 1);
                        i--;
                    }
                }
            };


            }
        ]);
})(angular)
