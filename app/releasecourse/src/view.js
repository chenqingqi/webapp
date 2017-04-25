/**
 * 主视图
 */
module('releasecourse_view',function()
{
	var model = reg('releasecourse_model');
	var control = reg('releasecourse_control');
	var json;
	var ui = $('#titlebar');
	
	var courseId;
	var publicCourse;
	listenEvent('READY',onReady);
	
	function onReady(e)
	{   
		courseId=system.getValue('courseId');
		publicCourse=system.getValue('publicCourse');
	    $('#back').bind('click',onBack);
	    $('#addClass').bind('click',prompts);
	    $('#back_right').bind('click',playgo);
	    style(model.school().mainColor);
	    var url=system.getValue('title');
        url=decodeURI(url); 
        $('#resource_item_title').text(url);
        $('#resource_item_img').attr('src',system.getValue('pic'));
	    control.getresourcelist(1,courseId);
	    listenEvent('resourceready',ErgodicResourceslist);
	    $('#resource_item_fabu').bind('click',addRelease);
	    listenEvent('resourcecourse',addResoult);
  
	}

	 /**
	 * 遍历本校精品课程
	 */
    var system = reg('system');
    function ErgodicResourceslist(){
    	 $('#addloding').attr('hidden',true);
    	    json=model.setresource();
    	var qualityCourse = eval(json.data);
    	var teachers;
    	for(var i=0;i<qualityCourse.length;i++)
    	{
    		if(qualityCourse[i].teachers.length!=0){
    		teachers=qualityCourse[i].teachers[0].nickname;
    		}else{
    			teachers='';
    		}
        uisearchui='<div id="item_class"><img src="/resource/default_class.png"><div id="info"><p id="title">'+qualityCourse[i].className+'</p><p id="create_name">创建人：'+teachers+'</p><p id="memberNum">'+qualityCourse[i].classNum+'人</p></div></div>'
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
	  myScroll.scrollTo(0,maxScrollY-161, 0, IScroll.utils.ease.circular);
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
	 * 提示2
	 */
	function addprompts(values){
		             var prompt=$('#prompt').text(values)
		             prompt.attr('hidden',false);
				     prompt.show();
				     window.setTimeout(function()
						{
							prompt.hide();
						},2000);
			            
	}
	/*
	 * 遍历操作
	 */
	function addClicktishi(){
		for(var i=0;i<$('.operation_list_class').length;i++){
			$('.operation_list_class').bind('click',prompts);
		}
	}
	/*
	 * 发布课程
	 */
    function addRelease(){
    	control.Releasecourse(courseId,publicCourse);
    }
	/*
	 * 发布课程返回结果
	 */
    function addResoult(){
    	var mesg=model.setresourceok().msg;
    	if(model.setresourceok().code=='1000'){
    	$('#resource_item_fabu').attr('hidden',true);
    	$('#back_right').attr('hidden',false);
    	$('#resource_item_but').text('授课班：'+system.getValue('classNum')+'个');
    	addprompts('已经发布成功');
    	}else{
    		addprompts(mesg);
    	}
    	
    }
    
	return {
		ui: ui,
		loaded:loaded,
		ErgodicResourceslist:ErgodicResourceslist,
		style: style
	}


})