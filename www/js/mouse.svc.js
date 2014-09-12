angular.module('convergence.services')

	.factory('mouse', function (game) {
		var svc = {
			setClickPosition: function setClickPosition(e) {
				if (game.playing) {
					svc.position.x = e.changedTouches[0].clientX;
					svc.position.y = e.changedTouches[0].clientY;
					console.log({ x: svc.position.x, y: svc.position.y });
				}
			},
			resetClickPosition: function resetClickPosition() {
				svc.position.x = undefined;
				svc.position.y = undefined;
			},
			position: {
				x: undefined,
				y: undefined
			}
		}
		return svc;
	});
