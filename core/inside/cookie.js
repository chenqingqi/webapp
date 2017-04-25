/**
 * Cookie
 */
define(function()
{
	
	var Cookie = new Object();
	
	/**
	 * 写入cookie
	 */
	Cookie.write = function(name,value)
	{
		var Days = 30; 
	    var exp  = new Date(); 
	    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
	    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
	}
	
	
	/**
	 * 读取cookie
	 */
	Cookie.read = function(name)
	{
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
 
	    if(arr=document.cookie.match(reg))
	    {
	    	return unescape(arr[2]); 
	    }
	    else
	    {
	    	return 0;
	    }
	}
	
	return Cookie;
	
});