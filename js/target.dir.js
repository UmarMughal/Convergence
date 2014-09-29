angular.module('convergence.directives')

	.directive('target', function ($rootScope, game, TARGET) {
		return {
			require: '^board',
			restrict: 'E',
			scope: {},
			template: '<div class="target"></div>',
			link: function (scope, elem, attrs, boardCtrl) {

				var target = elem.find('div')[0];

				$rootScope.$on('game.play', positionTarget);
				$rootScope.$on('game.end-of-level', showTarget);
				$rootScope.$on('game.reset', hideTarget);


				// Functions
				// -------------------------------------

				function positionTarget() {
					hideTarget();
					if (game.settings.target === TARGET.none) return;
					var targetSize = game.settings.target * boardCtrl.width;
					target.style.top = (boardCtrl.focalPointY - (targetSize / 2)) + 'px';
					target.style.left = (boardCtrl.focalPointX - (targetSize / 2)) + 'px';
					target.style.width = target.style.height = targetSize + 'px';
				}

				function hideTarget() {
					target.classList.remove('reveal');
				}

				function showTarget() {
					if (game.settings.target === TARGET.none) return;
					target.classList.add('reveal');
				}
			}
		}
	});