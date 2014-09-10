angular.module('triangulate.directives')

	.directive('board', function (randomInt, mouse) {
		return {
			restrict: 'E',
			scope: {
				level: '='
			},
			template: '<div id="board" class="board">' +
				'<focal-point></focal-point>' +
				'<shape ng-repeat="shape in shapes" shape="shape"></shape>' +
				'</div>',
			controller: function ($scope) {
				var board = document.getElementById('board');
				var boardRect = board.getBoundingClientRect();
				board.addEventListener("touchstart", mouse.getClickPosition, false);

				// Generate random focal point - with some pixel padding
				var focalPointPadding = 20;
				this.focalPointX = randomInt.generate(boardRect.left + focalPointPadding, boardRect.right - focalPointPadding);
				this.focalPointY = randomInt.generate(boardRect.top + focalPointPadding, boardRect.bottom - focalPointPadding);

				// Generate a random amount of degrees
				var ANGLE_VARIANCE = 20;
				var randomDegrees = function randomDegrees(angle) {
					return randomInt.generate(angle, angle + ANGLE_VARIANCE);
				};

				// Based on scope.level set some shapes
				if ($scope.level == 1) {
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
	});