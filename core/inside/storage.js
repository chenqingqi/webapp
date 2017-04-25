/**
 * 本地存储
 */
define(function()
{
	
	var Storage = new Object();
	
	
	/**
	 * 写入
	 */
	Storage.write = function(name,value)
	{
		localStorage[name] = value;
	}
	
	/**
	 * 读取
	 */
	Storage.read = function(name)
	{
		var value = localStorage[name];
		if( value == undefined) value = 0;
		return value;
	}
	
	/**
	 * 删除
	 */
	Storage.remove = function(name)
	{
		localStorage.removeItem(name);
	}
	
	return Storage;
	
});