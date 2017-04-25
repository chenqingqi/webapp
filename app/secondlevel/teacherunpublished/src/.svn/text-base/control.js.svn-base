/**
 * 主控制器
 */
module('teacherunpublished_control',function()
{
	var model = reg('teacherunpublished_model');
	var mid='2190';
	var oauth_token='0a87257e5308197df43230edf4ad1dae';
	var oauth_token_secret='bdb2c2cbb8a6620abb46277119f3cd6b';
	reg('configure').start(complete);
	var storage = reg('storage');
	var request = reg('request');
	
	function complete()
	{   
		model.school(JSON.parse(storage.read(config.code)));
		getresourcelist('unpublished',1);
		
	}
	
	    /**
		 * 获取资源库课程
		 */
		var page_number;
		var pageNums;
		var status;
		function getresourcelist(status,page)
		{
			page_number=page;
			if(page==1){
				loding()
			}else{
			}
			request.connect({
				debug:1,
				deviceId:'h5',
				mid:mid,
				status:status,
				page:page,
				pageNum:20,
				isMerge:1,
				oauth_token:oauth_token,
				oauth_token_secret:oauth_token_secret
			},config.api.teacherCourse,'get',config.service,setresourcelist)
			
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
		$('#noClick')[0].outerHTML='';
	    }
		return{
		getresourcelist:getresourcelist
	}
})