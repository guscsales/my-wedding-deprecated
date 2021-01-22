const gulp = require('gulp');
const gulpUglify = require('gulp-uglify');
const gulpUglifyCss = require('gulp-uglifycss');
const pipeline = require('readable-stream').pipeline;

const copy = () => gulp.src(['src/**/*']).pipe(gulp.dest('dist'));

const uglifyScripts = () =>
	pipeline(
		gulp.src('src/js/*.js'),
		gulpUglify(),
		gulp.dest('dist/js')
	);

const uglifyStyles = () =>
	gulp
		.src('./src/css/*.css')
		.pipe(
			gulpUglifyCss({
				maxLineLen: 80,
				uglyComments: true
			})
		)
		.pipe(gulp.dest('./dist/css'));

exports.default = gulp.series(copy, uglifyScripts, uglifyStyles);
