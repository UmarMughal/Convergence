angular.module('convergence.controllers', [])

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

		$scope.showStartScreen = true;

		$scope.game = game;

		// The Game
		$scope.start = function start() {
			$scope.showStartScreen = false;
			game.setLevel(1);
			$rootScope.$broadcast('game.play');
		};

		$rootScope.$on('game.over', function () {
			alert('Game over!');
			$scope.showStartScreen = true;
		});

		// The Instructions
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
	});
