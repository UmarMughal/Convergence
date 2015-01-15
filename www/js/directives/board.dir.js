angular.module('convergence')

	.directive('board', function ($timeout, randomise, game) {
		'use strict';

		return {
			restrict: 'E',
			template: '<div class="board">' +
			'<shape ng-repeat="shape in shapes" shape="shape"></shape>' +
			'<timer></timer>' +
			'<target></target>' +
			'<focal-point></focal-point>' +
			'<pin></pin>' +
			'</div>',
			controller: function ($rootScope, $scope, $element) {
				var board = $element[0];
				board.classList.add('board');
				board.addEventListener('touchstart', dropPin, false);
				board.addEventListener('click', dropPin, false);

				var _this = this;
				_this.width = board.clientWidth;
				_this.height = board.clientHeight;

				var pinPosition = {};

				$rootScope.$on('game.reset', reset);
				$rootScope.$on('game.play', startLevel);
				$rootScope.$on('game.out-of-time', outOfTime);
				$rootScope.$on('game.end-of-level', endLevel);


				// Functions 
				// -------------------------------------

				function startLevel() {
					pinPosition = {};
					setFocalPoint();
					addShapes();
					board.classList.remove('fadeOut');
					game.pinEnabled = true;
				}

				function outOfTime() {
					game.pinEnabled = false;
					$timeout(function () {
						$rootScope.$broadcast('game.end-of-level');
					}, 750);
				}

				function endLevel() {
					if (!pinPosition.x || !pinPosition.y) {
						$rootScope.$broadcast('game.over');
						return;
					}
					var a = Math.abs(pinPosition.x - _this.focalPointX);
					var b = Math.abs(pinPosition.y - _this.focalPointY);
					var dist = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)); // a2 + b2 = c2

					if (dist > (game.settings.target * _this.width) / 2) {
						// If the pin is outside target, game over
						$rootScope.$broadcast('game.over');

					} else {
						// If inside target let's crack on
						$rootScope.$broadcast('game.level-complete');
					}
					board.classList.add('fadeOut');
				}

				function dropPin(e) {
					e.preventDefault();
					if (game.pinEnabled) {
						if (e.changedTouches) {
							pinPosition.x = e.changedTouches[0].clientX;
							pinPosition.y = e.changedTouches[0].clientY;
						} else {
							pinPosition.x = e.clientX;
							pinPosition.y = e.clientY;
						}
						$rootScope.$broadcast('game.drop-pin', pinPosition);
					}
				}

				function reset() {
					game.reset();
					$scope.shapes = [];
				}

				function randomDegrees(angle) {
					return randomise.generate(angle, angle + 20);
				}

				function setFocalPoint() {
					var focalPointPadding = 50;
					_this.focalPointX = randomise.generate(focalPointPadding, _this.width - focalPointPadding);
					_this.focalPointY = randomise.generate(focalPointPadding, _this.height - focalPointPadding);
				}

				function addShapes() {
					$scope.shapes = [];
					var colors = [
						'#579BCF', // dark blue
						'#A1D8F6', // light blue
						'#E75095', // pink
						'#5AAA36', // green
						'#AFC424', // pink
						'#9575CD' // purple
					];
					colors = randomise.shuffleArray(colors);
					var angle = 0;
					var angleDiff = 360 / game.settings.noOfShapes;
					var shapes = [];
					for (var i = 0; i < game.settings.noOfShapes; i++) {
						shapes.push({
							shape: game.settings.typeOfShapes,
							color: colors.pop(),
							angle: randomDegrees(angle)
						});
						angle = angle + angleDiff;
					}
					$scope.shapes = shapes;
				}

				_this.calculateAdjacent = function calculateAdjacent(angle) {
					var a, b, angleReset;
					var quadrant = Math.floor(angle / 90);
					switch (quadrant) {
						case 0: // Bottom right corner
							a = board.offsetHeight - _this.focalPointY; // Distance between focal point and bottom
							b = board.offsetWidth - _this.focalPointX; // Distance between focal point and right
							angleReset = angle * 2;
							break;

						case 1: // Bottom left corner
							a = board.offsetHeight - _this.focalPointY; // Distance between focal point and bottom
							b = _this.focalPointX; // Distance between left and focal point
							angleReset = 180;
							break;

						case 2: // Top left corner
							a = _this.focalPointX; // Distance between left and focal point
							b = _this.focalPointY; // Distance between top and focal point
							angleReset = 270;
							break;

						case 3: // Top right corner
							a = _this.focalPointY; // Distance between top and focal point
							b = board.offsetWidth - _this.focalPointX; // Distance between focal point and right
							angleReset = 360;
							break;
					}

					angle = 90 - Math.atan(b / a) * (180 / Math.PI) - (angleReset - angle); // The Cosine angle
					var hypotenuse = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)); // Diagonal distance between focal point and corner
					var adjacentLength = Math.cos(angle * (Math.PI / 180)) * hypotenuse;
					return adjacentLength;
				};
			}
		};
	});