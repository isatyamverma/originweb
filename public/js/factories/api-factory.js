(function(app) {
	app.factory('API', function($http) {

    var apiBase = 'http://localhost:8000/';

    var API = function (apiBase) {
        this.apiBase = apiBase;
    };

    API.prototype.getApiBase = function () {
        return apiBase;
    };

     API.prototype.get = function (url, data) {
        return $http.get(url, data);
    };

    API.prototype.post = function (url, data) {
        return $http.post(url, data);
    }

     API.prototype.put = function (url, data) {
        return $http.put(url, data);
    };

    API.prototype.delete = function (url, data) {
        return $http.delete(url, data);
    }

    API.prototype.getTodoTask = function () {
        return this.get(this.apiBase + 'api/todo/tasks/');
    };

    API.prototype.setActionDone = function (taskId) {
        return this.post(this.apiBase + 'api/todo/action/', {'task':taskId});
    };

    API.prototype.createTask = function (name, description) {
        return this.post(this.apiBase + 'api/todo/tasks/', {
                                                              'name': name,
                                                              'description': description});
    };

    API.prototype.updateTask = function (taskId, name, description) {
        return this.put(this.apiBase + 'api/todo/tasks/'+ taskId + '/', {

                                                              'name': name,
                                                              'description': description});
    };

    API.prototype.deleteTask = function (taskId) {
        return this.delete(this.apiBase + 'api/todo/tasks/' + taskId + '/');
    };

	return new API(apiBase);

	});

})(originweb);