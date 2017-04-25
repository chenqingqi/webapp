/**
 * 登录按钮
 */
module('loginbtn',function()
{
	var ui = $('#loginbtn')
	
	ui.bind('touchend',onevent);
	
	function onevent(e)
	{
		disable(true)
		sendEvent('LOGINBTN_CLICK');
	}
	
	/**
	 * 禁用
	 */
	function disable(b)
	{
		if(b)
		{
			ui.unbind('touchend',onevent);
			ui.css('opacity',0.8)
		}
		else
		{
			ui.bind('touchend',onevent);
			ui.css('opacity',1)
		}
	}
	
	
	/**
	 * 颜色
	 */
	function color(value)
	{
		ui.css('background-color',value);
	}
	
	
	return{
		
		color	:color,
		disable	:disable,
		ui:ui
	}
})