/**
 * 主控制器
 */
module('control',function()
{
	
	var model = reg('model');
	
	var storage = reg('storage');
	
	var request = reg('request');
	
	var system  = reg('system')
	
	var user;
	
	reg('configure').start(complete)
	
	function complete()
	{
		model.school(JSON.parse(storage.read(config.code)))
	}
	
	/**
	 * 更新登录类型
	 */
	function setType(value)
	{
		model.type(value);
	}
	
	/**
	 * 登录
	 */
	function login(user,code)
	{
		request.connect({
			
			debug:1,
			deviceId:'h5',
			account:user,
			password:code,
			isCloudLogin:model.type()
		
		},config.api.login,'post',config.service,login_complete)
	}
	
	function login_complete(e)
	{
		console.log(e)
		
		if(e.code == 1000)
		{
			/**
			 * 存储登录数据
			 */
			storage.write('user',JSON.stringify(e.data));
			
			
			/**
			 * 处理登录完成后的业务
			 */
			if(e.data.openId > 0)
			{
				//alert('登录成功，进入首页！')
				
				
				var url;
				
				if(system.getValue('form'))
				{
					for(var i in config.route)
					{
						if(i == system.getValue('form'))
						{
							url = config.route[i]
						}
					}
				}
				else
				{
					url = config.route.main
				}
				
				if(system.getValue('form') == 'course')
				{
					location.href = url+'?treeid='+system.getValue('treeid')+'&publicCourse='+system.getValue('publicCourse')
				}
				else
				{
					location.href = url
				}
			}
			else
			{
				/**
				 * 根据登录类型，处理新建/关联/解绑
				 */
				if(model.type() == 0)
				{
					localToCloud();
				}
				else
				{
					cloudToLocal();
				}
			}
		}
		else
		{
			model.error_status(e.msg);
		}
	}
	
	/**
	 * 处理本地账号与云账号的关系/////////////////////////////////
	 */
	function localToCloud()
	{
		user = JSON.parse(storage.read('user'));
		
		request.connect({
			
			debug:1,
			deviceId:'h5',
			mid:user.uid,
			oauth_token:user.oauth_token,
			oauth_token_secret:user.oauth_token_secret,
			account:user.account
			
		},config.api.local_to_cloud,'get',config.service,LocaltoCloudComplete);
	}
	
	function LocaltoCloudComplete(e)
	{
		if(e.code == 1000)
		{
			/**
			 * 是否绑定了云账号？
			 */
			if(e.data.length == 0)
			{
				
				 location.href = config.route.bind_new+'?type=local&user='+user.account+'&uid='+user.uid+'&userface='+user.userface;
				
				//alert('开始新建云账号')
			}
			else
			{
				if(e.data[0].bindLocalUser.uid == undefined)
				{
					//alert('没有绑定，开始关联云账号');
					
					//关联云账号
					var data = 
					{
						local:
						{
							uid:user.uid,
							user:user.account,
							userface:user.userface
						},
						
						cloud:
						{
							uid:e.data[0].uid,
							user:e.data[0].mobile,
							userface:e.data[0].userface
						}
					}
					
					data = JSON.stringify(data);
					
					
					location.href = config.route.bind_start+'?type=local&data='+data;
					
				}
				else
				{
					//alert('已绑定，解绑云账号');
					
					location.href = "/app/main/main.html";
				}
			}
		}
		else
		{
			alert('获取[本地账号与云账号的关系]时出错：'+e.msg);
		}
	}
	
	/**
	 * 处理云账号与本地账号的关系/////////////////////////////////
	 */
	function cloudToLocal()
	{
		var user = JSON.parse(Storage.read('user'));
		
		if(user.cloudLogin_bindLocalUser.uid == undefined)
		{
			if(user.cloudLogin_unbindLocalUsers.length > 0)
			{
				alert('没有绑定，开始关联本地账号');
			}
			else
			{
				alert('开始新建本地账号');
			}
		}
		else
		{
			alert('已绑定，解绑本地账号');
		}
	}
	
	return{
		
		login:login,
		setType:setType
	}
})