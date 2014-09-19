angular.module('convergence.directives')

	.directive('pin', function ($rootScope, game) {
		return {
			restrict: 'E',
			template: '<div class="pin"></div>',
			link: function (scope, elem) {
				var pin = elem.find('div')[0];

				$rootScope.$on('game.play', remove);
				$rootScope.$on('game.drop-pin', drop);
				$rootScope.$on('game.over', remove);
				$rootScope.$on('$destroy', remove);


				// Functions 
				// -------------------------------------

				function drop(e, pinPosition) {
					pin.classList.remove('dropped');
					pin.style.top = pinPosition.y + 'px';
					pin.style.left = pinPosition.x + 'px';
					pin.classList.add('dropped');
				}

				function remove() {
					pin.classList.remove('dropped');
				}
			}
		}
	});