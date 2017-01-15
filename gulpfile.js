var gulp = require("gulp"),
	$ = require("gulp-load-plugins")( {
		lazy: true
	}),
	browserSync = require("browser-sync");
	
gulp.task("css", function() {	
	gulp.src("sass/main.scss").pipe($.plumber()).pipe($.sass.sync({
		outputStyle: "compressed"
	})).pipe($.autoprefixer({
			browsers: ["last 5 version", "IE 9"]})).pipe(gulp.dest("css")).pipe(browserSync.stream());
});

gulp.task("watch", function() {	
	gulp.watch("sass/**/*.scss", ["css"]);	
});

gulp.task("server", function() {
	browserSync.init({
		server: "./"
	});
});

gulp.task("html", function() {
	gulp.src("./*.html").pipe($.useref()).pipe($.if("*.js", $.uglify())).pipe(gulp.dest("dist/"));
});

gulp.task("images", function() {
	gulp.src("media/images/*", {
		base: "meida/"
	}).pipe($.imagemin()).pipe(gulp.dest("dist/"));
});

gulp.task("default", ["css", "server", "watch"]);

/*przydatne
run-sequence
vinyl-ftp
yargs
util
load-plugins
*/ 
