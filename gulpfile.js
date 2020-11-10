const gulp = require('gulp');
const gulpUglify = require('gulp-uglify');
const gulpUglifyCss = require('gulp-uglifycss');
const gulpClean = require('gulp-clean');
const pipeline = require('readable-stream').pipeline;

const clean = () =>
	gulp.src('dist/public', { read: false, allowEmpty: true }).pipe(gulpClean());

const copy = () => gulp.src(['public/**/*']).pipe(gulp.dest('dist/public'));

const uglifyScripts = () =>
	pipeline(
		gulp.src('public/js/*.js'),
		gulpUglify(),
		gulp.dest('dist/public/js')
	);

const uglifyStyles = () =>
	gulp
		.src('./public/css/*.css')
		.pipe(
			gulpUglifyCss({
				maxLineLen: 80,
				uglyComments: true
			})
		)
		.pipe(gulp.dest('./dist/public/css'));

exports.default = gulp.series(clean, copy, uglifyScripts, uglifyStyles);
