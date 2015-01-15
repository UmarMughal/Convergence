angular.module('convergence')

	.factory('game', function (SHAPE, HINT) {
		'use strict';

		function Settings() {
			return {
				level: 1,
				noOfShapes: 6,
				typeOfShapes: SHAPE.square,
				timeLimit: 3,
				hint: HINT.large,
				target: 0.6
			};
		}

		var game = {
			pinEnabled: false,
			settings: new Settings(),
			setLevel: function setLevel(level) {
				if (level === 1)
					buildLevel(level, 6, HINT.large);
				else if (level === 2)
					buildLevel(level, 5, HINT.large);
				else if (level >= 3 && level < 6)
					buildLevel(level, 4, HINT.large);
				else if (level >= 6 && level < 9)
					buildLevel(level, 3, HINT.small);
				else if (level >= 9)
					buildLevel(level, 3, HINT.small);
				else
					buildLevel(1, 6, HINT.large); // Level 1
			},
			nextLevel: function () {
				game.setLevel(game.settings.level + 1);
			},
			reset: function () {
				game.settings = new Settings();
			}
		};

		function buildLevel(level, noOfShapes, hint) {
			if (level === 1) {
				game.settings = new Settings();
				return;
			}
			game.settings.level = level;
			game.settings.noOfShapes = noOfShapes;
			game.settings.typeOfShapes = level % 2 === 0 ? SHAPE.circle : SHAPE.square;
			game.settings.hint = hint;
			if (game.settings.target > 0.3) game.settings.target = game.settings.target - 0.02;
		}

		return game;
	});