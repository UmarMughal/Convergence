angular.module('convergence')

	.directive('pin', function ($rootScope) {
		'use strict';

		return {
			restrict: 'E',
			template: '<div class="pin circle"></div>',
			link: function (scope, elem) {
				var pin = elem.find('div')[0];

				$rootScope.$on('game.play', remove);
				$rootScope.$on('game.drop-pin', drop);
				$rootScope.$on('game.reset', remove);
				$rootScope.$on('$destroy', remove);


				// Functions 
				// -------------------------------------

				function drop(e, pinPosition) {
					pin.classList.remove('dropped');
					pin.style.top = pinPosition.y - 8 + 'px';
					pin.style.left = pinPosition.x - 8 + 'px';
					pin.classList.add('dropped');
				}

				function remove() {
					pin.classList.remove('dropped');
				}
			}
		};
	});