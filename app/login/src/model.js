/**
 * 主数据
 */
module('model',function()
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
	
	
	/**
	 * 登录类型
	 */
	var _type = 0;
	
	function type(value)
	{
		if(!value && value !==0)
		{
			return _type;
		}
		
		_type = value;
	}
	
	
	/**
	 * 错误状态
	 */
	var _error_status = null;
	
	function error_status(value)
	{
		if(!value)
		{
			return _error_status;
		}
		
		_error_status = value;
		self.sendEvent('ERROR_STATUS_CHANGE');
	}
	
	
	return{
		
		school		:school,
		type		:type,
		error_status:error_status
	}
})