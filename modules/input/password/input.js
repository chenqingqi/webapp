define(function()
{
	/**
	 * 密码输入框
	 */
	function PasswordInput(class_name)
	{
		
		var node,input,btn,old_value,eye,eye_status;
	
		function main()
		{
			node = $("."+class_name);
			node.show();
			
			input = node.find('input');
			btn   = node.find('#clear');
			eye   = node.find('#eye');
			old_value  = input.val();
			eye_status = true;
			
			input.bind('focus',onInputEvent);
			input.bind('blur',onInputEvent);
			input.bind('input propertychange',onTextInput);
			btn.bind('touchstart',onEvent);
			btn.bind('touchend',onEvent);
			eye.bind('touchstart',onEyeEvent);
			eye.bind('touchend',onEyeEvent);
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
		
		function onEyeEvent(e)
		{
			if(e.type == 'touchstart')
			{
				eye.css('opacity',0.5);
			}
			else
			{
				eye.css('opacity',1);
				
				if(eye_status)
				{
					eye_status = false;
					eye.css('background-image','url(/resource/eye_close.png)');
					type('password')
				}
				else
				{
					eye_status = true;
					eye.css('background-image','url(/resource/eye_open.png)')
					type('text')
				}
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
		}
		
		function type(str)
		{
			if(str == 'text')
			{
				input.attr('type','text');
			}
			else if('password')
			{
				input.attr('type','password');
			}
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
	
	return PasswordInput;
})
