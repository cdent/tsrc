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
		spaceQuery = '(bag:' + space + '_public%20OR%20bag:'
			+ space + '_private)',
		userQuery = 'modifier:' + space;

	$scope.$parent.space = space;
	$scope.show = '';

	$http.get('/search?q=' + spaceQuery,
		{headers: { 'Accept': 'application/json'}}).success(function(data) {
		$scope.changes = data;
		$scope.show = 'show';
	});
}]);
