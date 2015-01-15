angular.module('convergence')

	.directive('timer', function ($rootScope, $interval, game) {
		'use strict';

		return {
			restrict: 'E',
			template: '<div class="timer text-center rounded fade" ng-if="dots.length > 0">' +
			'<span class="dot" ng-repeat="dot in dots track by $index">&bull;<span>' +
			'</div>',
			link: function (scope) {
				var ticker;

				$rootScope.$on('game.play', start);
				$rootScope.$on('$destroy', stop);

				function start() {
					stop();

					scope.dots = new Array(6);
					ticker = $interval(function () {
						scope.dots.pop();
						if (scope.dots.length === 0) outOfTime();
					}, (game.settings.timeLimit / 6) * 1000);
				}

				function outOfTime() {
					stop();
					$rootScope.$broadcast('game.out-of-time');
				}

				function stop() {
					if (typeof ticker !== 'undefined') {
						$interval.cancel(ticker);
						ticker = undefined;
						scope.dots = [];
					}
				}
			}
		};
	});