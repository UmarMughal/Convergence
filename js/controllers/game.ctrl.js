angular.module('convergence.controllers')

	.controller('GameCtrl', function ($rootScope, $scope, $timeout, $ionicModal, $ionicPopup, game) {
		'use strict';

		$scope.showStartScreen = true;

		$scope.game = game;

		$scope.highScore = localStorage.highScore;

		// The Game
		$scope.start = function start() {
			$scope.showStartScreen = false;
			game.setLevel(1);
			play();
		};

		$rootScope.$on('game.level-complete', levelComplete);

		$rootScope.$on('game.over', gameOver);

		function play() {
			$scope.showLevelIntro = true;
			// Timeout to allow for "NEXT LEVEL!" animation
			$timeout(function () {
				$scope.showLevelIntro = false;
				$rootScope.$broadcast('game.play');
			}, 1500);
		}

		function levelComplete() {
			// Timeout to allow for target animation
			$timeout(function () {
				game.nextLevel();
				play();
			}, 1500);
		}

		function gameOver() {
			var level = game.settings.level - 1;
			var msg = '<p><strong>Level ' + level + '</strong></p>';
			var subTitle = '';
			var btnText = 'Continue';

			// On game over save the high score and update the UI
			if (level > 1 && (!localStorage.highScore || localStorage.highScore < level)) {
				$scope.highScore = localStorage.highScore = level;
				subTitle = 'New high score!';
			}

			// TIPS
			if (level === 0) {
				msg = '<p><strong>That was pretty bad!</strong> Try again, this time guess where the shapes will overlap <em>before</em> the timer ticks down</p>';
				btnText = 'Try again';
			}

			$timeout(function () {
				var gameOverPopup = $ionicPopup.alert({
					title: 'Game Over',
					subTitle: subTitle,
					template: msg,
					okText: btnText,
					okType: 'button-positive'
				});
				gameOverPopup.then(function () {
					$scope.showStartScreen = true;
					$rootScope.$broadcast('game.reset');
				});
			}, 1500);
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
