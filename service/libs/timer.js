/**
 * 模块：Timer计时器
 */
define(function()
{
	
	/**
	 * 当前计时器对象
	 */
	var interval;
	
	/**
	 * 从 0 开始后触发的总次数
	 */
	var count = 0;
	
	/**
	 * 从0开始后运行总时间(毫秒)
	 */
	var time  = 0 ;
	
	
	/**
	 * 开始计时
	 * @param {Object} msecs 间隔秒数
	 * @param {Object} total 运行次数
	 * @param {Object} heart 心跳回调
	 * @param {Object} complete 计时完成回调
	 */
	function start(msecs,total,heart,complete)
	{
		interval = window.setInterval(function()
		{
			if(count == total)
			{
				window.clearInterval(interval);
				complete({count:count,time:time})
			}
			else
			{
				count +=1;
				time = msecs * count;
				heart({count:count,time:time})
				
				if(count == runcount)
				{
					window.clearInterval(interval);
					complete({count:count,time:time})
				}
			}
		
		},msecs);
	}
	
	
	/**
	 * 结束计时
	 */
	function end()
	{
		window.clearInterval(interval);
	}
	
	
	return{
		
		count:count,
		time:time,
		start:start,
		end:end
	}
})


