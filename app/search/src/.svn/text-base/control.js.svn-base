/**
 * 主控制器
 */
module('search_homecontrol',function()
{
	var model = reg('search_homemodel');
	reg('configure').start(complete);
	var storage = reg('storage');
	var request = reg('request');
	
		function complete()
		{
			model.school(JSON.parse(storage.read(config.code)))
		}
	
	    /**
		 * 获取课程搜索数据
		 */
		var page_number;
		function search_listcurser(page,values)
		{   
			page_number=page;
			var pageNums;
			if(page==1){
				loding()
				pageNums=21;
			}else{
				pageNums=20;
			}
			request.connect({
				debug:1,
				deviceId:'h5',
				keywords:values,
				page:page,
				pageNum:20,
				publicCourse:0	
			},config.api.searchcurser,'get',config.service,search_setlistcurser)
		}
		
		function search_setlistcurser(e)
		{
			
			if(e.code==1000){
				model.searchcurser(e);
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
	   
	   function loding_bottom(){
		   $('body').append('<div id="noClick"></div>'); 
	   } 
	   
	   function Removeloding(){
		$('#noClick')[0].outerHTML="";
	    }
	   
	   function Removeloding_bottom(){
		$('#noClick')[0].outerHTML="";
	    }
		
		return{
		search_listcurser:search_listcurser
	}
})