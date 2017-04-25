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
	
	
	var jsonData = {
						Job:
						{
							employment:
							{
								audit         :"「就业登记表」审核中，请耐心等待",
								fail          :"抱歉，你的「就业登记表」未通过审核",
								fail_help 	  :"请重新填写「就业登记表」,提交后等待审核",
								success       :"恭喜，你的「就业登记表」已通过审核",
								success_help  :"你可登录官方网站上传你的简历，等待审核"
							},
							
							resume:
							{
								audit         :"「简历」审核中，请耐心等待",
								fail          :"抱歉，你的「简历」未通过审核",
								fail_help 	  :"你可登录官方网站重新提交「简历」",
								success       :"恭喜，你的「简历」已通过审核",
								success_help  :"你可登录官方网站申请「技术模拟面试」"
							},
							
							technic:
							{
								audit         :"你的「技术模拟面试」申请已提交",
								fail          :"抱歉，你的「技术模拟面试」未通过审核",
								fail_help 	  :"你可登录官方网站重新申请「技术模拟面试」",
								success       :"恭喜，你的「技术模拟面试」已通过审核",
								success_help  :"你可登录官方网站申请「综合模拟面试」",
								evaluate      :"面试评价："
							},
							
							general:
							{
								audit         :"你的「综合模拟面试」申请已提交",
								fail          :"抱歉，你的「综合模拟面试」未通过审核",
								fail_help  	  :"你可登录官方网站重新申请「综合模拟面试」",
								success       :"恭喜，你的「综合模拟面试」已通过审核",
								evaluate      :"面试评价："
							}
						}
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
						bar_audit.find('#title').text(jsonData.Job.employment.audit);
						break;
					
					case "2":
						status(2);
						bar_audit.find('#title').text(jsonData.Job.employment.fail);
						bar_audit.find('#subtitle').text(jsonData.Job.employment.fail_help);
						bar_audit.find('#subtitle').show()
						break;
						
					case "3":
						status(3);
						bar_audit.find('#title').text(jsonData.Job.employment.success);
						//bar_audit.subtitle(model.jsonData.Job.employment.success_help);
						break;
						
						
					case "4":
						status(1);
						bar_audit.find('#title').text(jsonData.Job.resume.audit);
						break;
					
					case "5":
						status(2);
						bar_audit.find('#title').text(jsonData.Job.resume.fail);
						bar_audit.find('#subtitle').text(jsonData.Job.resume.fail_help);
						bar_audit.find('#subtitle').show()
						break;
						
					case "6":
						status(3);
						bar_audit.find('#title').text(jsonData.Job.resume.success);
						bar_audit.find('#subtitle').text(jsonData.Job.resume.success_help);
						bar_audit.find('#subtitle').show()
						break;
						
						
					case "7":
						status(1);
						bar_audit.find('#title').text(jsonData.Job.technic.audit);
						break;
					
					case "8":
						status(2);
						bar_audit.find('#title').text(jsonData.Job.technic.fail);
						bar_audit.find('#subtitle').text(jsonData.Job.technic.fail_help);
						bar_audit.find('#subtitle').show()
						break;
						
					case "9":
						status(3);
						bar_audit.find('#title').text(jsonData.Job.technic.success);
						bar_audit.find('#subtitle').text(jsonData.Job.technic.success_help);
						bar_audit.find('#evaluate').text(jsonData.Job.technic.evaluate+e.data.serviceRemark);
						bar_audit.find('#subtitle').show()
						bar_audit.find('#evaluate').show()
						break;
						
						
					case "10":
						status(1);
						bar_audit.find('#title').text(jsonData.Job.general.audit);
						break;
					
					case "11":
						status(2);
						bar_audit.find('#title').text(jsonData.Job.general.fail);
						bar_audit.find('#subtitle').text(jsonData.Job.general.fail_help);
						bar_audit.find('#subtitle').show()
						break;
						
					case "12":
						status(3);
						bar_audit.find('#title').text(jsonData.Job.general.success);
						bar_audit.find('#subtitle').text(jsonData.Job.general.success_help);
						bar_audit.find('#evaluate').text(jsonData.Job.general.evaluate+e.data.serviceRemark);
						break;
			}
		}
		else
		{
			bar_audit.hide()
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
