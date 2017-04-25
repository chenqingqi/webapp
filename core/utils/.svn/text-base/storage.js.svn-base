/**
 * 本地存储
 */
module('storage',function()
{
	
	var storage = new Object()
	
	/**
	 * 写入
	 */
	storage.write = function(name,value)
	{
		localStorage[name] = value;
	}
	
	/**
	 * 读取
	 */
	storage.read = function(name)
	{
		var value = localStorage[name];
		if( value == undefined) value = 0;
		return value;
	}
	
	/**
	 * 删除
	 */
	storage.remove = function(name)
	{
		localStorage.removeItem(name);
	}
	
	return{
		
		write:storage.write,
		read:storage.read,
		remove:storage.remove
	}
})
