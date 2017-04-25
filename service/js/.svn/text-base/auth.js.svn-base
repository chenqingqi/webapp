/**
 * app嵌入-服务简介页
 */
require(['service/libs/request','service/libs/system'],function main(request,system)
{
	
	try
	{
		window.wyzc.callOnApp('{"code":"1001","data":{}}','onAppComplete');
	}
	catch(e)
	{	
		alert('没有找到callOnApp');
	}
	
	
	window.onAppComplete = function(object)
	{
		if(typeof(object)=="string") object = JSON.parse(object);
		
		request.connect({
			
			debug:1,
			deviceId:'h5',
			relId:object.data.relId,
			publicCourse:object.data.publicCourse,
			mid:object.data.uid,
			oauth_token:object.data.oauth_token,
			oauth_token_secret:object.data.oauth_token_secret

		},'getServiceDetailAction','get',system.service(),complete);
		
	}
	
	
	var bar_audit = $('#bar_audit');
	
	function complete(e)
	{
		bar_audit.show()
		
		if(e.data.statusList && e.data.statusList.length > 0)
		{
			switch(e.data.statusList[0])
			{
				case "1":
					status(1);
					bar_audit.find('#title').text("「报名表」审核中，请耐心等待");
					break;
				
				case "2":
					status(2);
					bar_audit.find('#title').text("抱歉，你填写的「报名表」未通过审核");
					bar_audit.find('#subtitle').text("你可登录官方网站重新填写报名表，并上传等待审核");
					bar_audit.find('#subtitle').show()
					break;
					
				case "3":
					status(3);
					bar_audit.find('#title').text("恭喜，你的「报名表」已通过审核");
					break;
			}
		}
		else
		{
			bar_audit.hide()
		}
		
		var panel_exam = $('#panel_exam');
		
		if(e.data.exam.length >0)
		{
			panel_exam.find('#title').text('考试注意事项');
			panel_exam.find('#subject').text(e.data.exam[0].examSubjects);
			panel_exam.find('#time').text(format(new Date(Number(e.data.exam[0].examTime)*1000)));
			panel_exam.find('#place').text(e.data.exam[0].examPlace);
			panel_exam.find('#matter').text(e.data.exam[0].remark);
			panel_exam.show();
		}
		else
		{
			panel_exam.hide()
		}
	}
	
	
	function status(num)
	{
		switch(num)
		{
			case 1:
				bar_audit.find('#icon').attr('src','/service/img/audit.png');
				bar_audit.find('#title').css('color','#FF9933');
				bar_audit.find('#subtitle').hide()
				bar_audit.find('#evaluate').hide()
				break;
			
			case 2:
				bar_audit.find('#icon').attr('src','/service/img/fail.png');
				bar_audit.find('#title').css('color','red');
				bar_audit.find('#evaluate').hide()
				break;
			
			case 3:
				bar_audit.find('#icon').attr('src','/service/img/success.png');
				bar_audit.find('#title').css('color','green');
				break;
		}
	}
	
	
	function format(d)
	{
		  
	    var year 		= d.getFullYear();   
	    var month 		= d.getMonth()+1;   
	    var date 		= d.getDate();   
	    var day 		= d.getDay();   
	    var hours 		= d.getHours();   
	    var minutes 	= d.getMinutes();   
	    var seconds 	= d.getSeconds();   
	    var ms 			= d.getMilliseconds();     
	    var curDateTime	= year; 
	    
	    if(month>9)
	    {
	    	curDateTime = curDateTime +"-"+month; 
	    }
	    else 
	    {
	    	curDateTime = curDateTime +"-0"+month;  
	    }
	    
	    if(date>9) 
	    {
	    	curDateTime = curDateTime +"-"+date; 
	    }
	    else
	    {
	    	curDateTime = curDateTime +"-0"+date; 
	    } 
	     
	    if(hours>9)
	    {
	    	curDateTime = curDateTime +" "+hours;
	    }
	    else
	    {
	    	curDateTime = curDateTime +" 0"+hours; 
	    }
	      
	    if(minutes>9)
	    {
	    	curDateTime = curDateTime +":"+minutes; 
	    }
	    else
	    {
	    	curDateTime = curDateTime +":0"+minutes;
	    }
	      
	    if(seconds>9) 
	    {
	    	curDateTime = curDateTime +":"+seconds;
	    }
	    else
	    {
	    	curDateTime = curDateTime +":0"+seconds; 
	    }
	    
	    return curDateTime;
	}
})
