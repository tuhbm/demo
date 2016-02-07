// プラグインの読みこみ
var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');

// CSSスプライト
gulp.task( 'sprite', function() {
  function spriteCustom(retinaName) {// スプライト生成用の記述を関数化
    var retinaName = retinaName || '';// 引数の初期値を空に設定
    if (retinaName) {var spacingSize=20} else{var spacingSize=10};// Retina画像の場合は画像間の余白を2倍に
    var spriteData = gulp.src('./images/sprite'+retinaName+'/*'+retinaName+'.png')// 合体させる画像群
      .pipe(spritesmith({
        imgName:'sprite'+retinaName+'.png',// 生成されるスプライト画像のファイル名
        imgPath:'../images/sprite'+retinaName+'.png',// 生成されるスプライト用SCSSに記載されるスプライト画像パス
        cssName:'_sprite'+retinaName+'.scss',// 生成されるスプライト用SCSSのファイル名
        cssFormat:'scss',// 生成されるスプライト用SCSSの拡張子
        cssOpts: {// スプライト用SCSS内のmixinの記述をなくす
          functions: false
        },
        algorithm:'left-right',// 画像の並ぶ方向を横一列に
        algorithmOpts : {// 画像の並ぶ順をファイル名順に
          sort: false
        },
        padding:spacingSize,//画像と画像の間の余白
        cssSpritesheetName: 'sprite'+retinaName//@mixinするための変数名
      }));
    spriteData.img.pipe(gulp.dest('./images'));// 生成されるスプライト画像の保存先
    spriteData.css.pipe(gulp.dest('./sass'));// 生成されるスプライト用SCSSの保存先
  }
  spriteCustom();
  spriteCustom('_2x');//'_'は'-'に変換されるので注意
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