var gulp = require('gulp'),
	concat = require('gulp-concat'),
	stylus = require("gulp-stylus"),
	uglify = require("gulp-uglify"),
	ngAnnotate = require("gulp-ng-annotate"),
	nodemon = require("gulp-nodemon"),
	jeet = require("jeet"),
	typographic = require("typographic"),
	rupture = require("rupture");

gulp.task('dev:server', function(){
	nodemon({
		script: 'server.js',
		ext: 'js',
		ignore: ['ng*', 'gulp*', 'assets*']
	});
});

gulp.task('js', function(){
	gulp.src(['ng/module.js','ng/**/*.js'])
	    .pipe(ngAnnotate())
	    .pipe(uglify())	
		.pipe(concat('app.js'))
		.pipe(gulp.dest('assets'));
});

gulp.task("css", function () {  
	gulp.src("stylus/main.styl")
		.pipe(stylus({
			use: [jeet(),rupture(), typographic()]
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