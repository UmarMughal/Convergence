angular.module('convergence', [
	'ionic',
	'ngCordova'
])

	.constant('SHAPE', {
		square: 'square',
		circle: 'circle'
	})

	.constant('HINT', {
		small: 0.7,
		large: 0.65
	})

	.run(function ($ionicPlatform, $cordovaSplashscreen, $cordovaStatusbar) {
		'use strict';

		$ionicPlatform.ready(function () {
			$cordovaSplashscreen.hide();
			$cordovaStatusbar.style(1);
		});
	});
