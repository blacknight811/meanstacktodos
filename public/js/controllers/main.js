(function todoControllerIIFE () {
    angular.module('todoController',[])
        .controller('mainCtrl', mainCtrl);

    mainCtrl.$inject = ['$scope', 'todoFactory'];

    function mainCtrl($scope, todoFactory){
        "use strict";
        $scope.formData = {};

        //when landing on the page, get all todos and show them
        todoFactory.getAllTodos().then(
            function (res) {
                $scope.todos = res;
            },
            function (err) {
                console.log(err);
            }
        );

        // when submitting the add form, send the text to the node API
        $scope.createTodo = function () {
            if(!$.isEmptyObject($scope.formData)){
                todoFactory.createTodo($scope.formData).then(
                    function (res) {
                        $scope.formData = {};
                        $scope.todos = res;
                    },
                    function (err) {
                        console.log(err);
                    }
                );
            }
        };

        $scope.deleteTodo = function (id) {
            todoFactory.deleteTodo(id).then(
                function (res) {
                    $scope.todos = res;
                },
                function (err) {
                    console.log(err);
                }
            );
        };
    }
})();