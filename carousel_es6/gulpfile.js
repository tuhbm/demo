// プラグインの読みこみ
var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

// Sassコンパイル
gulp.task( 'sass', function() {
  gulp.src( './sass/*.scss' )
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'));
});
// JS文法チェック
gulp.task('jshint', function() {
  gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
// ES6コンパイル
gulp.task('babel', function() {
  gulp.src('./es6/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./js'));
});

// 本番化タスク
// CSS圧縮
gulp.task('cssmin', function () {
  gulp.src( './sass/*.scss' )
    .pipe(plumber())
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(rename({ suffix: '-1.0.0' }))
    .pipe(gulp.dest('./dist/css'));
});

// JS圧縮
gulp.task('jsmin', function(){
  gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(rename({ suffix: '-1.0.0' }))
    .pipe(gulp.dest('./dist/js'));
});

// 画像圧縮
gulp.task('imgmin', function () {
  gulp.src( './img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./images'));
});

// 監視
gulp.task('watch', function(){
  gulp.watch('./sass/*.scss', ['sass']);
  gulp.watch('./es6/*.js', ['babel']);
  gulp.watch('./js/*.js', ['jshint']);
});

// デフォルトタスク
gulp.task('default',['watch']);