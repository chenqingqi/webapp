/**
 * 主数据
 */
module('more_model',function()
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
	
	var _logout;
	function logout(data)
	{
		if(!data)
		{
			return _logout;
		}
		
		_logout = data;
		sendEvent('logout',null);
	}
	
	
	
	return{
		
		school:school,
		logout:logout
	}
})