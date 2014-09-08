angular.module('triangulate.controllers', [])

.controller('MenuCtrl', function ($scope, $ionicModal) {
	$scope.leaders = [];
	for (var i = 0; i < 1000; i++) {
		$scope.leaders.push({
			name: 'User' + i,
			score: i * 10
		});
	}
})

.controller('GameCtrl', function ($scope) {

});
