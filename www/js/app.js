angular.module('convergence', [
	'ionic',
	'ngCordova',
	'convergence.directives',
	'convergence.services',
	'convergence.controllers'
])

	.constant('SHAPE', {
		square: 'square',
		circle: 'circle'
	})

	.constant('HINT', {
		small: 0.7,
		large: 0.65
	})

.run(function ($timeout, $ionicPlatform, $cordovaSplashscreen, $cordovaStatusbar, $cordovaKeyboard) {
	'use strict';

	$ionicPlatform.ready(function () {
		$cordovaSplashscreen.hide();
		$cordovaKeyboard.hideAccessoryBar(true);
		$cordovaStatusbar.style(1);
	});
});
