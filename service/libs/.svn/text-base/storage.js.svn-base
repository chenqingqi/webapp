/**
 * 框架扩展：本地存储
 */
define(function()
{
	
	/**
	 * 写入
	 */
	function write(name,value)
	{
		localStorage[name] = value;
	}
	
	
	/**
	 * 读取
	 */
	function read(name)
	{
		var value = localStorage[name];
		if( value == undefined) value = 0;
		return value;
	}
	
	
	/**
	 * 删除
	 */
	function remove(name)
	{
		localStorage.removeItem(name);
	}
	
	
	/**
	 * 公开方法
	 */
	return{
		
		write:write,
		read:read,
		remove:remove
	}
})
	

