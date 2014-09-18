angular.module('convergence.services')

	.factory('game', function () {
		var SHAPE = {
			square: 'square',
			circle: 'circle',
			multi: 'multi'
		};

		var HINT = {
			small: 0.8,
			medium: 0.65,
			large: 0.5
		};

		var TARGET = {
			small: 25,
			medium: 50,
			large: 100,
			none: 0
		};

		var game = {
			pinEnabled: false,
			settings: {
				level: 1,
				noOfShapes: 6,
				typeOfShapes: SHAPE.square,
				timeLimit: 4,
				hint: HINT.large,
				target: TARGET.none,
				pixels: 10000
			},
			setLevel: function setLevel(level) {
				if (level === 1)
					buildLevel(level, 6, SHAPE.square, 4, HINT.large, TARGET.none);
				else if (level === 2)
					buildLevel(level, 5, SHAPE.circle, 4, HINT.large, TARGET.none);
				else if (level === 3)
					buildLevel(level, 5, SHAPE.square, 4, HINT.large, TARGET.none);
				else if (level === 4)
					buildLevel(level, 5, SHAPE.circle, 4, HINT.medium, TARGET.none);
				else if (level === 5)
					buildLevel(level, 4, SHAPE.square, 4, HINT.medium, TARGET.none);
				else if (level === 6)
					buildLevel(level, 4, SHAPE.circle, 3, HINT.medium, TARGET.none);
				else if (level === 7)
					buildLevel(level, 4, SHAPE.square, 3, HINT.medium, TARGET.large);
				else if (level === 8)
					buildLevel(level, 4, SHAPE.circle, 3, HINT.medium, TARGET.large);
				else if (level === 9)
					buildLevel(level, 4, SHAPE.square, 3, HINT.medium, TARGET.medium);
				else if (level === 10)
					buildLevel(level, 4, SHAPE.circle, 3, HINT.medium, TARGET.medium);
				else if (level === 11)
					buildLevel(level, 4, SHAPE.square, 2, HINT.small, TARGET.medium);
				else if (level === 12)
					buildLevel(level, 4, SHAPE.circle, 2, HINT.small, TARGET.medium);
				else if (level === 13)
					buildLevel(level, 4, SHAPE.square, 2, HINT.small, TARGET.small);
				else if (level === 14)
					buildLevel(level, 3, SHAPE.circle, 2, HINT.small, TARGET.small);
				else if (level === 15)
					buildLevel(level, 3, SHAPE.square, 2, HINT.small, TARGET.small);
				else if (level > 15)
					buildLevel(level, 3, SHAPE.multi, 2, HINT.small, TARGET.small);
				else
					buildLevel(1, 6, SHAPE.square, 4, HINT.large, TARGET.none); // Level 1
			},
			nextLevel: function () {
				game.setLevel(game.settings.level + 1);
			}
		}

		function buildLevel(level, noOfShapes, typeOfShapes, timeLimit, hint, target) {
			game.settings.level = level;
			game.settings.noOfShapes = noOfShapes;
			game.settings.typeOfShapes = typeOfShapes;
			game.settings.timeLimit = timeLimit;
			game.settings.hint = hint;
			game.settings.target = target;
			if (level == 1)
				game.settings.pixel = 1000;
		}

		return game;
	});