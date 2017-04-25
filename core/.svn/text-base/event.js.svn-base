define(['core/source'],function(Source)
{
	/**
	 * 消息广播
	 */
	function Event()
	{
		
		/**
		 * 存储this指针
		 */
		var self = this;
		
		/**
		 * 继承至顶级类
		 */
		Source.call(self);
		
		/**
		 * 消息对象
		 */
		self.listens = [];
		
		
		/**
		 * 注册消息
		 */
		self.listenEvent= function(type,back)
		{
			if(self.seekGlobal() == false)
			{
				window.objects.push(self);
			}
			
			self.listens.push({type:type,back:back});
		}
		
		
		/**
		 * 删除消息
		 */
		self.removeEvent = function(type)
		{
			for(var i=0;i<self.listens.length;i++)
			{
				if(type == self.listens[i].type) self.listens.splice(i,1);
			}
		}
		
		
		/**
		 * 检查消息
		 */
		self.seek = function(type)
		{
			for(var i=0;i<self.listens.length;i++)
			{
				if(type == self.listens[i].type) return true;
			}
			return false;
		}
		
		
		/**
		 * 检查对象是否注册在全局
		 */
		self.seekGlobal = function()
		{
			if(!window.objects) window['objects'] = [];
			
			for(var i=0;i<window.objects.length;i++)
			{
				if(self == window.objects[i])
				{
					return true;
				}
			}
			
			return false;
		}
		
		
		/**
		 * 发送消息
		 * @type 名称
		 * @data 数据
		 * @all  是否全局
		 */
		self.sendEvent = function(type,data,all)
		{
			if(!all) all = false;
			
			if(all)
			{
				for(var i=0;i<window.objects.length;i++)
				{
					var object = window.objects[i];
					
					for(var o=0;o<object.listens.length;o++)
					{
						if(type == object.listens[o].type)
						{
							object.listens[o].back({type:type,data:data,target:self});
						}
					}
				}
			}
			else
			{
				for(var k=0;k<self.listens.length;k++)
				{
					if(type == self.listens[k].type) self.listens[k].back({type:type,data:data,target:self});
				}
			}
		}
	}
	
	return Event;
})
