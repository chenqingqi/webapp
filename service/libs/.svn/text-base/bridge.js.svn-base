/**
 * 模块-APP通信桥接
 */
define(function()
{
	
	/**
	 * 向App请求数据
	 */
	function call(data,back)
	{
		window.wyzc.callOnApp(data,back);
	}
	
	
	/**
	 * 注册接口供App访问
	 */
	function register(fun)
	{
		window.wyzc.callOnJs = fun(data,back)
	}
	
	
	return{
		
		call:call,
		register:register
	}
})