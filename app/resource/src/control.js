/**
 * 主控制器
 */
module('resource_control',function()
{
	var model = reg('resource_model');
	reg('configure').start(complete)
	var storage = reg('storage');
	var request = reg('request');
	
		function complete()
		{
			model.school(JSON.parse(storage.read(config.code)));
			getresourcelist(1);
		}
	
	    /**
		 * 获取本校精品课程
		 */
		var page_number;
		function getresourcelist(pages)
		{	
			page_number=pages;
			var pageNums;
			if(pages==1){
				loding()
				pageNums=21;
			}else{
				pageNums=20;
			}
			request.connect({
				debug:1,
				deviceId:'h5',
				treeImgWidth:'230px',
				page:pages,
				pageNum:20
			},config.api.qualityCourse,'get',config.service,setresourcelist)
			
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
			var H=$(window).height()/2;
		   $('body').append('<div id="noClick"><img style="top:'+H+'px" id="loding" src="/resource/loading.gif"/></div>'); 
	   } 
	   
	   function Removeloding(){
		$('#noClick')[0].outerHTML="";
	    }
	   
		return{
		getresourcelist:getresourcelist
	    }
})