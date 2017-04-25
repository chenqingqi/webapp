/**
 * 主数据
 */
module('feedback_model',function()
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
	
	 var _feedback;
	 function setfeedback(data){
	 	if(!data)
		{
			return _feedback;
		}
		
		_feedback = data;
		sendEvent('feedok',null);
	 }
	
	
	return{
		
		school:school,
		setfeedback:setfeedback
	}
})