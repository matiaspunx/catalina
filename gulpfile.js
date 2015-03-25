/**
 *
 *  Punx Starter Kit 
 *  Un template para ayudarte a crear rapidamente cualquier tipo de web app.
 *  Copyright 2015, Matias Punx - tw: @antirockstars
 *
 */
'use strict';

function formatDate() {
  var today = new Date(),
    month = today.getMonth() + 1,
    day = today.getDate();

  month = month > 9 ? month : "0" + month;
  day = day > 9 ? day : "0" + day;

  return day +'/'+(month +'/'+today.getFullYear() ) + ' ' + today.getHours() + ":"+ today.getMinutes();
}

var pkg = require('./package.json');

var banner = ['/**',
  ' * ',
  ' *   Catalina - <%= pkg.description %>',
  ' *   @version v<%= pkg.version %> - '+formatDate(),
  ' *   @author <%= pkg.author %>',
  ' * ',
  ' */\n\n',
  ''].join('\n');

var gulp = require('gulp');

gulp.task('clean', function (cb) {
    require('rimraf')('dist', cb);
});

gulp.task('lint', function () {
    var jshint = require('gulp-jshint');

    return gulp.src('app/scripts/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('sass', function () {
    var sass = require('gulp-sass');
    var autoprefixer = require('gulp-autoprefixer');

    return gulp.src('app/scss/*.scss')
        .pipe(sass({
            precision: 10
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/styles'));
});

gulp.task('images', function () {
    var cache = require('gulp-cache'),
        imagemin = require('gulp-imagemin');

    return gulp.src('app/images/**/*')
        .pipe(cache(imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function () {
    return gulp.src('app/fonts/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('misc', function () {
    return gulp.src([
            'app/*.{ico,png,txt}',
            'node_modules/apache-server-configs/dist/.htaccess'
        ])
        .pipe(gulp.dest('dist'));
});

gulp.task('html', ['sass'], function () {
    var uglify = require('gulp-uglify'),
        minifyCss = require('gulp-minify-css'),
        useref = require('gulp-useref'),
        gulpif = require('gulp-if'),
        assets = useref.assets();

    return gulp.src('app/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/scss/**/*.scss')
        .pipe(wiredep({directory: 'app/bower_components'}))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('connect', function () {
    var connect = require('connect');
    var serveStatic = require('serve-static');
    var serveIndex = require('serve-index');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(serveStatic('app'))
        .use(serveIndex('app'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect', 'sass'], function () {
    var livereload = require('gulp-livereload');

    livereload.listen();

    require('opn')('http://localhost:9000');

    // watch for changes
    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ]).on('change', livereload.changed);

    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('bower.json', ['wiredep']);
});

gulp.task('build', ['html', 'images', 'fonts', 'misc']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});