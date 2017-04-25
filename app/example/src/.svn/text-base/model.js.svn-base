/**
 * 主数据
 */
module('model',function()
{
	
	var storage = reg('storage');
	
	/**
	 * 初始化配置数据
	 */
	function init()
	{
		reg('configure').start(complete)
	}
	
	function complete()
	{
		
		school(JSON.parse(storage.read(config.code)))
	}
	
	
	/**
	 * 学校数据
	 */
	var _school;
	
	function school(data)
	{
		if(!data)
		{
			return _school;
		}
		
		_school = data;
		sendEvent('READY');
	}
	
	
	return{
		init  :init,
		school:school
	}
})
