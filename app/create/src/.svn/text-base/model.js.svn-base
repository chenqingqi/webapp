/**
 * 主数据
 */
app.model('model',function()
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
		sendEvent('READY');
	}
	
	return{
		
		school:school
	}
})