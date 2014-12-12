angular.module('convergence.controllers')

	.controller('MenuCtrl', function ($scope, $timeout) {
		'use strict';

		// The leaderboard
		$scope.leaders = [];

		$scope.loadLeaders = function loadLeaders() {
			$timeout(function () {
				for (var i = 0; i < 1000; i++) {
					$scope.leaders.push({
						name: 'User' + i,
						score: i * 10
					});
				}
				$scope.$broadcast('scroll.refreshComplete');
			}, 2000);
		};
	});
