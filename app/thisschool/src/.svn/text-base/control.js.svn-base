/**
 * 主控制器
 */
module('school_control',function()
{
	var model = reg('school_model');
	reg('configure').start(complete)
	var storage = reg('storage');
	var request = reg('request');
	
		function complete()
		{   
			model.school(JSON.parse(storage.read(config.code)));
			getresourcelist('1');
			
		}
		
	    /**
		 * 获取资源库课程
		 */
		var page_number;
		var pageNums;
		function getresourcelist(pages)
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
				publicCourse:1,
				pageNum:20,
				page:pages
			},config.api.school_list,'get',config.service,setresourcelist)
			
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
		var H=($(window).height()-200)/2;
		   $('body').append('<div id="noClick"><img id="loding" style="top:'+H+'px"src="/resource/loading.gif"/></div>'); 
	    } 
	    
	   function Removeloding(){
		$('#noClick')[0].outerHTML="";
	    }
	   
		return{
		getresourcelist:getresourcelist
	    }
})