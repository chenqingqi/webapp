/**
 * 配置数据-控制器
 */
module('configure',function()
{
	
	var storage = reg('storage');
	var request = reg('request')
	var domain  = location.host;
	
	function start(back)
	{
		/**
		 * 加载配置文件
		 */
		$.getJSON('/config.json',function(data)
		{
			window['config'] = data;
			getService();
		})
		
		
		/**
		 * 获取服务地址
		 */
		function getService()
		{
			var domain = location.host;
			
			if(domain[0] !== 'm')
			{
				config.service = "http://192.168.3.6:88/Mobile/Index/";
			}
			else
			{
				domain = domain.replace(new RegExp("m."),"");
				config.service = "http://"+domain+"/Mobile/Index/";
				
				if(domain == 'user1.cloud.com')
				{
					config.service = "http://192.168.3.6:88/Mobile/Index/";
				}
			}
			
			getDomainCode()
		}
		
		
		/**
		 * 获取域名里学校的简写(如m.hbsi.gkk.cn,将返回hbsi)
		 */
		function getDomainCode()
		{
			if(domain[0] !== 'm')
			{
				config.code = 'user1';
			}
			else
			{
				domain = domain.substring(2,domain.length);
				domain = domain.substring(0,domain.indexOf('.'));
				config.code = domain;
			}
			
			checkSchoolData();
		}
		
		/**
		 * 检测学校数据
		 */
		function checkSchoolData()
		{
			storage.remove(config.code)
			
			request.connect({
					
				debug:1,
				deviceId:'h5',
				webCode:config.code
			
			},config.api.school,'get',config.service,school_complete);
		}
		
		function school_complete(e)
		{
			if(e.code == 1000)
			{
				storage.write(config.code,JSON.stringify(e.data));
				checkUserData();
			}
			else
			{
				console.log(e.code)
				console.log(e.msg)
			}
		}
		
		
		/**
		 * 检测用户信息
		 */
		function checkUserData()
		{
			if(storage.read('user') == 0)
			{
				storage.write('login','false');
			}
			else
			{
				storage.write('login','true');
			}
			
			initNative();
		}
		
		
		/**
		 * 侦听设备旋转
		 */
		function initNative()
		{
			window.addEventListener('orientationchange',onOrientationchange);
			
			back();
		}
		
		function onOrientationchange(e)
		{
			if(orientation == 90 || orientation == -90)
			{
				var domin = location.pathname;
				
				if(domin.indexOf('course.html')!==-1)
				{
					//alert('建议您在竖屏环境下浏览访问。')
				}
			}
		}
	}
	
	/**
	 * 获取二维码
	 */
	function qrcode(str)
	{
		if(domain[0] !== 'm')
		{
			return "http://192.168.3.6:88/Home/Mobile/downloadQrcodeAction/code/"+str;
		}
		else
		{
			domain = domain.replace(new RegExp("m."),"");
			return "http://"+domain+"/Home/Mobile/downloadQrcodeAction/code/"+str;
		}
	}
	
	
	return{
		
		start:start,
		qrcode:qrcode
	}
	
})