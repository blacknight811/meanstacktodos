(function todoServiceIIFE () {
    angular.module('todoService',[])
        .factory('todoFactory', todoFactory);

    todoFactory.$inject =['$http', '$q'];

    function todoFactory($http, $q){
        "use strict";
        return{
            getAllTodos: function(){
                var deferred = $q.defer();
                $http.get('/api/todos')
                    .success(function (data) {
                        var todos = data;
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        console.log('Error: '+ err);
                        deferred.reject(err);
                    });
                return deferred.promise;
            },

            createTodo: function (params) {
                params = params || {};
                var deferred = $q.defer();
                $http.post('/api/todos', params)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function(err){
                        console.log('Error: '+ err);
                        deferred.reject(err);
                    });
                return deferred.promise;
            },

            deleteTodo: function (id) {
                var deferred = $q.defer();
                $http.delete('/api/todos/'+ id)
                    .success(function (data) {
                        deferred.resolve(data);
                    })
                    .error(function (err) {
                        console.log('Error: '+ err);
                        deferred.reject(err);
                    });
                return deferred.promise;
            }
        }
    }
})();