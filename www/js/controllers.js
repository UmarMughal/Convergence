angular.module('triangulate.controllers', [])

	.controller('MenuCtrl', function ($scope, $timeout) {

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
	})

	.controller('GameCtrl', function ($rootScope, $scope, $ionicModal, game) {

		// The instructions
		$ionicModal.fromTemplateUrl('instructions.html', {
			scope: $scope,
			animation: 'slide-in-up'
		}).then(function (modal) {
			$scope.instructionsModal = modal;
		});

		$scope.showInstructions = function showInstructions() {
			$scope.instructionsModal.show();
		};

		$scope.hideInstructions = function hideInstructions() {
			$scope.instructionsModal.hide();
		};

		game.settings = {
			level: 1,
			timeLimit: 3
		};

		// The Game
		$scope.play = function play() {
			$rootScope.$broadcast('play');
		};

		// The Game
		$scope.reset = function reset() {
			$rootScope.$broadcast('reset');
		};

		//$rootScope.$broadcast('pause');
		//$rootScope.$broadcast('quit');
	});
