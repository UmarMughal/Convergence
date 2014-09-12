angular.module('convergence.services')

	.factory('game', function () {
		return {
			settings: {
				playing: false,
				level: 0,
				timeLimit: 0
			}
		}
	});
