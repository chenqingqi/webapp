/**
 * 模块-基础服务
 */
define(function()
{
	
	var Service  = new Object();
	
	/**
	 * 服务地址
	 */
	Service.host = function()
	{
		var domain = location.host;
			
		if(domain[0] !== 'm')
		{
			return "http://192.168.3.6:88/Mobile/Index/";
			//return "http://test.gkk.cn/Mobile/Index/";
		}
		else
		{
			domain = domain.replace(new RegExp("m."),"");
			return "http://"+domain+"/Mobile/Index/";
		}
	}
	
	
	/**
	 * 获取二维码
	 */
	Service.qrcode = function(str)
	{
		var domain = location.host;
		
		domain = domain.replace(new RegExp("m."),"");
			
		if(domain == 'test.cloud.com:8080' || domain == '192.168.199.60:8080') 
		{
			return "http://192.168.3.6:88/Home/Mobile/downloadQrcodeAction/code/"+str;
		}
		
		return "http://"+domain+"/Home/Mobile/downloadQrcodeAction/code/"+str;
	}
	
	
	/**
	 * 获取域名中学校的英文简写
	 */
	Service.code = function()
	{
		var domain  = location.host;
		
		if(domain[0] !== 'm')
		{
			return 'user1';
		}
		else
		{
			domain = domain.substring(2,domain.length);
			domain = domain.substring(0,domain.indexOf('.'));
			return domain;
		}
	}
	
	
	/**
	 * 获取GET参数
	 */
	Service.get = function(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	
	return Service
})