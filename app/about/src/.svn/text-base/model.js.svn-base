/**
 * 主数据
 */
module('about_model',function()
{
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
		sendEvent('READY',null);
	}
	/**
	 * 学校数据
	 */
	var _about;
	
	function setabout(data)
	{
		if(!data)
		{
			return _about;
		}
		
		_about = data;
		sendEvent('about',null);
	}
	
	
	
	return{
		
		school:school,
		setabout:setabout
	}
})