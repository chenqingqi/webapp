/**
 * 主视图
 */
module('teacherunpublished_view',function()
{
	var model = reg('teacherunpublished_model');
	var control = reg('teacherunpublished_control');
	var json;
	var ui = $('#titlebar');
	var uiactive = $('#panel_tab');
	listenEvent('READY',onReady);
	
	function onReady(e)
	{   	  
	    $('#back').bind('click',onBack);
	    style(model.school().mainColor);
	    styleactive(model.school().mainColor);
	    $('body').attr('hidden',false);
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
    		var pic;
    		if(qualityCourse[i].pic==''){
    			pic='/resource/course_photo.jpg';
    		}else{
    			pic=qualityCourse[i].pic;
    		}
    		var title=encodeURI(qualityCourse[i].title);
    		title=encodeURI(title);
    		uisearchui='<a href="/app/releasecourse/resource.html?title='+title+'&pic='+pic+'&courseId='+qualityCourse[i].courseId+'&publicCourse='+qualityCourse[i].publicCourse+'&classNum='+qualityCourse[i].classNum+'&publicCourse='+qualityCourse[i].publicCourse+'">  <div  id="item_course_full"><div id="logo"><img src="'+pic+'"></div><div id="container"><p id="title">'+qualityCourse[i].title+'</p><span id="price"></span></div></div></a>'
			$('#scroller').append(uisearchui);
			
    	}
           var wrapperheight=($('body').height()-89)+'px';
			$('#wrapper').css('height',wrapperheight);
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
	
	function styleactive(color)
	{
			uiactive.find('.active').css('border-bottom-color',color);
			uiactive.find('.active').css('color',color);	
	}
	
	
	var mun=1;	
	var pages=1;
	var maxScrollY;
	/*
	 * 下拉加载分页
	 */
	function loaded() {
		
		myScroll = new IScroll('#wrapper',{click:true});
		myScroll.on('scrollEnd', addloding);
		
		if(pages>1){
		myScroll.scrollTo(0,maxScrollY-161,0, IScroll.utils.ease.circular);
		}
	
	}
	
	function addloding() {	
	if(myScroll.directionY == 1) {
			if(myScroll.y == myScroll.maxScrollY) {
				var l=json.totalPage;
				if(pages<l){
				     maxScrollY=myScroll.maxScrollY;
	                 pages=mun+1;
	                 mun=pages;
	                  $('#addloding').attr('hidden',false);
	                 myScroll.scrollTo(0,maxScrollY-161,0, IScroll.utils.ease.circular);
	                 control.getresourcelist('unpublished',pages);
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