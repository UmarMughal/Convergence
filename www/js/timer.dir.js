angular.module('convergence.directives')

	.directive('timer', function ($rootScope, $interval, game) {
		return {
			restrict: 'E',
			template: '<div id="timer" class="timer text-center">' +
				'<span class="dot" ng-repeat="dot in dots track by $index">&bull;<span>' +
				'</div>',
			link: function (scope) {
				var _this = this;
				var timer = document.getElementById('timer');

				var ticker;

				function start() {
					if (angular.isDefined(ticker)) stop();

					scope.dots = new Array(game.settings.timeLimit);
					ticker = $interval(function () {
						scope.dots.pop();
						if (scope.dots.length == 0) outOfTime();
					}, 1000, game.settings.timeLimit);
				}

				function outOfTime() {
					stop();
					$rootScope.$broadcast('out-of-time');
				}

				function stop() {
					if (angular.isDefined(ticker)) {
						$interval.cancel(ticker);
						ticker = undefined;
						scope.dots = [];
					}
				}

				$rootScope.$on('play', function () {
					start();
				});

				$rootScope.$on('reset', function () {
					stop();
				});

				$rootScope.$on('$destroy', function () {
					stop();
				});
			}
		}
	});