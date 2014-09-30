var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var connect = require('gulp-connect');

var paths = {
	sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass', 'connect', 'watch']);

gulp.task('sass', function (done) {
	gulp.src('./scss/ionic.app.scss')
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest('./www/css/'))
		.pipe(minifyCss({
			keepSpecialComments: 0
		}))
		.pipe(rename({ extname: '.min.css' }))
		.pipe(gulp.dest('./www/css/'))
		.on('end', done);
});

gulp.task('connect', function () {
	connect.server({
		root: 'www',
		port: 8001
	});
});

gulp.task('watch', function () {
	gulp.watch(paths.sass, ['sass']);
});