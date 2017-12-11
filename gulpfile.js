var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var mqpacker = require('css-mqpacker');
var rename = require('gulp-rename');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var run = require('run-sequence');
var del = require('del');
var ftp = require('vinyl-ftp');

gulp.task('style', function() {
	gulp.src('less/style.less')
		.pipe(plumber())
		.pipe(less())
		.pipe(postcss([
			autoprefixer({browsers: ['last 10 versions']}),
			mqpacker({sort: true})
		]))


		.pipe(gulp.dest('css'))
		.pipe(csso())
		.pipe(rename('style-min.css'))
		.pipe(gulp.dest('css'))
		.pipe(server.reload({stream: true}));
});


gulp.task('images', function() {
	return gulp.src('img/**/*.{png,jpg,gif}')
		.pipe(imagemin([
			imagemin.optipng({optimizationLevel: 3}),
			imagemin.jpegtran({progressive: true})
			]))
		.pipe(gulp.dest('img'))
});

gulp.task('symbols', function() {
	return gulp.src('img/icons/*.svg')
		.pipe(svgmin())
		.pipe(svgstore({
			inlineSvg: true
			}))
		.pipe(rename('symbols.svg'))
		.pipe(gulp.dest('img'))
});

gulp.task('serve', function() {
	server.init({
		server: '.'
	});

	gulp.watch(['less/*.less', 'less/blocks/*.less'], ['style']);
	gulp.watch('*.html').on('change', server.reload);
	gulp.watch('js/*.js').on('change', server.reload);
});

gulp.task('copy', function() {
	return gulp.src(['img/**', 'js/**', '*.html'], {base: '.'})
		.pipe(gulp.dest('build'));
});

gulp.task('clean', function() {
	return del('build');
});

gulp.task('build' ,function(fn) {
	run('clean', 'copy', 'style', 'images', 'symbols', fn);
});

//ftp 
gulp.task('send', function() {
	var conn = ftp.create({
		host: 'ftp.s44.freehost.com.ua',
		user: 'gskonline',
		password: 'YazdWiNeb1',
		parallel: 5
	});

	 var globs = [
        './**',
        '!node_modules',
        '!files'
    ];



	return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( '/' ) )  
        .pipe( conn.dest( '/' ) );
});
