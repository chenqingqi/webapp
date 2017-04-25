/**
 * 系统
 */
define(function(){
	
	
	var System = new Object();
	
	/**
	 * 获取手机系统类型
	 */
	System.mobileType = function()
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
	System.className = function()
	{
		var _name =  self.constructor.toString();
		_name 	  = _name.replace(/\s/g,"");
		_name 	  = _name.substring(8,_name.indexOf("("));
		return _name;
	}
	
	return System;
})