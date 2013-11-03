var app = angular.module('app', []);

app.filter('escape', function() {
	return window.encodeURIComponent;
});

app.filter('modtime', function() {
	function dateString(date) {
		return moment(date, "YYYYMMDDHHmmssSSS").fromNow();
	}
	return dateString;
});

app.controller('ChangesCtrl', ['$scope', '$http', function($scope, $http) {

	var space = tiddlyweb.status.space.name,
		server_host = tiddlyweb.status.server_host.host,
		scheme = tiddlyweb.status.server_host.scheme,
		port = tiddlyweb.status.server_host.port,
		port = (port == 80 || port == 443) ? '' : port,
		spaceQuery = '(bag:' + space + '_public%20OR%20bag:'
			+ space + '_private)',
		userQuery = 'modifier:' + space;

	$scope.modifierSite = function(change) {
		// XXX: if the oldest tiddlers is modidifed by the space name
		// this trick won't work.
		$scope.multiplemods = !(change.modifier == space);
		return scheme + '://' + change.modifier + '.' + server_host + '/';
	}

	$scope.$parent.space = space;
	$scope.show = '';

	$http.get('/search?q=' + spaceQuery,
		{headers: { 'Accept': 'application/json'}}).success(function(data) {
		$scope.changes = data;
		$scope.show = 'show';
	});
}]);
