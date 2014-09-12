angular.module('triangulate.directives')

	.directive('shape', function ($rootScope, $timeout) {
		return {
			require: '^board',
			restrict: 'E',
			scope: {
				shape: '='
			},
			template: '<div class="shape {{shape.shape}}"></div>',
			link: function (scope, elem, attrs, boardCtrl) {

				var board = document.getElementById('board');
				var shape = elem.find('div')[0];

				// Calculate distance to hide the shape off the screen.
				var adjacentLength = calculateAdjacent(scope.shape.angle);

				// Move the shape off the screen
				var transform =
					'rotate(' + scope.shape.angle + 'deg) ' +
					'translate3d(0, -' + shape.offsetWidth / 2 + 'px, 0) ' +
					'translate3d(' + adjacentLength + 'px, 0px, 0px)';
				shape.style.top = boardCtrl.focalPointY + 'px';
				shape.style.left = boardCtrl.focalPointX + 'px';
				shape.style.webkitTransform = transform;
				shape.style.transform = transform;
				shape.style.background = scope.shape.color;

				$timeout(hint, 100);

				$rootScope.$on('out-of-time', converge);


				// Functions 
				// -------------------------------------

				// Move shape inward slightly to provide a hint to the gamer
				function hint() {
					shape.style.transition = 'all 0.3s linear';
					var transform =
						'rotate(' + scope.shape.angle + 'deg) ' +
						'translate3d(0, -' + shape.offsetWidth / 2 + 'px, 0) ' +
						'translate3d(' + adjacentLength * 0.75 + 'px, 0px, 0px)';
					shape.style.webkitTransform = transform;
					shape.style.transform = transform;
				}

				// Move the shape inward all the way to the focal point
				function converge() {
					shape.style.transition = 'all 2s linear';
					var transform =
						'rotate(' + scope.shape.angle + 'deg) ' +
						'translate3d(0, -' + shape.offsetWidth / 2 + 'px, 0) ' +
						'translate3d(' + adjacentLength * 0 + 'px, 0px, 0px)';
					shape.style.webkitTransform = transform;
					shape.style.transform = transform;
				}

				// SOH-CAH-TOA and a2 + b2 = c2 joy
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