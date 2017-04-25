/**
 * 主视图
 */
module('school_view',function()
{
	var model = reg('school_model');
	var control = reg('school_control');
	var json;
	
	var ui = $('#titlebar');
	listenEvent('READY',onReady);
	
	function onReady(e)
	{   	  
	    $('#back').bind('click',onBack);
	    style(model.school().mainColor);
	  
	    listenEvent('resourceready',ErgodicResourceslist);
	   
	    
	}	
/**
 * 遍历本校精品课程
 */
    function ErgodicResourceslist(){
    	$('#addloding').attr('hidden',true);
    	    json=model.setresource();
    	var qualityCourse = eval(json.data);
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
			var wrapperheight=($('body').height()-198)+'px';
    	}
    	    $('#wrapper_school').attr('hidden',false);
    	    $('#button_search').attr('hidden',false);
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
	
	
var mun=1;	
var pages;
var maxScrollY;
/*
 * 下拉加载分页
 */
function loaded() {
	
	myScroll = new IScroll('#wrapper_school',{click:true});
	myScroll.on('scrollEnd', addloding);
	
	if(pages>1){
	myScroll.scrollTo(0,maxScrollY-88,0, IScroll.utils.ease.circular);
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
                 myScroll.scrollTo(0,maxScrollY-88,0, IScroll.utils.ease.circular);
                 control.getresourcelist(pages);
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