/**
 * 菜单控制器
 */
module('menu',function()
{
	
	var ui    = $('#menu');
	var model = reg('model');
	var toner = reg('toner');
	var storage = reg('storage')
	
	
	function main()
	{
		ui.find('#home').bind('touchend',menu_event);
		
		ui.find('#school').bind('touchend',menu_event);
		
		ui.find('#find').bind('touchend',menu_event);
		
		ui.find('#my').bind('touchend',menu_event);
		
		for(var i=0;i<ui.children().length;i++)
		{
			toner.setBgImageColor(ui.children()[i],'#5BAEF5',model.school().mainColor);
		}
		
		ui.attr('hidden',false)
		
		listenEvent('POINTER_CHANGE',pointer_change);
		
		
		window.setTimeout(function()
		{
			focus(model.pointer());
			
		},1000);
		
		
		ui.bind('touchmove',function(e)
		{
			e.preventDefault()
		})
		
		reg('system').setTitle(model.school().webSimpleName);
	}
	
	
	/**
	 * 点击
	 */
	function menu_event(e)
	{
		switch(e.target.id)
		{
			case 'home':
				model.pointer(0);
				focus(0);
				reg('system').setTitle('首页');
				break;
			
			case 'school':
				model.pointer(1);
				focus(1);
				reg('system').setTitle('院系');
				break;
			
			case 'find':
				model.pointer(2);
				focus(2);
				reg('system').setTitle('发现');
				break;
			
			case 'my':
				focus(3);
				model.pointer(3);
				reg('system').setTitle('我的');
				break;
		}
	}
	
	
	/**
	 * 页面指针已变更
	 */
	function pointer_change(e)
	{
		storage.write('pointer',model.pointer())
		focus(model.pointer())
	}
	
	
	/**
	 * 设置焦点
	 */
	function focus(n)
	{
		for(var i=0;i<ui.children().length;i++)
		{
			$(ui.children()[i]).css('color','#333');
			$(ui.children()[i]).css('background-position-y','0px');
		}	
		
		$(ui.children()[n]).css('color',model.school().mainColor);
		$(ui.children()[n]).css('background-position-y','100px');
		
		
		switch(n)
		{
			case '0':
				reg('system').setTitle('首页');
				break;
			
			case '1':
				reg('system').setTitle('院系');
				break;
			
			case '2':
				reg('system').setTitle('发现');
				break;
			
			case '3':
				reg('system').setTitle('我的');
				break;
		}
	}
	
	main()

})
