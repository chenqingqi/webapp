/**
 * 标题栏
 */
module('titlebar',function()
{
	var toner = reg('toner');
	
	var ui = $('#titlebar').attr('hidden',false);
	
	ui.bind('click',onBack);
	
	function onBack(e)
	{
		history.back();
	}
	
	function value(str)
	{
		ui.find('#title').text(str);
	}
	
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
	
	return{
		
		value:value,
		style:style
	}
})