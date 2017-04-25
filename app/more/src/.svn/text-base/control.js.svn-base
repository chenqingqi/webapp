/**
 * 主控制器
 */
module('more_control',function()
{
	
	var model = reg('more_model');
	reg('configure').start(complete);
	var storage = reg('storage');
	var request = reg('request');
	var user    = JSON.parse(reg('storage').read('user'));
	
	
	function complete()
	{   
		model.school(JSON.parse(storage.read(config.code)));
	}
	
	
	function getresourcelist()
	{	
		request.connect({
			
			debug:1,
			deviceId:'h5',
			mid:user.uid,
			oauth_token:user.oauth_token,
			oauth_token_secret:user.oauth_token_secret
			
		},config.api.logout,'post',config.service,setresourcelist)
		
	}
	
	function setresourcelist(e)
	{
		model.logout(e);
	}
	  
	return{
		
		getresourcelist:getresourcelist
		
	}
})