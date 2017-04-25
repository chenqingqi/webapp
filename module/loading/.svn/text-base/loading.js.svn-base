/**
 * 加载动画
 */
module('loading',function()
{
	var ui = $('<img src="/resource/loading.gif" hidden="true"/>');
	
	ui.css({
		
		width:'90px',
		height:'80px'
	})
	
	function show(x,y)
	{
		ui.css({marginTop:y+'px',marginLeft:x+'px'});
		ui.show();
	}
	
	function hide()
	{
		ui.hide();
	}
	
	return{
		
		ui:ui,
		show:show,
		hide:hide
	}
})