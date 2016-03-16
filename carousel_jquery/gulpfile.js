// プラグインの読みこみ
var gulp = require('gulp');
var sass = require('gulp-sass');

// タスクの定義

// Sassコンパイル
gulp.task( 'sass', function() {
  gulp.src( 'sass/*.scss' )
  .pipe(sass({ outputStyle: 'expand' }))
  .pipe(gulp.dest('./css'));
});

// タスクの監視
gulp.task('watch', function(){
    gulp.watch('sass/*.scss', ['sass']);
});

// タスクのデフォルト設定
gulp.task('default',['watch']);