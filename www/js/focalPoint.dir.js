angular.module('convergence.directives')

	.directive('focalPoint', function ($rootScope) {
		return {
			require: '^board',
			restrict: 'E',
			scope: {},
			template: '<div id="focal-point" class="focal-point"></div>',
			link: function (scope, elem, attrs, board) {

				$rootScope.$on('play', postionFocalPoint);


				// Functions 
				// -------------------------------------

				function postionFocalPoint() {
					var focalPoint = document.getElementById('focal-point');
					focalPoint.style.top = board.focalPointY + 'px';
					focalPoint.style.left = board.focalPointX + 'px';
					//focalPoint.style.display = 'block';
				}
			}
		}
	});