(function(app) {

	app.controller('todoController', ['$scope', 'API', '$mdDialog', function($scope, API, $mdDialog) {
        API.getTodoTask().then(function(response){
            $scope.taskList = response.data;
        });

        $scope.setTaskDone = function (task){
            API.setActionDone(task.id).then(function(response){
                task.status="DONE"
            });
        }

        $scope.deleteTask = function (task, index) {
            API.deleteTask(task.id).then(function(response){
                $scope.taskList.splice(index, 1);
            });
        }

        $scope.editTask = function (task, index) {

        $mdDialog.show({
            controller: function ($scope, $mdDialog, API) {
                $scope.taskDetails = angular.copy(task);

                $scope.editTask = function () {
                if($scope.taskDetails.id) {
                    API.updateTask($scope.taskDetails.id, $scope.taskDetails.name, $scope.taskDetails.description).then(function(response){
                        $mdDialog.hide(response.data);
                    });
                } else {
                    API.createTask($scope.taskDetails.name, $scope.taskDetails.description).then(function(response){
                        $mdDialog.hide(response.data);
                    });
                }

                }

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
            },
            templateUrl: 'partials/edit-task-dialog.html',
            locals: {
                'task':task
            },
            clickOutsideToClose: true
        }).then(function (updatedTaskDetails) {

        if (task.id){
            $scope.taskList[index] = updatedTaskDetails;
            } else {
            $scope.taskList.push(updatedTaskDetails)
            }
           console.log(updatedTaskDetails);
        });

        }



	}]);
})(originweb);
