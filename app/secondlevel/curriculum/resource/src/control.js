/**
 * 主控制器
 */
module('resource_control',function()
{
	var model = reg('resource_model');
	var mid='1099573';
	var oauth_token='338bfe713f20210e98200e3cf32a5cfb';
	var oauth_token_secret='ec2504c252bdfbb60f76ad7cf5a8f04a';
	reg('configure').start(complete)
	var storage = reg('storage');
	var request = reg('request');
	function complete()
	{
		model.school(JSON.parse(storage.read(config.code)));
		getresourcelist();
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
				console.log(e);
			}else{
				if(page_number==1){
				Removeloding();	
				}
				alert(e.msg);
			}
		}
		
		function loding(){
		   $('body').append('<div id="noClick"><img id="loding" src="/resource/loading.gif"/></div>'); 
	   } 
	   function Removeloding(){
		$('#noClick')[0].outerHTML="";
	    }
		return{
		getresourcelist:getresourcelist
	}
})