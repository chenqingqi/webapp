/**
 * 标题栏视图
 */
module('titlebar',function()
{
	
	var ui = $('#titlebar').bind('click',onBack);
	
	
	/**
	 * 回退
	 */
	function onBack(e)
	{
		sendEvent('TITLEBAR_BACK')
	}
	
	
	
	/**
	 * 设置或获取标题
	 */
	function value(str)
	{
		ui.find('#title').text(str);
	}
	
	
	
	/**
	 * 设置颜色
	 */
	function style(bgcolor,txtcolor,backcolor)
	{
		if(bgcolor) 
		{
			ui.css('background-color',bgcolor)
			ui.find('#back').css('background-color',bgcolor)
			ui.find('#title').css('background-color',bgcolor)
		}
		
		if(txtcolor)
		{
			ui.find('#title').css('color',txtcolor)
		}
		
		if(backcolor)
		{
			toner.setBgImageColor(ui.find('#back')[0],backcolor.start,backcolor.end)
		}
	}
	
	
	/**
	 * 公开接口
	 */
	return{
		
		value:value,
		style:style
	}
})