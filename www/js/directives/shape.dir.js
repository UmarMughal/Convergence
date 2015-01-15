angular.module('convergence')

	.directive('shape', function ($rootScope, $timeout, game) {
		'use strict';

		return {
			require: '^board',
			restrict: 'E',
			scope: {
				shape: '='
			},
			template: '<div class="shape {{ shape.shape }}"></div>',
			link: function (scope, elem, attrs, boardCtrl) {
				var shape = elem.find('div')[0];
				shape.style.width = shape.style.height = boardCtrl.width > boardCtrl.height ? (boardCtrl.width * 2.5) + 'px' : (boardCtrl.height * 2.5) + 'px';

				// Calculate distance to hide the shape off the screen.
				var adjacentLength = boardCtrl.calculateAdjacent(scope.shape.angle);

				// Move the shape off the screen
				var transform =
					'rotate(' + scope.shape.angle + 'deg) ' +
					'translate3d(' + adjacentLength + 'px, -' + shape.offsetWidth / 2 + 'px, 0px)';
				shape.style.top = boardCtrl.focalPointY + 'px';
				shape.style.left = boardCtrl.focalPointX + 'px';
				shape.style.transform = transform;
				shape.style.webkitTransform = transform;
				shape.style.background = scope.shape.color;

				var hintTimer = $timeout(hint, 100);

				$rootScope.$on('game.out-of-time', converge);

				scope.$on('$destroy', function () {
					if (typeof hintTimer !== 'undefined') {
						$timeout.cancel(hintTimer);
						hintTimer = undefined;
					}
				});


				// Functions 
				// -------------------------------------

				// Move shape inward slightly to provide a hint to the gamer
				function hint() {
					shape.style.transition = 'all 0.75s linear';
					var transform =
						'rotate(' + scope.shape.angle + 'deg) ' +
						'translate3d(' + adjacentLength * game.settings.hint + 'px, -' + shape.offsetWidth / 2 + 'px, 0px)';
					shape.style.transform = transform;
					shape.style.webkitTransform = transform;
				}

				// Move the shape inward all the way to the focal point
				function converge() {
					shape.style.transition = 'all 0.75s linear';
					var transform =
						'rotate(' + scope.shape.angle + 'deg) ' +
						'translate3d(0px, -' + shape.offsetWidth / 2 + 'px, 0px)';
					shape.style.transform = transform;
					shape.style.webkitTransform = transform;
				}
			}
		};
	});