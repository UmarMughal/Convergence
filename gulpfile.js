var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var open = require("gulp-open");

var paths = {
	sass: ['./scss/**/*.scss']
};

gulp.task('default', ['lint', 'sass', 'connect', 'watch']);

gulp.task('lint', function () {
	gulp.src('./www/js/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter(stylish));
});

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

gulp.task("open", function () {
	var options = {
		url: "http://localhost:8001/"
	};
	return gulp.src("dist/index.html")
	.pipe(open("", options));
});