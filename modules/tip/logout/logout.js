define(function()
{
	/**
	 * 退出登录
	 */
	function Logout(class_name)
	{
		var node;
		
		function main()
		{
			node = $('.'+class_name);
			node.find('#panel').css('margin-top',($(window).height()-300)/2+'px');
			
			node.find('#esc').bind('touchend',onEvent);
			node.find('#enter').bind('touchend',onEvent);
		}
		
		
		function onEvent(e)
		{
			if(this.id == 'esc')
			{
				node.hide();
				return;
			}
			
			if(this.id == 'enter')
			{
				sendEvent('enter_click')
				return;
			}
		}
		
		
		this.show = function()
		{
			node.show();
		}
		
		main()
	}
	
	return Logout;
})