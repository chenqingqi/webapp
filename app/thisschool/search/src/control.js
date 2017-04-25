/**
 * 主控制器
 */
module('search_control',function()
{
	var model = reg('search_model');
	reg('configure').start(complete);
	var storage = reg('storage');
	var request = reg('request');
	
		function complete()
		{   
			model.school(JSON.parse(storage.read(config.code)));
		}
	
	    /**
		 * 获取本校精品课程
		 */
		var page_number;
		var pageNums;
		function getresourcelist(pages,keywords)
		{
			page_number=pages;
			if(pages==1){
				loding();
				pageNums=21;
			}else{
				pageNums=20;
			}
			request.connect({
				debug:1,
				deviceId:'h5',
				keywords:keywords,
				publicCourse:1,
				page:pages,
				pageNum:20
			},config.api.searchCourser,'get',config.service,setresourcelist)
			
		}
		
		function setresourcelist(e)
		{
			if(e.code==1000){
				model.setresource(e);
				if(page_number==1){
				Removeloding();	
				}
			}else{
				if(page_number==1){
				Removeloding();	
				}
				alert(e.msg);
			}
		}
		
		function loding(){
		   var H=($(window).height()-88)/2;
		   $('body').append('<div id="noClick"><img id="loding" style="top:'+H+'px" src="/resource/loading.gif"/></div>'); 
	    } 
	    
	   function Removeloding(){
		$('#noClick')[0].outerHTML="";
	    }
	   
		return{
		getresourcelist:getresourcelist
	    }
})