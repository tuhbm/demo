// プラグインの読みこみ
var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');

// タスクの定義

// CSSスプライト
gulp.task( 'sprite', function() {
    var spriteData = gulp.src('./images/sprite/*.png')// 合体させる画像群
      .pipe(spritesmith({
        imgName:'sprite.png',// 生成されるスプライト画像のファイル名
        imgPath:'../images/sprite.png',// 生成されるスプライト用SCSSに記載されるスプライト画像パス
        cssName:'_sprite.scss',// 生成されるスプライト用SCSSのファイル名
        cssFormat:'scss',// 生成されるスプライト用SCSSの拡張子
        algorithm:'left-right',// 画像の並ぶ方向を横一列に
        algorithmOpts : {// 画像の並ぶ順をファイル名順に
          sort: false
        },
        padding:10//画像と画像の間の余白
      }));
    spriteData.img.pipe(gulp.dest('./images'));// 生成されるスプライト画像の保存先
    spriteData.css.pipe(gulp.dest('./sass'));// 生成されるスプライト用SCSSの保存先
});

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