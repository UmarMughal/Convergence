angular.module('triangulate.directives')

	.directive('focalPoint', function () {
		return {
			require: '^board',
			restrict: 'E',
			scope: {},
			template: '<div id="focal-point" class="focal-point"></div>',
			link: function (scope, elem, attrs, board) {
				// Display focal point
				var focalPoint = document.getElementById('focal-point');
				focalPoint.style.top = board.focalPointY + 'px';
				focalPoint.style.left = board.focalPointX + 'px';
				focalPoint.style.display = 'block';
			}
		}
	});