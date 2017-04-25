/**
 * 系统
 */
module('system',function()
{
	
	var system = new Object();
	
	/**
	 * 获取手机系统类型
	 */
	system.mobileType = function()
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
		if (sUserAgent.indexOf('iPad') > -1)
		{
			return "iPad";
		}
		if (sUserAgent.indexOf('Apad') > -1)
		{
			return "Apad";
		}
		if (sUserAgent.indexOf('Windows Phone') > -1)
		{
			return "Windows Phone";
		}
	}
	
	/**
	 * 获取类名
	 */
	system.className = function()
	{
		var _name =  self.constructor.toString();
		_name 	  = _name.replace(/\s/g,"");
		_name 	  = _name.substring(8,_name.indexOf("("));
		return _name;
	}
	
	/**
	 * 获取GET参数
	 */
	system.getValue = function(name)
	{
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	
	
	/**
	 * 修改页面Title
	 */
	system.setTitle = function(title) 
	{
	    document.title = title;
	    
		var $body = $('body');
		var $iframe = $('<iframe src="/favicon.ico"></iframe>');
		$iframe.on('load',function() {
		  setTimeout(function() {
		      $iframe.off('load').remove();
		  }, 0);
		}).appendTo($body);
	}
	
	
	return{
		
		mobileType:system.mobileType,
		className:system.className,
		getValue:system.getValue,
		setTitle:system.setTitle
	}
	
})