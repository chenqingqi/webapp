/**
 * Ajax通信模块
 */
module('request',function()
{
	
	var request = new Object()
	
	
	/**
	 * 请求数据
	 */
	request.connect = function(data,api,type,url,back)
	{
		console.log('当前请求地址:'+url+api);
			
		$.ajax(
		{
			url 	: url+api,
			type	: type,
			data	: data,
		    dataType: "json",
			success	: back,
			error	: requestStatus,
		});
	}
	
	/**
	 * 返回错误状态
	 */
	function requestStatus(error)
	{
		var code = ['0-请求未初始化或跨域访问被屏蔽','1-服务器连接已建立 ','2-请求已接受 ','3-请求处理中','4-请求已完成，5-响应已就绪']
		
		if(Number(error.status) == 200)
		{
			console.log("获取服务数据,状态信息：200-成功");
		}
		else
		{
			console.log("获取Request数据状态:"+code[Number(error.status)]);
		}
	}
	
	return {
		
		connect:request.connect
	}
})
	

