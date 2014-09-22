angular.module('convergence.services')

	.factory('game', function (SHAPE, HINT, TARGET) {

		function init() {
			return {
				level: 1,
				noOfShapes: 6,
				typeOfShapes: SHAPE.square,
				timeLimit: 4,
				hint: HINT.large,
				target: TARGET.none,
				pixels: Math.ceil((window.outerWidth * 2) / 100) * 100
			};
		}

		var game = {
			pinEnabled: false,
			settings: new init(),
			setLevel: function setLevel(level) {
				if (level === 1)
					buildLevel(level, 6, 4, HINT.large, TARGET.none);
				else if (level === 2)
					buildLevel(level, 5, 3, HINT.medium, TARGET.none);
				else if (level === 3)
					buildLevel(level, 4, 3, HINT.medium, TARGET.large);
				else if (level >= 4)
					buildLevel(level, 3, 2, HINT.medium, TARGET.large);

				else
					buildLevel(1, 6, 3, HINT.large, TARGET.none); // Level 1
			},
			nextLevel: function () {
				game.setLevel(game.settings.level + 1);
			},
			reset: function () {
				game.settings = new init();
			}
		}

		function buildLevel(level, noOfShapes, timeLimit, hint, target) {
			game.settings.level = level;
			game.settings.noOfShapes = noOfShapes;
			game.settings.typeOfShapes = level % 2 === 0 ? SHAPE.circle : SHAPE.square;
			game.settings.timeLimit = timeLimit;
			game.settings.hint = hint;
			game.settings.target = target;
			if (level == 1)
				game.settings = new init();
		}

		return game;
	});