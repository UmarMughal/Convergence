angular.module('convergence')

	.controller('GameCtrl', function ($rootScope, $scope, $timeout, $cordovaSocialSharing, $ionicModal, $ionicPopup, game) {
		'use strict';

		$scope.showStartScreen = true;

		$scope.game = game;

		$scope.highScore = localStorage.highScore;

		$scope.share = function () {
			var appStoreLink = 'https://itunes.apple.com/us/app/convergence-fun-to-play-difficult/id951366074';
			if (ionic.Platform.isAndroid()) {
				appStoreLink = 'https://play.google.com/store/apps/details?id=com.grumpywizards.convergence';
			}
			$cordovaSocialSharing
				.share(
				'Can you beat my high score of Level' + $scope.highScore + '?! #Convergence',
				'Convergence - Fun to play, difficult to master',
				null,
				appStoreLink);
		};

		// The Game
		$scope.start = function start() {
			if (!localStorage.seenInstructions) {
				var instructionsPopup = $ionicPopup.alert({
					title: 'How to play',
					template: 'Tap the screen where you think the shapes will overlap',
					okText: 'Ok got it!',
					okType: 'button-positive'
				});
				instructionsPopup.then(function () {
					localStorage.seenInstructions = true;
					$scope.showStartScreen = false;
					game.setLevel(1);
					play();
				});
			} else {
				$scope.showStartScreen = false;
				game.setLevel(1);
				play();
			}
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
				msg = '<p><strong>Ooops!</strong> Try again, this time guess where the shapes will overlap before the timer ticks down</p>';
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
	});
