var app = angular.module('app', []);
app.filter('escape', function() {
	    return window.encodeURIComponent;
});

function ChangesCtrl($scope) {
	$scope.changes = [
	{title: 'Oh hi', modified: '2013103100000000', uri: 'http://e.com/1'},
	{title: 'Bye now', modified: '2013110300000000', uri: 'http://e.com/2'}
	];
}
