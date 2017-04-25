/**
 * 主数据
 */
module('coursedetails_model',function()
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
	var _resource;
	
	function setresource(data)
	{
		if(!data)
		{
			return _resource;
		}
		
		_resource = data;
		sendEvent('resourceready',null);
	}
	
/*
 * 获取页面传递的参数
 */
    function getClassinformation(){
    	alert(window.location.href);
    }
    
	return{
		
		school:school,
		getClassinformation:getClassinformation,
		setresource:setresource
	}
})