/**
 * 选项卡
 */
module('tab',function()
{
	
	var model = reg('model');
	
	var system = reg('system');
	
	var ui = $('#tab');
	
	ui.bind('click',on_click);
	
	if(system.getValue('type') == null)
	{
		focus(0)
	}
	else
	{
		focus(system.getValue('type'))
	}
	
	
	function on_click(e)
	{
		if(e.target.id == 'chapter_btn')
		{
			focus(0)
		}
		
		if(e.target.id == 'live_btn')
		{
			focus(1)
		}
	}
	
	
	/**
	 * 设置焦点
	 */
	function focus(n)
	{
		if(n=='0')
		{
			ui.find('#chapter').show();
			ui.find('#live').hide();
			ui.find('#chapter_btn').css('border-bottom','2px solid '+model.school().mainColor);
			ui.find('#live_btn').css('border-bottom','none');
		}
		else
		{
			ui.find('#live').show();
			ui.find('#chapter').hide();
			ui.find('#chapter_btn').css('border-bottom','none');
			ui.find('#live_btn').css('border-bottom','2px solid '+model.school().mainColor);
		}
	}
})