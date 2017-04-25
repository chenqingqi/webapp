/**
 * 主数据
 */
module('search_homemodel',function()
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
	 * 课程数据
	 */
	var _searchcurser;
	
	function searchcurser(data)
	{
		if(!data)
		{
			return _searchcurser;
		}
		
		_searchcurser = data;
		sendEvent('searchcurserready',null);
	}

	
	return{
		school:school,
		searchcurser:searchcurser
	}
})