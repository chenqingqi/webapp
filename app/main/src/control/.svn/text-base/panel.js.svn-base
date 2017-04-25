/**
 * 滚动面板
 */
module('panel',function()
{
	var ui = $('#panel');
	
	var model = reg('model');
	
	function main()
	{
		ui.find('li').css('height',($(window).height()-178)+'px');
		listenEvent('POINTER_CHANGE',pointer_change);
		move();
	}
	
	
	/**
	 * 指针已变更
	 */
	function pointer_change(e)
	{
		move()
	}
	
	function move()
	{
		ui.find('#content').css('margin-left',-(640*model.pointer())+'px');
	}
	
	main();
})
