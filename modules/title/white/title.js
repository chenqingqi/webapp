define(function()
{
	/**
	 * 白色标题栏
	 */
	function WhiteTitle(class_name)
	{
		var node;
	
		function main()
		{
			node = $("."+class_name);
			node.show();
			node.find('#back').bind('touchend',onEvent);
			node.find('#cross').bind('touchend',onEvent);
		}
		
		function onEvent(e)
		{
			if(this.id == "back")
			{
				history.back();
				return;
			}
			
			if(this.id == "cross")
			{
				sendEvent('close_click');
				return;
			}
		}
		
		this.value = function(str)
		{
			node.find('#title').text(str)
		}
		
		this.cross = function()
		{
			node.find('#cross').show()
		}
		
		
		main();
	}
	
	return WhiteTitle;
})
