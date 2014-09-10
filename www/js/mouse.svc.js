angular.module('triangulate.services')

	.factory('mouse', function () {
		return {
			getClickPosition: function getClickPosition(e) {
				console.log({ x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY });
			}
		}
	});
