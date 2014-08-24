var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    minifyCSS = require('gulp-minify-css'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    mainBowerFiles = require('main-bower-files'),
    embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;

var publishDirectory = 'dist';

var dist = {
  css: publishDirectory + '/css/',
  js: publishDirectory + '/js/',
  views: publishDirectory + '/views/'
}

gulp.task('clean', function () {
  gulp.src('dist/**/*.*', { read: false })
  .pipe(rimraf());
});

gulp.task('bower', function() {
  gulp.src(mainBowerFiles({ filter: /[\/\w+]*.js/ }), { base: 'app/bower_components' })
  .pipe(concat('vendor.js'))
  .pipe(gulp.dest(dist.js));

  gulp.src(mainBowerFiles({ filter: /[\/\w+]*.css/ }), { base: 'app/bower_components' })
  .pipe(concat('vendor.css'))
  .pipe(gulp.dest(dist.css));
})

gulp.task('browserify', function() {
  gulp.src(['app/scripts/main.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest(dist.js))
  .pipe(refresh(lrserver));
});

gulp.task('styles', function() {
  var opts = { comments: true, spare: true };
  gulp.src('app/**/*.scss')
  .pipe(sass({onError: function(e) { console.log(e); } }))
  .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
  .pipe(minifyCSS(opts))
  .pipe(gulp.dest(dist.css))
  .pipe(refresh(lrserver));
});

gulp.task('views', function() {
  gulp.src('app/views/**/*.jade')
  .pipe(jade().on('error', function(err) { console.log(err); }))
  .pipe(gulp.dest(dist.views))
  .pipe(refresh(lrserver));

  gulp.src('app/index.jade')
  .pipe(jade().on('error', function(err) { console.log(err); }))
  .pipe(gulp.dest('dist/'))
  .pipe(refresh(lrserver));
});

gulp.task('watch', function() {
  gulp.watch(['app/scripts/*.js', 'app/scripts/**/*.js'], [
    'browserify'
  ]);

  gulp.watch(['app/index.jade', 'app/views/**/*.jade'], [
    'views'
  ]);

  gulp.watch(['app/styles/**/*.scss'], [
    'styles'
  ]);
});

var server = express();
server.use(livereload({port: livereloadport}));
server.use(express.static('./dist'));
server.all('/*', function(req, res) {
  res.sendFile('index.html', { root: 'dist' });
});

// Dev task
gulp.task('default', ['clean', 'browserify', 'bower', 'styles', 'views', 'watch'], function() {
  server.listen(serverport);
  lrserver.listen(livereloadport);
});
