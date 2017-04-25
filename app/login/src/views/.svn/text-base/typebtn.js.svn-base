/**
 * 登录类型按钮
 */
module('typebtn',function()
{
	var ui = $('#typebtn').css('top',($(window).height()-80)+'px');
	
	var type = 0;
	
	ui.bind('touchend',onevent);
	
	function onevent(e)
	{
		if(type==0)
		{
			type = 1
		}
		else
		{
			type = 0;
		}
		
		setType(type);
	}
	
	function setType(type)
	{
		if(type==0)
		{
			ui.text('使用云联盟账号登录');
		}
		else
		{
			ui.text('使用高校云账号登录');
		}
		
		sendEvent('TYPEBTN_CHANGE',type)
	}
	
	function color(c)
	{
		ui.css('color',c)
	}
	
	function hide(b)
	{
		if(b)
		{
			ui.hide()
		}
		else
		{
			ui.show()
		}
	}
	
	return{
		
		type:type,
		color:color,
		hide:hide
	}
})