/**
 * 主控制器
 */
module('courselist_control',function()
{
	var model = reg('courselist_model');
	var mid;
	var oauth_token;
	var oauth_token_secret;
	reg('configure').start(complete)
	var storage = reg('storage');
	var request = reg('request');
	var system = reg('system');
	var id=system.getValue('id');
	
	function complete()
	{
		model.school(JSON.parse(storage.read(config.code)));
		getresourcelist(1);
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
	  	getresourcelist(1);
	  }
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
			imgWidth:'230px',
			major_id:id,
			page:pages,
			pageNum:20
		},config.api.courselist,'get',config.service,setresourcelist)
		
	}
		
	function setresourcelist(e)
	{
		if(e.code==1000){
			model.setresource(e);
			if(page_number==1){
			Removeloding();
			}
		}else if(e.code==2001){
			loginTime();
			Removeloding();
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
	   
    function loginTime(){
   	 var uitishi=$('#more_tishi').attr('hidden',false);
   	    uitishi.text('登陆超时，请重新登录');
		     uitishi.show();
		     window.setTimeout(function()
				{
					uitishi.hide();
					window.location.href='/app/login/login.html?from=courselist';
				},1000);
    }
	   
		return{
		getresourcelist:getresourcelist
	    }
})