angular.module('convergence')

	.directive('focalPoint', function ($rootScope) {
		'use strict';

		return {
			require: '^board',
			restrict: 'E',
			scope: {},
			template: '<div class="focal-point circle"></div>',
			link: function (scope, elem, attrs, boardCtrl) {

				var focalPoint = elem.find('div')[0];

				$rootScope.$on('game.reset', hideFocalPoint);
				$rootScope.$on('game.play', positionFocalPoint);
				$rootScope.$on('game.level-complete', showFocalPoint);
				$rootScope.$on('game.over', showFocalPoint);


				// Functions 
				// -------------------------------------

				function positionFocalPoint() {
					hideFocalPoint();
					focalPoint.style.top = boardCtrl.focalPointY - 8 + 'px';
					focalPoint.style.left = boardCtrl.focalPointX - 8 + 'px';
				}

				function hideFocalPoint() {
					focalPoint.classList.remove('reveal');
				}

				function showFocalPoint() {
					focalPoint.classList.add('reveal');
				}
			}
		};
	});