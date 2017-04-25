/**
 * 主控制器
 */
module('feedback_control',function()
{
	var model = reg('feedback_model');
	var mid;
	var oauth_token;
	var oauth_token_secret;
	reg('configure').start(complete);
	var storage = reg('storage');
	var request = reg('request');
	var system = reg('system');
	
	function complete()
	{   
		model.school(JSON.parse(storage.read(config.code)));
		getUser();
	}
	
	    /*
		 * 判断登录，获取user
		 */
		function getUser(){
		  var user=JSON.parse(storage.read('user'));
		  if(user!=''){
		  	mid=user.uid;
		  	oauth_token=user.oauth_token;
		  	oauth_token_secret=user.oauth_token_secret;
		  }
		}
	    /**
		 * 发送建议
		 */
		function getresourcelist(content)
		{
			loding();
			var from=system.mobileType();
			var fromtype;
			if(from=='Android'){
				fromtype=2;
			}else if(from=='iPhone'){
				fromtype=1;
			}else if(from=='iPad'){
				fromtype=3;
			}else if(from=='Apad'){
				fromtype=4;
			}else{
				fromtype=0;
			}
			request.connect({
				debug:1,
				deviceId:'h5',
				mid:mid,
			    content:content,
			    from:fromtype,
				oauth_token:oauth_token,
				oauth_token_secret:oauth_token_secret
			},config.api.feedback,'post',config.service,setresourcelist)
			
		}
		
		function setresourcelist(e)
		{
			
			
			
	       if(e.code==1000){
				model.setfeedback(e);
				Removeloding();	
			}else if(e.code==2001){
				loginTime();
			}else{
				Removeloding();	
			}

		}
		
		function loding(){	
           var H=($(window).height()-88)/2;
		   $('body').append('<div id="noClick"><img id="loding" style="top:'+H+'px"src="/resource/loading.gif"/></div>'); 
	   } 
	   
	   function Removeloding(){
		$('#noClick')[0].outerHTML='';
	    }
	   
	   function loginTime(){
   	    var uitishi=$('#prompt').attr('hidden',false);
   	    uitishi.text('登陆超时，请重新登录');
		     uitishi.show();
		     window.setTimeout(function()
				{
					uitishi.hide();
					window.location.href='/app/login/login.html?from=feedback';
				},1000);
       }
		return{
		getresourcelist:getresourcelist
	}  
		
})