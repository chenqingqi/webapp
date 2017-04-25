/**
 * 配置文件加载器
 */
define(function()
{
	
	var Config = new Object();
	
	Config.init = function(back)
	{
		$.getJSON('/config.json',function(data)
		{
			window['app'] = data;
			back();
		})
	}
	
	return Config;
})