angular.module('triangulate.services')

	.factory('randomInt', function () {
		return {
			generate: function generate(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
		}
	});
