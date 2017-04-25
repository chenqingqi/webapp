define(function()
{
	/**
	 * 文本输入框
	 */
	function TextInput(class_name)
	{
		var node,input,btn,old_value;
	
		function main()
		{
			node = $("."+class_name);
			node.show();
			
			input = node.find('input');
			btn   = node.find('#clear');
			old_value = input.val();
			
			input.bind('focus',onInputEvent);
			input.bind('blur',onInputEvent);
			input.bind('input propertychange',onTextInput);
			btn.bind('touchstart',onEvent);
			btn.bind('touchend',onEvent);
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
				
				sendEvent('focus')
			}
			else
			{
				if(input.val() == "" || input.val().length<1)
				{
					input.val(old_value)
				}
				node.css('border-bottom','1px solid #999');
				sendEvent('blur')
			}
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
		
		function onTextInput(e)
		{
			if(input.val()!=="" && input.val().length>0)
			{
				btn.show();
			}
			else
			{
				btn.hide();
			}
			
			sendEvent('focus');
		}
		
		this.point = function(x,y)
		{
			node.css('margin-left',x+'px');
			node.css('margin-top',y+'px');
		}
	
		
		this.value = function()
		{
			return input.val();
		}
		
		main()
	}
	
	return TextInput
})
