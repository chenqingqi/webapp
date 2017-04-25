define(function()
{
	
	/**
	 * 简单按钮
	 */
	function SimpleButton(class_name)
	{
		
		var node;
	
		function main()
		{
			node = $("."+class_name);
			node.show();
			node.bind('touchstart',onEvent);
			node.bind('touchend',onEvent);
		}
		
		
		function onEvent(e)
		{
			if(e.type == 'touchstart')
			{
				node.css('opacity',0.5);
				return;
			}
			
			node.css('opacity',1);
			sendEvent('button_click',node.attr('class'));
		}
		
		
		this.value = function(str)
		{
			node.find('#title').text(str)
		}
		
		
		this.disable = function(b)
		{
			if(b)
			{
				node.unbind('touchstart',onEvent);
				node.unbind('touchend',onEvent);
				node.css('opacity',0.5);
				return;
			}
			node.bind('touchstart',onEvent);
			node.bind('touchend',onEvent);
			node.css('opacity',1);
		}
		
		
		this.point = function(x,y)
		{
			node.css('margin-left',x+'px');
			node.css('margin-top',y+'px')
		}
		
		main()
	}
	
	
	return SimpleButton;
})
