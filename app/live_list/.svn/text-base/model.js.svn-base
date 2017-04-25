/**
 * 主数据
 */
module('model',function()
{
	
	var storage = reg('storage');
	
	/**
	 * 初始化配置数据
	 */
	reg('configure').start(complete)
	
	function complete()
	{
		school(JSON.parse(storage.read(config.code)));
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
	
	
	/**
	 * 直播列表数据
	 */
	var _all_live;
	
	function all_live(data)
	{
		if(!data)
		{
			return _all_live;
		}
		
		_all_live = data;
		
		sendEvent('ALL_LIVE_COMPLETE');
	}
	
	
	return{
		
		school:school,
		all_live:all_live
	}
})
