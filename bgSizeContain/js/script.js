$(document).ready(function(){

	var volIndexImg = '.heightCalculate';

	// 要素の伸縮
	function episodeImg(imgElm){
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
	episodeImg(volIndexImg);
	
	// 画面幅を操作時に関数を実行
	$(window).resize(function(){
		episodeImg(volIndexImg);
	});


});