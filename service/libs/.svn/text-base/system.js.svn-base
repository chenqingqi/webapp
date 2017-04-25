/**
 * 系统
 */
define(function()
{
	
	/**
	 * 获取手机系统类型
	 */
	function mobileType()
	{
		var sUserAgent = navigator.userAgent;
		
	    if (sUserAgent.indexOf('Android') > -1 || sUserAgent.indexOf('Linux') > -1)
	    {
	    	return "Android";
	    }
	    
		if (sUserAgent.indexOf('iPhone') > -1)
		{
			return "iPhone";
		}
		
		if (sUserAgent.indexOf('Windows Phone') > -1)
		{
			return "Windows Phone";
		}
	}
	
	
	/**
	 * 获取类名
	 */
	function className()
	{
		var _name =  self.constructor.toString();
		_name 	  = _name.replace(/\s/g,"");
		_name 	  = _name.substring(8,_name.indexOf("("));
		return _name;
	}
	
	
	/**
	 * 获取GET参数
	 */
	function GET(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	
	
	/**
	 * 修改页面标题(兼容IOS微信)
	 */
	function pageTitle(value) 
	{
	    document.title = value;
	    
		var $body = $('body');
		var $iframe = $('<iframe src="/favicon.ico"></iframe>');
		$iframe.on('load',function() {
		  setTimeout(function() {
		      $iframe.off('load').remove();
		  }, 0);
		}).appendTo($body);
	}
	
	
	/**
	 * 获取服务地址
	 */
	function service()
	{
		var domain = location.host;
			
		if(domain[0] !== 'm')
		{
			return "http://192.168.3.6:88/Mobile/Index/";
		}
		else
		{
			domain = domain.replace(new RegExp("m."),"");
			return  "http://"+domain+"/Mobile/Index/";
		}
	}
	
	
	/**
	 * 公开方法
	 */
	return{
		
		GET		  :GET,
		mobileType:mobileType,
		className :className,
		pageTitle :pageTitle,
		service   :service
	}
})

	
