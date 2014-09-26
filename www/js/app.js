angular.module('convergence', [
	'ionic',
	'convergence.directives',
	'convergence.services',
	'convergence.controllers'
])

	.constant('TARGET', {
		small: 150,
		large: 250,
		none: 0
	})

	.constant('SHAPE', {
		square: 'square',
		circle: 'circle'
	})

	.constant('HINT', {
		small: 0.85,
		medium: 0.75,
		large: 0.65
	})

	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});
	});

