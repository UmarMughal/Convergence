angular.module('triangulate.directives')

	.directive('board', function (randomInt, mouse, game) {
		return {
			restrict: 'E',
			template: '<div id="board" class="board">' +
				'<timer></timer>' +
				'<focal-point></focal-point>' +
				'<shape ng-repeat="shape in shapes" shape="shape"></shape>' +
				'</div>',
			controller: function ($rootScope, $scope) {
				var _this = this;
				var board = document.getElementById('board');
				var boardRect = board.getBoundingClientRect();
				board.addEventListener("touchstart", mouse.setClickPosition, false);

				$rootScope.$on('play', startLevel);
				$rootScope.$on('out-of-time', endLevel);
				$rootScope.$on('reset', reset);


				// Functions 
				// -------------------------------------

				function startLevel() {
					mouse.resetClickPosition();
					setFocalPoint();
					addShapes();
					game.playing = true;
				}

				function endLevel() {
					game.playing = false;
					if (!mouse.position.x || !mouse.position.y) {
						gameOver();
					} else {
						var a = Math.abs(mouse.position.x - _this.focalPointX);
						var b = Math.abs(mouse.position.x - _this.focalPointX);
						var dist = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)); // a2 + b2 = c2
						console.log(dist);
						// Show focal-point
						// Show accuracy
						// Show points
						// Show next level button
					}
				};

				function gameOver() {
					alert('Game over!');
					reset();
				}

				function reset() {
					game.playing = false;
					mouse.resetClickPosition();
					_this.focalPointX = undefined;
					_this.focalPointY = undefined;
					$scope.shapes = [];
				}

				function randomDegrees(angle) {
					return randomInt.generate(angle, angle + 20);
				}

				function setFocalPoint() {
					var focalPointPadding = 50;
					_this.focalPointX = randomInt.generate(boardRect.left + focalPointPadding, boardRect.right - focalPointPadding);
					_this.focalPointY = randomInt.generate(boardRect.top + focalPointPadding, boardRect.bottom - focalPointPadding);
				}

				function addShapes() {
					if (game.settings.level == 1) {
						$scope.shapes = [
							{
								shape: 'circle',
								color: '#F85D82',
								angle: randomDegrees(0)
							},
							{
								shape: 'circle',
								color: '#73E2C2',
								angle: randomDegrees(90)
							},
							{
								shape: 'circle',
								color: '#F6DC1C',
								angle: randomDegrees(180)
							},
							{
								shape: 'circle',
								color: '#4CA0FA',
								angle: randomDegrees(270)
							}
						]
					}
				}
			}
		}
	});