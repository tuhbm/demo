
$(document).ready(function(){// ページが読み込まれたら

	var	thumb = '#vol .thumb a',
		thumbImg = '#vol .thumb img',
		modalWindow = '#vol .modalWrWr',
		modalFigureWrWr = '#vol .modalWrWr .figureWrWr',
		modalFigureWr = '#vol .modalWrWr .figureWr',
		modalImg = '#vol .modalWrWr img',
		modalFigCaption = '#vol .modalWrWr figcaption',
		modalPrev = '#vol .modalWrWr .prev a',
		modalNext = '#vol .modalWrWr .next a',
		modalPhotoNum = '#vol .indicator .photoNum',
		modalDelete = '#vol .modalWr .delete';

	// 1)img要素の情報を取得してfigure要素として出力
	$(thumbImg).each(function(i) {
		var photo = $(this).attr('src'),
			text = $(this).attr('alt'),
			i = i+1,
			figureElm = '<figure class="no'+i+'"><img src="'+photo+'" width="100%"><figcaption>'+text+'</figcaption></figure>';
		$(modalFigureWr).append(figureElm);
	});
	var modalFigure = '#vol .modalWrWr figure';
	$(modalFigure).last().prependTo(modalFigureWr);// 最後のfigure要素を先頭に移動
	
	// 2)インジケーターの数字出力
	function photoNum() {
		var figureClassName = $(modalFigure).first().next().attr('class'),
			figureNum = figureClassName.slice(2);
			$(modalPhotoNum).text(figureNum);
	};
	photoNum();

	// 3)モーダルウィンドウを開く
	$(thumb).click(function(e) {
		$(modalWindow).css('display','block');

		var clickThumb = $(thumb).index(this);// クリックした要素のindex（先頭から何番目か）を取得
		if (clickThumb === 0) {
			var clickThumb = 21;
		}else if(clickThumb === 1){
			var clickThumb = 22;
		};
		var clickThumb = clickThumb-1,// 取得したindex番号を−1ずらす
			prevFigure = $(modalFigureWr).find('.no'+clickThumb),// クリックした要素の1つ手前に該当するfigure要素を取得 
			movingFigures = $(prevFigure).nextAll();// そのfigure要素を含む以降のfigure要素を全てを取得
		$(movingFigures).prependTo(modalFigureWr);// 先頭に移動させる（2番目の要素がカルーセル内に見える）

		function modalWindowFigure(){// モーダルウィンドウ画像幅の取得と出力
			modalFigureWidth = $(modalFigureWrWr).width();// グローバル変数
			$(modalFigureWr).css('margin-left',-+modalFigureWidth+'px');//ネガティブマージンで写真1つ分左にずらす
			$(modalFigure).css('width',modalFigureWidth);
		};
		modalWindowFigure();
		$(window).resize(function(){
			modalWindowFigure();
			console.log(modalFigureWidth);
		});

		photoNum();// インジケーターの数字出力

		e.preventDefault();
	});

	// 4)モーダルウィンドウを閉じる
	$(modalDelete).click(function(e) {
		$(modalWindow).css('display','none');
		e.preventDefault();
	});

	// 5)左右ボタンでスライド
	$(modalPrev).bind('click',function(e){//左ボタンで右スライド
		$(modalFigureWr).not(':animated').animate({
			marginLeft:0+'px'
			},200,'linear', 
			function(){
				$(modalFigureWr).css('margin-left',-+modalFigureWidth+'px');
				$(modalFigure).last().prependTo(modalFigureWr);
				photoNum();
			}
		);
		e.preventDefault();
	});
	$(modalNext).bind('click',function(e){//右ボタンで左スライド
		$(modalFigureWr).not(':animated').animate({
			marginLeft:-+modalFigureWidth*2+'px'
			},200,'linear', 
			function(){
				$(modalFigureWr).css('margin-left',-+modalFigureWidth+'px');
				$(modalFigure).first().appendTo(modalFigureWr);
				photoNum();
			}
		);
		e.preventDefault();
	});

	// 6)スワイプでスライド
	var startX,
		endX,
		diffX,
		absX;
	$(modalFigureWrWr).bind('touchstart', function() {
		startX = event.changedTouches[0].pageX;
		imgHalfWidth = Math.round(modalFigureWidth/2);
	});
	$(modalFigureWrWr).bind('touchmove', function(e) {
		endX = event.changedTouches[0].pageX;
		diffX = Math.round(startX - endX);// 差分
		absX = Math.abs(diffX);// 絶対値
		if (diffX > 0) {// 左スワイプで左に追従
			$(modalFigureWr).css('margin-left',-+modalFigureWidth+-+absX+'px');
		} else if (diffX < 0) {// 右スワイプで右に追従
			$(modalFigureWr).css('margin-left',-+modalFigureWidth+absX+'px');
		};
		e.preventDefault();
	});
	$(modalFigureWrWr).bind('touchend', function() {
		if (absX > imgHalfWidth) {//スライド距離が半分以上
			if (diffX > 0) {// 左スワイプで左スライド
				$(modalFigureWr).not(':animated').animate(
					{marginLeft:-+modalFigureWidth*2+'px'},200,'linear',
					function(){
						$(modalFigure).first().appendTo(modalFigureWr);
						$(modalFigureWr).css('margin-left',-+modalFigureWidth+'px');
						photoNum();
					}
				);
			} else if (diffX < 0) {// 右スワイプで右スライド
				$(modalFigureWr).not(':animated').animate(
					{marginLeft:0+'px'},200,'linear',
					function(){
						$(modalFigure).last().prependTo(modalFigureWr);
						$(modalFigureWr).css('margin-left',-+modalFigureWidth+'px');
						photoNum();
					}
				);
			};
		}else if(absX < imgHalfWidth){//スライド距離が半分未満
			$(modalFigureWr).animate({marginLeft: -+modalFigureWidth+'px'},200,'linear')
		};
	});
});