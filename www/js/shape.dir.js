angular.module('convergence.directives')

	.directive('shape', function ($rootScope, $timeout, game) {
		return {
			require: '^board',
			restrict: 'E',
			scope: {
				shape: '='
			},
			template: '<div class="shape {{ shape.shape }}"></div>',
			link: function (scope, elem, attrs, boardCtrl) {
				var shape = elem.find('div')[0];

				// Calculate distance to hide the shape off the screen.
				var adjacentLength = boardCtrl.calculateAdjacent(scope.shape.angle);

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

				var hintTimer = $timeout(hint, 100);

				$rootScope.$on('game.out-of-time', converge);

				scope.$on('$destroy', function () {
					if (angular.isDefined(hintTimer)) {
						$timeout.cancel(hintTimer);
						hintTimer = undefined;
					}
				});


				// Functions 
				// -------------------------------------

				// Move shape inward slightly to provide a hint to the gamer
				function hint() {
					shape.style.transition = 'all 0.3s linear';
					var transform =
						'rotate(' + scope.shape.angle + 'deg) ' +
						'translate3d(0, -' + shape.offsetWidth / 2 + 'px, 0) ' +
						'translate3d(' + adjacentLength * game.settings.hint + 'px, 0px, 0px)';
					shape.style.webkitTransform = transform;
					shape.style.transform = transform;
				}

				// Move the shape inward all the way to the focal point
				function converge() {
					shape.style.transition = 'all 0.75s linear';
					var transform =
						'rotate(' + scope.shape.angle + 'deg) ' +
						'translate3d(0, -' + shape.offsetWidth / 2 + 'px, 0) ' +
						'translate3d(0px, 0px, 0px)';
					shape.style.webkitTransform = transform;
					shape.style.transform = transform;
				}
			}
		}
	});