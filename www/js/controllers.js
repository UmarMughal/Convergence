angular.module('triangulate.controllers', [])

	.controller('MenuCtrl', function ($scope, $timeout) {

		// The leaderboard
	$scope.leaders = [];

		$scope.loadLeaders = function () {
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
	})

	.controller('GameCtrl', function ($scope, $ionicModal) {

		// The instructions
		$ionicModal.fromTemplateUrl('instructions.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.instructionsModal = modal;
		});

		$scope.showInstructions = function () {
			$scope.instructionsModal.show();
		};

		$scope.hideInstructions = function () {
			$scope.instructionsModal.hide();
		};

		// The Game
		$scope.level = 1;
	});
