/* =====================================================
   Settings
======================================================== */

'use strict';

// Paths
var src = './src';
var dest = './deploy';
var root = './';

// Settings
var settings = {
  /* filename for the Js concatenation */
  jsConcatTo: 'main.js',
  /* browserSync server */
  browserSync: {
    server: {
      baseDir: root
    }
  },
  /* browserSync server, root and directory listing
  browserSync: {
    server: {
      baseDir: './',
      directory: true
    }
  },*/
  /* browserSync proxy to webserver, keep trailing / or it bugs
  browserSync: {
    proxy: 'http://192.168.1.183/git/gulp-starter-kit/' + dest + '/',
    host: '192.168.1.183',
    open: 'external'
  },*/
  /* ftp options
  ftp: {
    host: 'website.com',
    port: 21,
    user: 'johndoe',
    pass: '1234',
    remotePath: '/',
    src: dest + "/**"
  },*/
  /* image options */
  imagemin: {
    progressive: true,
    interlaced: true
  }
};

/* =====================================================
   Includes
======================================================== */

var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var cache = require('gulp-cache');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var ftp = require('gulp-ftp');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var cleancss = require('gulp-clean-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var stylish = require('jshint-stylish');
var runSequence = require('run-sequence');

var replace = require('gulp-token-replace');
var includer = require('gulp-file-includer');

var del = require('del');
var vinylPaths = require('vinyl-paths');
var fs = require('fs');
/* =====================================================
   Default Task
======================================================== */

gulp.task('default', function(callback) {
  runSequence(['build'], ['connect'], callback);
});

/* =====================================================
   Build Tasks
======================================================== */

gulp.task('build', ['observe-config', 'build-js', 'build-css', 'build-sass', 'build-markup', 'build-images', 'build-fonts', 'build-assets', 'build-page-html']);

gulp.task('clean', function() {
  return gulp.src(dest, {read: false})
	   .pipe(vinylPaths(del))
});

gulp.task('clean-temp', function() {
  return del(['./temp']);
});

/* OBSERVE CONFIG */
gulp.task('observe-config', function() {
  gulp.watch(['./config/**.*'], ['build', reload]);
});

gulp.task('page-includer', ['clean-temp'], function(){
  var config = JSON.parse(fs.readFileSync('./config/config.json'));
  return gulp.src(['./extras/index.html'])
    .pipe(includer({prefix:'$'}))
    .pipe(replace({global:config}))
    .pipe(gulp.dest('./temp'));
});

// Build page simulation with RichMediaLib and customAd.js
gulp.task('build-page-html', ['page-includer'], function() {
  gulp.watch(['./extras/**.*'], ['build-page-html', reload]);
  return gulp.src(['./temp/index.html'])
    .pipe(gulp.dest(dest));
});


// Concat & Uglify & Sourcemaps Js
gulp.task('build-js', ['lint-js'], function() {
  var config = JSON.parse(fs.readFileSync('./config/config.json'));
  gulp.watch([src + '/scripts/**/*.js'], ['build-js', reload]);
  return gulp.src([src + '/scripts/*.js'])
    .pipe(includer({prefix:'$'}))
    .pipe(replace({global:config}))
    .pipe(sourcemaps.init())
    .pipe(concat(settings.jsConcatTo))
    .pipe(gulp.dest(dest + '/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest + '/scripts'));
});

/* Compile & Uglify Js
gulp.task('compile-js', ['lint-js'], function() {
  return gulp.src([src + '/scripts/[!_]*.js'])
    .pipe(includer())
    .pipe(gulp.dest(dest + '/scripts'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(dest + '/scripts'));
});
*/

// JS Lint
gulp.task('lint-js', function() {
  return gulp.src([src + '/scripts/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

// Copy & Minify Css
gulp.task('build-css', function() {
  gulp.watch([src + '/styles/**/*.css'], ['build-css', 'build-sass', reload]);
  return gulp.src([src + '/styles/**/[!_]*.css'])
    .pipe(changed(dest + '/styles'))
    .pipe(gulp.dest(dest + '/styles'))
    .pipe(cleancss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(dest + '/styles'));
});

// Compile & Minify & Sourcemaps Sass
gulp.task('build-sass', function() {
  gulp.watch([src + '/styles/**/*.scss'], ['build-sass', reload]);
  return gulp.src([src + '/styles/**/[!_]*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write({includeContent: false})) // fix
    .pipe(sourcemaps.init({loadMaps: true})) // fix
    .pipe(gulp.dest(dest + '/styles'))
    .pipe(cleancss())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(dest + '/styles'));
});

// Copy Markup
gulp.task('build-markup', function() {
  var markupFiles = [src + '/*', src + '/**/*.{html,php}', src + '/.htaccess'];
  var config = JSON.parse(fs.readFileSync('./config/config.json'));
  gulp.watch(markupFiles, ['build-markup', reload]);
  return gulp.src(markupFiles)
    .pipe(changed(dest))
    .pipe(replace({global:config}))
    .pipe(gulp.dest(dest));
});

// Copy Images
gulp.task('build-images', function() {
  gulp.watch([src + '/images/**'], ['build-images', reload]);
  return gulp.src([src + '/images/**'])
    .pipe(changed(dest + '/images'))
    .pipe(gulpif(settings && settings.imagemin, cache(imagemin(settings.imagemin))))
    .pipe(gulp.dest(dest + '/images'));
});

// Copy Fonts
gulp.task('build-fonts', function() {
  gulp.watch([src + '/fonts/**'], ['build-fonts', reload]);
  return gulp.src([src + '/fonts/**'])
    .pipe(changed(dest + '/fonts'))
    .pipe(gulp.dest(dest + '/fonts'));
});

// Copy Assets
gulp.task('build-assets', function() {
  gulp.watch(['/assets/**'], ['build-assets', reload]);
  return gulp.src([src + '/assets/**'])
    .pipe(changed(dest + '/assets'))
    .pipe(gulp.dest(dest + '/assets'));
});

// Copy Extra (customAd.js / customUi.js)
gulp.task('build-extras', function() {
  gulp.watch(['/extras/**'], ['build-extras', reload]);
  return gulp.src([src + '/extras/**'])
    .pipe(changed(dest + '/extras'))
    .pipe(gulp.dest(dest + '/extras'));
});

/* =====================================================
   Connect Tasks
======================================================== */

gulp.task('connect', ['connect-sync', 'ftp']);

// Start Browser Sync
gulp.task('connect-sync', function() {
  if (settings && settings.browserSync) {
    return browserSync(settings.browserSync);
  }
});

// Upload to ftp
gulp.task('ftp', function() {
  if (settings && settings.ftp) {
    return gulp.src(settings.ftp.src)
      .pipe(ftp(settings.ftp));
  }
});
