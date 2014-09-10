angular.module('triangulate.directives')

	.directive('shape', function ($timeout) {
		return {
			require: '^board',
			restrict: 'E',
			scope: {
				shape: '='
			},
			template: '<div class="{{shape.shape}}"></div>',
			link: function (scope, elem, attrs, boardCtrl) {

				var board = document.getElementById('board');
				var shape = elem.find('div')[0];

				// Calculate distance to hide the shape off the screen.
				var adjacentLength = calculateAdjacent(scope.shape.angle);

				// TODO: Sort out the amount to move the shape off the screen by
				var transform =
					'rotate(' + scope.shape.angle + 'deg) ' +
					'translate3d(0, -500px, 0) ' +
					'translate3d(' + adjacentLength + 'px, 0px, 0px)';
				shape.style.top = boardCtrl.focalPointY + 'px';
				shape.style.left = boardCtrl.focalPointX + 'px';
				shape.style.webkitTransform = transform;
				shape.style.transform = transform;
				shape.style.background = scope.shape.color;

				$timeout(function () {
					shape.style.transition = 'all 1s linear';
					// Apply translate
					var transform =
						'rotate(' + scope.shape.angle + 'deg) ' +
						'translate3d(0, -500px, 0) ' +
						'translate3d(' + adjacentLength * 0.75 + 'px, 0px, 0px)';
					shape.style.webkitTransform = transform;
					shape.style.transform = transform;

				}, 1000);

				$timeout(function () {
					// Apply translate
					var transform =
						'rotate(' + scope.shape.angle + 'deg) ' +
						'translate3d(0, -500px, 0) ' +
						'translate3d(' + adjacentLength * 0 + 'px, 0px, 0px)';
					shape.style.webkitTransform = transform;
					shape.style.transform = transform;

				}, 4000);

				function calculateAdjacent(angle) {
					var quadrant = Math.floor(angle / 90);
					switch (quadrant) {
						case 0: // Bottom right corner
							var a = board.offsetHeight - boardCtrl.focalPointY; // Distance between focal point and bottom
							var b = board.offsetWidth - boardCtrl.focalPointX; // Distance between focal point and right
							var angleReset = angle * 2;
							break;

						case 1: // Bottom left corner
							var a = board.offsetHeight - boardCtrl.focalPointY; // Distance between focal point and bottom
							var b = boardCtrl.focalPointX; // Distance between left and focal point
							var angleReset = 180;
							break;

						case 2: // Top left corner
							var a = boardCtrl.focalPointX; // Distance between left and focal point
							var b = boardCtrl.focalPointY; // Distance between top and focal point
							var angleReset = 270;
							break;

						case 3: // Top right corner
							var a = boardCtrl.focalPointY; // Distance between top and focal point
							var b = board.offsetWidth - boardCtrl.focalPointX; // Distance between focal point and right
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
	});