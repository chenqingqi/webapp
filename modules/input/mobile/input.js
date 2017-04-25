define(function()
{
	
	/**
	 * 手机号码输入框
	 */
	function MobileInput(class_name)
	{
		
		var node,btn,input,old_value;
	
		function main()
		{
			node  = $("."+class_name);
			node.show();
			
			btn   = node.find('#btn');
			input = node.find('input');
			old_value = input.val();
			
			btn.bind('touchstart',onEvent);
			btn.bind('touchend',onEvent);
			input.bind('focus',onInputEvent);
			input.bind('blur',onInputEvent);
			input.bind('input propertychange',onTextInput);
		}
		
		function onEvent(e)
		{
			if(e.type == 'touchstart')
			{
				btn.css('opacity',0.5);
				input.val("")
			}
			else
			{
				btn.css('opacity',1);
				btn.hide()
			}
		}
		
		function onInputEvent(e)
		{
			if(e.type == 'focus')
			{
				if(input.val() == old_value)
				{
					input.val("")
				}
				
				input.css('outline','none');
				node.css('border-bottom','1px solid #5baef5');
			}
			else
			{
				if(input.val() == "" || input.val().length<1)
				{
					input.val(old_value)
				}
				
				node.css('border-bottom','1px solid #999');
			}
		}
		
		function onTextInput(e)
		{
			if(input.val()!=="" && input.val().length>0)
			{
				btn.show()
			}
		}
		
		this.value = function()
		{
			return input.val()
		}
		
		this.point = function(x,y)
		{
			node.css('margin-left',x+'px');
			node.css('margin-top',y+'px')
		}
		
		main()
	}
	
	return MobileInput
	
})
