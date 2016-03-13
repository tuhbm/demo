
$(document).ready(function(){// ページが読み込まれたら

	var indexImg = '#index .topTitleWr'
		volIndexImg = '#volIndex .titleWr',
		volImg  = '#vol .titleWr',
		ep3term = '#vol .txt .term',
		modalWindow = '#vol .modalWrWr',
		termWindow = '#vol .termWindow',
		modalDelete = '#vol .modalWr .delete',
		storyTitle = '.sideStory .story .storyTitle a',
		storyClose = '.sideStory .story .close a';

	// 画像の伸縮
	function topImg(){// トップ画像の伸縮関数
		winWidth = $(window).width();
		if(winWidth<=500){
			img_height = Math.round(winWidth*34/75);
			$(indexImg).css('height',img_height);
		}else if(winWidth>500&&winWidth<=700){
			img_height = Math.round(winWidth*34/75);
			$(indexImg).css('height',img_height);
		}else if(winWidth>700&&winWidth<=950){
			img_height = Math.round(winWidth*1/6);
			$(indexImg).css('height',img_height);
		}else if(winWidth>950){
			img_height = Math.round(475/3);
			$(indexImg).css('height',img_height);
		}
	};
	function episodeImg(imgElm){// 各エピソード画像の伸縮関数
		winWidth = $(window).width();
		if(winWidth<=500){
			img_height = Math.round(winWidth*15/32);
			$(imgElm).css('height',img_height);
		}else if(winWidth>500&&winWidth<=950){
			img_height = Math.round(winWidth*3/19);
			$(imgElm).css('height',img_height);
		}else if(winWidth>950){
			$(imgElm).css('height',150);
		}
	};
	
	topImg();
	episodeImg(volIndexImg);
	episodeImg(volImg);

	$(window).resize(function(){// 画面幅を操作時に関数を実行
		topImg();
		episodeImg(volIndexImg);
		episodeImg(volImg);
	});

	// モーダルウィンドウを開く
	$(ep3term).click(function(e) {
		$(modalWindow).css('display','block');
		$(termWindow).load($(this).attr("href"));
		e.preventDefault();
	});

	// モーダルウィンドウを閉じる
	$(modalDelete).click(function(e) {
		$(modalWindow).css('display','none');
		e.preventDefault();
	});

	// side storyの開閉
	$(storyTitle).click(function(e) {
		if ($(this).parent().parent().hasClass('open')) {
			$(this).parent().parent().removeClass('open');
		} else{
			$(this).parent().parent().addClass('open');
		};
		e.preventDefault();
	});
	$(storyClose).click(function(e) {
		$(this).parent().parent().parent().removeClass('open');
		e.preventDefault();
	});

});