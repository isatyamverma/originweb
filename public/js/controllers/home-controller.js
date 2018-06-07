(function(app) {
    app.controller('HomeController', ['$scope', function($scope) {

        $scope.loginModel = {
            username: '',
            password: ''
        };

        $scope.performLogin = function() {
            console.log($scope.loginModel);

        }

    }]);

})(originweb);