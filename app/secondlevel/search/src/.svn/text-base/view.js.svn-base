/**
 * 主视图
 */
module('search_homeview',function()
{
	var model = reg('search_homemodel');
	var control = reg('search_homecontrol');
	var ui;
	var datesearch;
	var mun=1;	
    var pages;
    var maxScrollY;
	listenEvent('READY',onReady);
	
	function onReady(e)
	{   	
		ui = $('#bar_title_search').attr('hidden',false);
	     $('#back').bind('click',onBack);
	    $('#text').bind('click',search);
	    style(model.school().mainColor);
	    listenEvent('searchcurserready',searchcurserlist); 
	}
 /*
 * 点击搜索课程和班级
 */		
 var values1;
 var values2;
    function search(){
    	mun=1
    	values1= $("#search_value").val();
    	if(values1==''){
    		return ;
    	}
    	else{
    		$('#scroller').empty();
    		pages=1;
    		control.search_listcurser(pages,values1);
    	}
    	values2= values1;	
    }
 
/*
 * 搜索课程
 */
	function searchcurserlist(){
		$('#addloding').attr('hidden',true);
	    datesearch=model.searchcurser().data;
    	$('#more_tishi').attr('hidden',true);
		if(datesearch.length>0){
			    $('#panel_empty').attr('hidden',true);
	            var price;
    	        var priceClass;
    	        var pic;
			for(var i=0;i<datesearch.length;i++){
				
				if(datesearch[i].pic==''){
					pic='/resource/course_photo.jpg';
				}else{
					pic=datesearch[i].pic;
				}
				if(datesearch[i].price=='0'){
					price='免费';
					priceClass='green';
				}else{
					price='￥'+datesearch[i].price;
					priceClass='red';
				}
	            var searchui='<div id="item_course_full"><div id="logo"><img src="'+pic+'"></div><div id="container"><p id="title">'+datesearch[i].title+'</p><span id="price" class="'+priceClass+'">'+price+'</span><span id="hour">'+datesearch[i].timeLength+'课时</span></div></div>'
                $('#scroller').append(searchui);
			    var wrapperheight=($('body').height()-88)+'px';
			}
			$('#wrapper').css('height',wrapperheight);
			loaded();
		}else{
			     $('#scroller').empty();
				 $('#panel_empty').find('p').text('没有搜索到课程信息');
				 $('#panel_empty').attr('hidden',false);
			}
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
 * 下拉加载分页
 */
function loaded() {
	myScroll = new IScroll('#wrapper',{click:true});
	myScroll.on('scrollEnd', addloding);
	if(pages>1){
	myScroll.scrollTo(0,maxScrollY-161,0, IScroll.utils.ease.circular);
	}
	 $('#addloding').attr('hidden',true);
}
var lodingnumber1=0;
var lodingnumber2;
function addloding() {
    if(myScroll.directionY == 1) {
		if(myScroll.y==myScroll.maxScrollY) {
			lodingnumber2=lodingnumber1+1;
			lodingnumber1=lodingnumber2;
			if(lodingnumber2==2){}
              	lodingnumber1=0;
              	if(datesearch.length==20){
              	
			     maxScrollY=myScroll.maxScrollY;
                 pages=mun+1;
                 mun=pages;
                 $('#addloding').attr('hidden',false);
                 myScroll.scrollTo(0,maxScrollY-161,0, IScroll.utils.ease.circular);
                 control.search_listcurser(pages,$('#search_value').val());
               
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

	return{
		
		ui:ui,
		style:style
	}


})