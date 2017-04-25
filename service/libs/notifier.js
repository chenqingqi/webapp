/**
 * 框架扩展：消息广播
 */
define(function()
{
	
	/**
	 * 消息器
	 */
	window['listens'] = [];
	
	
	/**
	 * 发送
	 */
    window['sendEvent'] = function(type,data)
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
	window['listenEvent'] = function(type,back)
	{
		listens.push({type:type,back:back})
	}
	
	
	/**
	 * 查找
	 */
	window['seek'] = function(type)
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
})