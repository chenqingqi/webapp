/**
 * 模块化框架
 */
function Plugin()
{
	
	/**
	 * 注册器
	 */
	var storage = [];
	
	
	/**
	 * 定义模块
	 */
	this.module = function(name,func)
	{
		storage.push({name:name,func:func});
	}
	
	
	/**
	 * 注册或获取在全局注册的模块
	 * 模板将会被以单例的方式注册到全局，如果模块已注册则返回模块。
	 */
	this.reg = function(name)
	{
		if(arguments.length == 1)
		{
			for(var i=0;i<storage.length;i++)
			{
				if(name == storage[i].name)
				{
					if(typeof storage[i].func == 'function')
					{
						storage[i].func = new storage[i].func();
						return storage[i].func;
					}
					else
					{
						return storage[i].func;
					}
				}
			}
		}
		else
		{
			for(var p=0;p<arguments.length;p++)
			{
				for(var i=0;i<storage.length;i++)
				{
					if(arguments[p] == storage[i].name)
					{
						if(typeof storage[i].func == 'function')
						{
							storage[i].func = new storage[i].func();
						}
					}
				}
			}
		}
	}
	
	
	/**
	 * 获取模块类（未初始化）
	 */
	this.get = function(name)
	{
		for(var i=0;i<storage.length;i++)
		{
			if(name == storage[i].name)
			{
				if(typeof storage[i].func == 'function')
				{
					return storage[i].func;
				}
				else
				{
					throw name+'已在全局注册！'
				}
			}
		}
	}
}

window.plugin   = new Plugin();
window.module   = plugin.module;
window.reg 		= plugin.reg;
window.get 		= plugin.get;



/**
 * 类加载器
 */
function ClassLoader()
{
	
	/**
	 * 获取入口
	 */
	var head   = document.getElementsByTagName('head').item(0)
	var script = document.createElement("script");
	script.src = document.getElementsByTagName('script')[0].attributes['main'].value+'.js';
	head.appendChild(script);
	
	script.onload = function()
	{
		head.removeChild(script);
	}
	
	
	/**
	 * 循环加载
	 */
	this.load = function(obj,back)
	{
		var count = 0;
		
		var data  = [];
		
		for(var i in obj)
		{
			data.push(obj[i])
		}
		
		function loadJS()
		{
			var head   = document.getElementsByTagName('head').item(0)
			var script = document.createElement("script");
			head.appendChild(script);
			
			script.src = data[count]+'.js';
			script.onload = function()
			{
				count +=1;
				
				head.removeChild(script);
				
				if(count == data.length)
				{
					back()
				}
				else
				{
					loadJS()
				}
			}
		}
		
		loadJS();
	}
}

window['config'] = new ClassLoader().load;





/**
 * 消息广播
 */
function Notifier()
{
	
	/**
	 * 消息器
	 */
	var listens = [];
	
	
	/**
	 * 发送
	 */
	this.sendEvent = function(type,data)
	{
		for(var i=0;i<listens.length;i++)
		{
			if(listens[i].type == type)
			{
				listens[i].back({type:type,data:data})
			}
		}
	}
	
	
	/**
	 * 侦听
	 */
	this.listenEvent = function(type,back)
	{
		listens.push({type:type,back:back})
	}
	
	
	/**
	 * 查找
	 */
	this.seek = function(type)
	{
		for(var i=0;i<listens.length;i++)
		{
			if(listens[i].type == type)
			{
				return true
			}
		}
		return false
	}
	
}

window.notifier    = new Notifier();
window.sendEvent   = notifier.sendEvent;
window.listenEvent = notifier.listenEvent;