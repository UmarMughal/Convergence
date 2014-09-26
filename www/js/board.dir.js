angular.module('convergence.directives')

	.directive('board', function ($timeout, randomInt, game, TARGET) {
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
				board.addEventListener("touchstart", dropPin, false);
				board.addEventListener("click", dropPin, false);

				var _this = this;
				_this.width = board.getClientRects()[0].right - board.getClientRects()[0].left;
				_this.height = board.getClientRects()[0].bottom - board.getClientRects()[0].top;

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
					game.settings.pixels = game.settings.pixels - Math.floor(dist);

					if (game.settings.target !== TARGET.none && dist > game.settings.target / 2) {
						// If target is in play check the pin is inside it, if not game over
						$rootScope.$broadcast('game.over');

					} else if (game.settings.pixels <= 0) {
						// If no more pixels, set to 0, game over
						game.settings.pixels = 0;
						$rootScope.$broadcast('game.over');
					}
					else {
						// If inside target and pixels remaining let's crack on
						$rootScope.$broadcast('game.level-complete');
					}
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
						game.pinEnabled = false;
						$rootScope.$broadcast('game.drop-pin', pinPosition);
					}
				}

				function reset() {
					game.reset();
					$scope.shapes = [];
				}

				function randomDegrees(angle) {
					return randomInt.generate(angle, angle + 20);
				}

				function setFocalPoint() {
					var focalPointPadding = 50;
					_this.focalPointX = randomInt.generate(focalPointPadding, _this.width - focalPointPadding);
					_this.focalPointY = randomInt.generate(focalPointPadding, _this.height - focalPointPadding);
				}

				function addShapes() {
					$scope.shapes = [];
					var colors = [
						'#2c97c0', // blue
						'#b93085', // pink
						'#f2f2f2', // white
						'#c5b222', // yellow
						'#333333', // black
						'#08ac98', // green
						'#ffa500'  // orange
					];
					var angle = 0;
					var angleDiff = 360 / game.settings.noOfShapes;
					var shapes = [];
					for (var i = 0; i < game.settings.noOfShapes; i++) {
						shapes.push({
							shape: game.settings.typeOfShapes,
							color: colors[randomInt.generate(0, 5)],
							angle: randomDegrees(angle)
						});
						angle = angle + angleDiff;
					}
					$scope.shapes = shapes;
				}

				_this.calculateAdjacent = function calculateAdjacent(angle) {
					var quadrant = Math.floor(angle / 90);
					switch (quadrant) {
						case 0: // Bottom right corner
							var a = board.offsetHeight - _this.focalPointY; // Distance between focal point and bottom
							var b = board.offsetWidth - _this.focalPointX; // Distance between focal point and right
							var angleReset = angle * 2;
							break;

						case 1: // Bottom left corner
							var a = board.offsetHeight - _this.focalPointY; // Distance between focal point and bottom
							var b = _this.focalPointX; // Distance between left and focal point
							var angleReset = 180;
							break;

						case 2: // Top left corner
							var a = _this.focalPointX; // Distance between left and focal point
							var b = _this.focalPointY; // Distance between top and focal point
							var angleReset = 270;
							break;

						case 3: // Top right corner
							var a = _this.focalPointY; // Distance between top and focal point
							var b = board.offsetWidth - _this.focalPointX; // Distance between focal point and right
							var angleReset = 360;
							break;
					}

					angle = 90 - Math.atan(b / a) * (180 / Math.PI) - (angleReset - angle); // The Cosine angle
					var hypotenuse = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)); // Diagonal distance between focal point and corner
					var adjacentLength = Math.cos(angle * (Math.PI / 180)) * hypotenuse;
					return adjacentLength;
				}
			}
		}
	})
;