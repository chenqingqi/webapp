/**
 * 主视图
 */
module('resource_view',function()
{
	var model = reg('resource_model');
	var control = reg('resource_control');
	var json;
	var ui = $('#titlebar');
	listenEvent('READY',onReady);
	
	function onReady(e)
	{   	
	    $('#back').bind('click',onBack);
	    style(model.school().mainColor);
	    ui.attr('hidden',false);
	    listenEvent('resourceready',ErgodicResourceslist);
	}

	 /**
	 * 遍历本校精品课程
	 */
    function ErgodicResourceslist(){
    	 $('#addloding').attr('hidden',true);
    	    json=model.setresource();
    	var temp = $('#item_course_full')[0].outerHTML;
    	if($(temp).text()=='muban'){
    		$('#item_course_full').remove();
    	}           
    	var qualityCourse = eval(json.data.course);
    	for(var i=0;i<qualityCourse.length;i++)
    	{
    		var uisearchui = $(temp).attr('hidden',false);
    		if(qualityCourse[i].price==0){
    		      //  uisearchui.find('#price').text('免费');
					//uisearchui.find('#price').css('color','green');
    		}else{
    			//uisearchui.find('#price').text('￥'+qualityCourse[i].price);
    		}
    		if(qualityCourse[i].pic==''){
    			uisearchui.find('img').attr('src','/resource/course_photo.jpg');
    		}else{
    			uisearchui.find('img').attr('src',qualityCourse[i].pic);
    		}
			uisearchui.find('#title').text(qualityCourse[i].title);
			uisearchui.find('#hour').text(qualityCourse[i].timeLength+'课时');
			uisearchui.find('a').attr('href','/app/course/course.html?treeid='+qualityCourse[i].courseId+'&publicCourse='+qualityCourse[i].publicCourse+'&type=0');
			$('#scroller').append(uisearchui);
    	}
			$('#wrapper').css('height','100%');
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
	var pages=1;
	/*
	 * 下拉加载分页
	 */
	function loaded() {
		myScroll = new IScroll('#wrapper',{click:true});
		myScroll.on('scrollEnd', addloding);
	if(pages>1){
		myScroll.scrollTo(0,maxScrollY-161, 0, IScroll.utils.ease.circular);
	  }	
	}
	
	function addloding() {
	if(myScroll.directionY == 1) {
			if(myScroll.y == myScroll.maxScrollY) {
				var l=model.setresource().data.totalPage;
				if(l>pages){
				     maxScrollY=myScroll.maxScrollY;
	                 pages=mun+1;
	                 mun=pages;
	                  $('#addloding').attr('hidden',false);
	                 myScroll.scrollTo(0, myScroll.maxScrollY-161, 0, IScroll.utils.ease.circular);
	                 control.getresourcelist(pages);
			       }else{	
				    
				    
				    
				    reg('tip').show('没有更多了')
			       
			       
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