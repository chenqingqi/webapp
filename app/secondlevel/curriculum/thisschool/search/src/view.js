/**
 * 主视图
 */
module('search_view',function()
{
	var model = reg('search_model');
	var control = reg('search_control');
//	var myScroll = reg('iscroll');
	
	var json;
	var ui = $('#bar_title_search');
	listenEvent('READY',onReady);
	
	function onReady(e)
	{   	  
	    $('#img').bind('click',onBack);
	    $('#text').bind('click',searchValue);
	    style(model.school().mainColor);
	    $('#panel_empty').attr('hidden',false);
	  	listenEvent('resourceready',ErgodicResourceslist);
	    
	   
	    
	}

/**
 * 遍历本校精品课程
 */
    function ErgodicResourceslist(){
    	 $('#addloding').attr('hidden',true);
    	json=model.setresource();
    	var qualityCourse = eval(json.data);
    	console.log(json);
    	var price;
    	var priceClass;
    	var pic;
    	$('#more_tishi').attr('hidden',true);
    	if(qualityCourse.length==0){
    		$('#panel_empty').attr('hidden',false);
    		$('#wrapper_school').attr('hidden',true);
    	}else{
    		$('#panel_empty').attr('hidden',true);
    		$('#wrapper_school').attr('hidden',false);
    	}
    	for(var i=0;i<qualityCourse.length;i++)
    	{
    		if(qualityCourse[i].price==0){
    		        price='免费';
    		        priceClass='green';
    		}else{
    			price='￥'+qualityCourse[i].price;
    			priceClass='red';
    		}
    		if(qualityCourse[i].pic==''){
    			pic='/resource/course_photo.jpg';
    		}else{
    			pic=qualityCourse[i].pic;
    		}
    		uisearchui='<a id="link"><div id="item_course_library"><img src="'+pic+'"><p id="title">'+qualityCourse[i].title+'</p><p id="school">'+qualityCourse[i].schoolName+'</p><p id="price" class="'+priceClass+'">'+price+'</p></div></a>'
			$('#scroller_school').append(uisearchui);
			var wrapperheight=($('body').height()-88)+'px';
    	}
			$('#wrapper_school').css('height',wrapperheight);
    	    loaded();
    	   
    }
	
	
	
	function onBack(e)
	{
		history.back();
	}
/*
 * 修改导航条的背景颜色
 */
	
	function style(bgcolor)
	{
			ui.css('background-color',bgcolor)	
	}
	
	

/*
 * search_value
 * 搜索内容
 */
//function searchValue(){
//	var category=$('#search_value').val();
//	if(category==''){
//		return ;
//	}else{
//	$('#scroller_school').empty();
//	control.getresourcelist(1,category);
//	}
//
//}
 var values1;
 var values2;
 var  mun=1;	
 var  pages;
 var  maxScrollY;
    function searchValue(){
    	mun=1;
    	values1= $("#search_value").val();
    	if(values1==''){
    		return ;
    	}
    	if(values1==values2){
    		$('#scroller_school').empty();
    		pages=1;
    		control.getresourcelist(pages,values1);
    	}else{
    		$('#scroller_school').empty();
    		pages=1;
    		control.getresourcelist(pages,values1);
    	}
    	values2= values1;	
    }
/*
 * 下拉加载分页
 */
function loaded() {
	myScroll = new IScroll('#wrapper_school');
    var n1=myScroll.maxScrollY;
	myScroll.on('scrollEnd', addloding);
	if(pages>1){
	myScroll.scrollTo(0,maxScrollY-80,0, IScroll.utils.ease.back);
	}
}

function addloding() {
	if(myScroll.directionY == 1) {
		if(myScroll.y == myScroll.maxScrollY) {
			if(json.data.length==20){
			     maxScrollY=myScroll.maxScrollY;
                 pages=mun+1;
                 mun=pages;
                  $('#addloding').attr('hidden',false);
                 myScroll.scrollTo(0,maxScrollY-80,0, IScroll.utils.ease.back);
                 control.getresourcelist(pages,$('#search_value').val()); 
		       }else{	
			     var uitishi=$('#more_tishi').attr('hidden',false);
			     uitishi.show();
			     window.setTimeout(function()
					{
						uitishi.hide();
					},1000);
		             }
		    }
	}
		
}

return {

	ui: ui,
	loaded:loaded,
	ErgodicResourceslist:ErgodicResourceslist,
	style: style
}


})