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

	.controller('GameCtrl', function ($rootScope, $scope, $timeout, $ionicModal, $ionicPopup, game, TARGET) {

		$scope.showStartScreen = true;

		$scope.game = game;

		$scope.highScore = localStorage.highScore;

		// The Game
		$scope.start = function start() {
			$scope.showStartScreen = false;
			game.setLevel(1);
			$rootScope.$broadcast('game.play');
		};

		$rootScope.$on('game.level-complete', levelComplete);

		$rootScope.$on('game.over', gameOver);

		function levelComplete() {
			var timeoutDuration = 1000;
			if (game.settings.target !== TARGET.none) timeoutDuration = 2000;
			$timeout(function () {
				var levelCompletePopup = $ionicPopup.alert({
					title: 'Level Complete',
					template: '<p>Level ' + game.settings.level + '</p>' +
						'<p><strong>' + game.settings.pixels + ' points left</strong></p>',
					okText: 'Next level',
					okType: 'button-positive'
				});
				levelCompletePopup.then(function (res) {
					game.nextLevel();
					$rootScope.$broadcast('game.play');
				});
			}, timeoutDuration);
		}

		function gameOver() {
			var level = game.settings.level - 1;
			var subTitle = '';
			var msg = '<p><strong>Level ' + level + '</strong></p>';
			var btnText = 'Continue';
			// On game over save the high score and update the UI
			if (level > 1 && (!localStorage.highScore || localStorage.highScore < level)) {
				$scope.highScore = localStorage.highScore = level;
				subTitle = 'New high score!';
			}

			// TIPS
			if (level === 0) {
				msg = '<p>You didn\'t complete the level!</p><p><small><strong>Tip:</strong> Tap where you think the shapes are going to overlap.</small></p>';
				btnText = 'Try again';
			}

			var timeoutDuration = 1000;
			if (game.settings.target !== TARGET.none) timeoutDuration = 2000;
			$timeout(function () {
				var gameOverPopup = $ionicPopup.alert({
					title: 'Game Over',
					subTitle: subTitle,
					template: msg,
					okText: btnText,
					okType: 'button-positive'
				});
				gameOverPopup.then(function (res) {
					$scope.showStartScreen = true;
					$rootScope.$broadcast('game.reset');
				});
			}, timeoutDuration);
		}

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
