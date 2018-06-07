var originweb = angular.module('originweb', ['ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria', 'ui.router']);

(function(app) {
    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push(function ($q) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
//                if ($cookies.get('token')) {
//                    config.headers.Authorization = 'Token ' + $cookies.get('token');
//                }
                return config;
            },
            'responseError': function (response) {
                return $q.reject(response);
            },
            'response': function (response) {
                return response;
            }

            }
            });

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('todo', {
		url: '/todo',
		templateUrl: 'partials/todo-partial.html',
		controller: 'todoController'
	})

	.state('home', {
            url: '/',
            templateUrl: 'partials/home-partial.html',
            controller: 'HomeController'
        })

        .state('about', {
            url: '/about',
            templateUrl: 'partials/about-partial.html',
            controller: 'AboutController'
        });
    }]);
})(originweb);
