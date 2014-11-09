var gulp = require('gulp'),
	concat = require('gulp-concat'),
	stylus = require("gulp-stylus"),
	uglify = require("gulp-uglify"),
	ngAnnotate = require("gulp-ng-annotate"),
	nodemon = require("gulp-nodemon"),
	jeet = require("jeet");

gulp.task('dev:server', function(){
	nodemon({
		script: 'server.js',
		ext: 'js',
		ignore: ['ng*', 'gulp*', 'assets*']
	});
});

gulp.task('js', function(){
	gulp.src(['ng/module.js','ng/**/*.js'])
		.pipe(concat('app.js'))
		.pipe(gulp.dest('assets'));
});

gulp.task("css", function () {  
	gulp.src("stylus/main.styl")
		.pipe(stylus({
			use: [jeet()]
		}))
		.pipe(gulp.dest("assets"));
});


gulp.task('watch:js', ['js'], function() {
	gulp.watch('ng/**/*.js', ['js']);
});


gulp.task('watch:css', function() {
	gulp.watch('stylus/**/*.styl', ['css']);
});

gulp.task('dev', ['watch:css', 'watch:js', 'dev:server']);