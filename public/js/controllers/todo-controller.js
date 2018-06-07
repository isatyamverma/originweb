(function(app) {
    app.controller('todoController', ['$scope', 'API', '$mdDialog', '$mdToast', function($scope, API, $mdDialog, $mdToast) {
        /*
        It should be a service but not doing now due to lack of time.
        */
        var displayToast = function(toastText) {
            $mdToast.show(
                $mdToast.simple()
                .textContent(toastText)
                .position("top right")
                .action('Close')
                .highlightAction(true)
                .highlightClass('md-accent')
                .hideDelay(4000)
            );
        }
        /*
        TODO List gets initialized here
        */
        API.getTodoTask().then(function(response) {
            $scope.taskList = response.data;
        }, function(error) {
            displayToast(error);
        });
        /*
        Task can be marked as done by anyone
        */
        $scope.setTaskDone = function(task) {
            API.setActionDone(task.id).then(function(response) {
                task.status = "DONE"
            }, function(error) {
                displayToast(error);
            });
        }
        /*
        Only owner can delete their tasks
        */
        $scope.deleteTask = function(task, index) {
            API.deleteTask(task.id).then(function(response) {
                $scope.taskList.splice(index, 1);
            }, function(error) {
                displayToast(error);
            });
        }
        /*
        New task will be created on add button and old one will be updated on update button
        */
        $scope.editTask = function(task, index) {
            $mdDialog.show({
                controller: function($scope, $mdDialog, API) {
                    $scope.taskDetails = angular.copy(task);
                    $scope.editTask = function() {
                        if ($scope.taskDetails.id) {
                            API.updateTask($scope.taskDetails.id, $scope.taskDetails.name, $scope.taskDetails.description).then(function(response) {
                                $mdDialog.hide(response.data);
                            }, function(error) {
                                displayToast(error);
                            });
                        } else {
                            API.createTask($scope.taskDetails.name, $scope.taskDetails.description).then(function(response) {
                                $mdDialog.hide(response.data);
                            }, function(error) {
                                displayToast(error);
                            });
                        }
                    }
                    $scope.cancel = function() {
                        $mdDialog.cancel();
                    };
                },
                templateUrl: 'partials/edit-task-dialog.html',
                locals: {
                    'task': task
                },
                clickOutsideToClose: true
            }).then(function(updatedTaskDetails) {
                if (task.id) {
                    $scope.taskList[index] = updatedTaskDetails;
                } else {
                    $scope.taskList.push(updatedTaskDetails)
                }
            });
        }
    }]);
})(originweb);