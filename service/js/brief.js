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
			publicCourse:object.data.publicCourse

		},'getServiceBriefAction','get',system.service(),complete);
	}
	
	
	function complete(e)
	{
		var data = e.data.service;
		
		var ui   = $('#teletext');
		
		ui.find('p').text(data.text);
		
		try{ ui.find('img').attr('src',data.imageUrl[0]) }catch(e){}
	}
	
})
