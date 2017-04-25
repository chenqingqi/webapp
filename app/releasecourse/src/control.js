/**
 * 主控制器
 */
module('releasecourse_control',function()
{
	var model = reg('releasecourse_model');
	var mid;
	var oauth_token;
	var oauth_token_secret;
	reg('configure').start(complete)
	var storage = reg('storage');
	var request = reg('request');
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
		 * 获取本校精品课程
		 */
		var page_number;
		function getresourcelist(pages,courseId)
		{	
			page_number=pages;
			if(pages==1){
				loding()
			}
			request.connect({
				debug:1,
				deviceId:'h5',
				mid:mid,
				oauth_token:oauth_token,
				oauth_token_secret:oauth_token_secret,
				courseId:courseId,
				publicCourse:0,
				page:pages,
				pageNum:10
			},config.api.CourseClass,'get',config.service,setresourcelist)
			
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
			}else{
				if(page_number==1){
				Removeloding();	
				}
				alert(e.msg);
			}
		}
		
		function loding(){
           var H=$(window).height()/2;
		   $('body').append('<div id="noClick"><img id="loding"style="top:'+H+'px" src="/resource/loading.gif"/></div>'); 
	   } 
	   function Removeloding(){
		$('#noClick')[0].outerHTML="";
	    }
	   
	   /*
	    * 发布课程
	    */
	   function Releasecourse(courseId,publicCourse){
//	   	alert(courseId);
//	   	alert(publicCourse);
	   	loding();
	   	request.connect({
				debug:1,
				deviceId:'h5',
				mid:mid,
				oauth_token:oauth_token,
				oauth_token_secret:oauth_token_secret,
				courseId:courseId,
				publicCourse:publicCourse,
			},config.api.issueCourse,'POST',config.service,doRelease)
	   }
	   
	   function doRelease(e)
		{
		if(e.code==1000){
			model.setresourceok(e);
			Removeloding();
		}else if(e.code==2001){
			loginTime();
			Removeloding();
		}else{
			Removeloding();	
		}
		}
		
		function loginTime(){
   	    var uitishi=$('#more_tishi').attr('hidden',false);
   	    uitishi.text('登陆超时，请重新登录');
		     uitishi.show();
		     window.setTimeout(function()
				{
					uitishi.hide();
					window.location.href='/app/login/login.html?from=releasecourse';
				},1000);
       }
		return{
		getresourcelist:getresourcelist,
		Releasecourse:Releasecourse
	}
})