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
		sendEvent('MODEL_READY');
	}
	
	
	
	/**
	 * 用户名称
	 */
	var _username;
	
	function username(value)
	{
		if(!value)
		{
			return _username;
		}
		
		_username = value;
	}
	
	
	/**
	 * 密码
	 */
	var _password;
	
	function password(value)
	{
		if(!value)
		{
			return _password;
		}
		
		_password = value;
	}
	
	
	
	/**
	 * 注册类型:1:邮箱，2:手机
	 */
	var _type = 2;
	
	function type(value)
	{
		if(!value)
		{
			return _type;
		}
		
		_type = value;
		sendEvent('REGISTER_TYPE_CHANGE');
	}
	
	
	
	/**
	 * 错误状态
	 */
	var _error_status;
	
	function error_status(value)
	{
		if(!value && value !==0)
		{
			return _error_status;
		}
		
		_error_status = value;
		sendEvent('MODEL_ERROR_STATUS');
	}
	
	
	
	/**
	 * 验证码
	 */
	var _code;
	
	function code(value)
	{
		if(!value && value !==0)
		{
			return _code;
		}
		
		_code = value;
	}
	
	
	
	/**
	 * 页面指针
	 */
	var _page = 0;
	
	function page(value)
	{
		if(!value && value !==0)
		{
			return _page;
		}
		
		_page = value;
		sendEvent('MODEL_PAGE_CHANGE');
	}
	
	
	
	/**
	 * 公开方法
	 */
	return{
		
		school	:school,
		username:username,
		password:password,
		type	:type,
		page	:page,
		code	:code,
		error_status :error_status,
	}
})