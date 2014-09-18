angular.module('convergence.directives')

	.directive('timer', function ($rootScope, $interval, game) {
		return {
			restrict: 'E',
			template: '<div class="timer text-center">' +
				'<span class="dot" ng-repeat="dot in dots track by $index">&bull;<span>' +
				'</div>',
			link: function (scope) {
				var ticker;

				function start() {
					if (angular.isDefined(ticker)) stop();

					scope.dots = new Array(6);
					ticker = $interval(function () {
						scope.dots.pop();
						if (scope.dots.length == 0) outOfTime();
					}, (game.settings.timeLimit / 6) * 1000);
				}

				function outOfTime() {
					stop();
					$rootScope.$broadcast('game.out-of-time');
				}

				function stop() {
					if (angular.isDefined(ticker)) {
						$interval.cancel(ticker);
						ticker = undefined;
						scope.dots = [];
					}
				}

				$rootScope.$on('game.play', function () {
					start();
				});

				$rootScope.$on('$destroy', function () {
					stop();
				});
			}
		}
	});