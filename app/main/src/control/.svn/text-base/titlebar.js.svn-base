/**
 * 标题栏控制器
 */
module('titlebar',function()
{
	
	var ui = $('#titlebar');
	
	var model = reg('model');
	var storage = reg('storage');
	function main()
	{
		ui.find('#title').css('background-color',model.school().mainColor);
		ui.find('#back').css('background-color',model.school().mainColor);
		ui.find('#search').css('background-color',model.school().mainColor);
		ui.find('#title').text(model.school().webCode);
		listenEvent('POINTER_CHANGE',pointer_change);
		
		
		
		pointer_change()
	}
	
	
	/**
	 * 页面指针已变更
	 */
	function pointer_change(e)
	{
		if(model.pointer() == 0)
		{
			ui.find('#search').css('background-image','url(/resource/search.png)')
			ui.find('#search').bind('click',click_event)
			ui.find('#title').text(model.school().webCode);
		}
		
		if(model.pointer() == 1)
		{
			ui.find('#search').css('background-image','url()')
			ui.find('#search').unbind('click',click_event)
			ui.find('#title').text('院系');
		}
		
		if(model.pointer() == 2)
		{
			ui.find('#search').css('background-image','url()')
			ui.find('#search').unbind('click',click_event)
			ui.find('#title').text('发现');
		}
		
		if(model.pointer() == 3)
		{
			var user=JSON.parse(storage.read('user'));
			if(user!=''){
				ui.find('#search').css('background-image','url(/resource/more.png)')
			    ui.find('#search').bind('click',click_event);
			}else{
				ui.find('#search').css('background-image','url()')
			    ui.find('#search').unbind('click',click_event);
			}
			
			ui.find('#title').text('我的');
		}
	}
	
	/**
	 * 跳转
	 */
	function click_event(e)
	{
		if(model.pointer() == 3)
		{
			location.href = config.route.more
		}
		else
		{
			location.href = config.route.search
		}
	}
	
	main();
})
