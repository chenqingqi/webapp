/**
 * 主控制器
 */
module('control',function()
{
	
	var model = reg('model');
	
	var request = reg('request');
	
	var storage = reg('storage');
	
	reg('configure').start(complete);
	
	function complete()
	{
		model.school(JSON.parse(storage.read(config.code)))
	}
	
	
	
	/**
	 * 更新注册类型
	 */
	function setType(value)
	{
		if(value == '请输入邮箱地址')
		{
			model.type(1);
		}
		else
		{
			model.type(2);
		}
	}
	
	
	
	/**
	 * 检测用户账户
	 */
	function checkAccount(user)
	{
		model.username(user);
		
		request.connect({
				
			debug:1,
			deviceId:'h5',
			type:model.type(),
			account:user,
			isCheckExist:0
			
		},config.api.check_account,'post',config.service,onCheckAccount);
		
		reg('user').disable(true);
	}
	
	function onCheckAccount(e)
	{
		if(e.code == 1000)
		{
			model.page(1)
		}
		else
		{
			model.error_status(e.msg);
			reg('user').disable(false);
		}
	}
	
	
	
	/**
	 * 获取验证码
	 */
	function getCode()
	{
		if(model.type() == 1)
		{
			request.connect({
				
				debug:1,
				deviceId:'h5',
				email:model.username(),
				type:0
			
			},config.api.get_mail_code,'post',config.service,code_complete)
		}
		
		if(model.type() == 2)
		{
			request.connect({
				
				debug:1,
				deviceId:'h5',
				mobile:model.username(),
				type:0
				
			},config.api.get_mobile_code,'post',config.service,code_complete)
		}
	}
	
	function code_complete(e)
	{
		if(e.code == 1000)
		{
			reg('check').showInfo(true)
		}
		else
		{
			model.error_status(e.msg)
		}
	}
	
	
	
	/**
	 * 存储验证码
	 */
	function saveCode(value)
	{
		model.code(value)
	}
	
	
	
	/**
	 * 校验验证码
	 */
	function checkCode()
	{
		request.connect({
				
			debug:1,
			deviceId:'h5',
			account:model.username(),
			type:model.type(),
			code:model.code(),
			ignoreCheckAccount:1
			
		},config.api.check_code,'post',config.service,check_code_complete);
		
		reg('check').disable(true);
	}
	
	function check_code_complete(e)
	{
		if(e.code == 1000)
		{
			model.page(2)
		}
		else
		{
			model.error_status(e.msg);
			reg('check').disable(false);
		}
	}
	
	
	/**
	 * 注册
	 */
	function regAccount()
	{
		request.connect({
				
			debug:1,
			deviceId:'h5',
			account:model.username(),
			password:model.password(),
			code:model.code(),
			from:2,
			ignoreCode:1,
			type:model.type()
			
		},config.api.register,'post',config.service,reg_complete);
		
		reg('code').disable(true);
	}
	
	function reg_complete(e)
	{
		if(e.code == 1000)
		{
			location.href = config.route.login;
		}
		else
		{
			model.error_status(e.msg);
			reg('code').disable(false);
		}
	}
	
	
	/**
	 * 公开方法
	 */
	return{
		
		setType		:setType,
		checkAccount:checkAccount,
		getCode		:getCode,
		checkCode	:checkCode,
		saveCode	:saveCode,
		regAccount	:regAccount
	}
})