/**
 * 主视图
 */
module('coursedetails_view',function()
{
	var model = reg('coursedetails_model');
	var control = reg('coursedetails_control');
	var json;
	var ui = $('#titlebar');
	listenEvent('READY',onReady);
	
	function onReady(e)
	{   	
	    $('#back').bind('click',onBack);
	    $('#addClass').bind('click',prompts);
	    $('#back_right').bind('click',playgo);
	    style(model.school().mainColor);
	    var url=system.getValue('title');
        url=decodeURI(url); 
        $('#resource_item_title').text(url);
        var pics=system.getValue('pic');
        if(pics==''){
        	pics='/resource/course_photo.jpg';
        }
        $('#resource_item_img').attr('src',pics);
        $('#resource_item_but').text('授课班：'+system.getValue('class')+'个');
	    control.getresourcelist(1,system.getValue('courseId'));
	    listenEvent('resourceready',ErgodicResourceslist);   
	}

	 /**
	 * 遍历本校精品课程
	 */
    var system = reg('system');
    function ErgodicResourceslist(){
    	 $('#addloding').attr('hidden',true);
    	    json=model.setresource();
    	var qualityCourse = eval(json.data);
    	for(var i=0;i<qualityCourse.length;i++)
    	{
    		var nickname;
    		if(qualityCourse[i].teachers.length==0){
    			nickname='';
    		}else{
    			nickname=qualityCourse[i].teachers[0].nickname;
    		}
        uisearchui='<div id="item_class"><img src="/resource/img/'+returnNumber()+'.png"><div id="info"><p id="title">'+qualityCourse[i].className+'</p><p id="create_name">创建人：'+nickname+'</p><p id="memberNum">'+qualityCourse[i].classNum+'人</p></div></div>'
    	$('#scroller').append(uisearchui);
    	if(qualityCourse[i].className=='默认授课班'){
    		uilist='<div id="operation_list"><div  class="operation_list_class"><img src="/resource/task.png" /><span>作业</span></div><div class="operation_list_class"><img src="/resource/examination.png" /><span>考试</span></div><div class="operation_list_class"><img src="/resource/student.png" /><span>学员</span></div><div class="operation_list_class" id="last"><img src="/resource/rollcall.png" /><span>点名</span></div></div>';
    	}else{
    		uilist='<div id="operation_list_five"><div  class="operation_list_class"><img src="/resource/task.png" /><span>作业</span></div><div class="operation_list_class"><img src="/resource/examination.png" /><span>考试</span></div><div class="operation_list_class"><img src="/resource/student.png" /><span>学员</span></div><div class="operation_list_class"><img src="/resource/rollcall.png" /><span>点名</span></div><div class="operation_list_class" id="last"><img src="/resource/setup.png" /><span>设置</span></div></div>';
    	}
		$('#scroller').append(uilist);
    	}
    	var wrapperheight=($('body').height()-292)+'px';
			$('#wrapper').css('height',wrapperheight);
    	    loaded();
    	    addClicktishi();
    	   
    }
	
 
	 /*
	  * 跳转到播放页
	  */
	 function playgo(){
	 	window.location.href='/app/course/course.html?treeid='+system.getValue('courseId')+'&publicCourse='+system.getValue('publicCourse');
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
	  myScroll.scrollTo(0, myScroll.maxScrollY-161, 0, IScroll.utils.ease.circular);
      }	
    }

	function addloding() {
	if(myScroll.directionY == 1) {
			if(myScroll.y == myScroll.maxScrollY) {
				var l=model.setresource().data.length
				if(pages<model.setresource().totalPage){
				     maxScrollY=myScroll.maxScrollY;
	                 pages=mun+1;
	                 mun=pages;
	                  $('#addloding').attr('hidden',false);
	     myScroll.scrollTo(0, myScroll.maxScrollY-161, 0, IScroll.utils.ease.circular);
	     control.getresourcelist(pages,system.getValue('courseId'));
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

	/*
	 * 提示
	 */
	function prompts(){
		             var prompt=$('#prompt').text('网页版暂不支持操作，可在  App 操作')
		             prompt.attr('hidden',false);
				     prompt.show();
				     window.setTimeout(function()
						{
							prompt.hide();
						},2000);
			            
	}
	/*
	 * 获取随机数
	 */
	function returnNumber(){
		var numbers=Math.floor(Math.random()*(10-1)+1);
		return numbers;
	}
	/*
	 * 遍历操作
	 */
	function addClicktishi(){
		for(var i=0;i<$('.operation_list_class').length;i++){
			$('.operation_list_class').bind('click',prompts);
		}
	}

	return {
		ui: ui,
		loaded:loaded,
		ErgodicResourceslist:ErgodicResourceslist,
		style: style
	}


})