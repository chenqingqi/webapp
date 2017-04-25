define(function()
{
	
	/**
	 * 验证码输入框
	 */
	function CodeInput(class_name)
	{
		
		var node,btn,input,old_value;
	
		var timer,time = 60;
		
		function main()
		{
			node = $("."+class_name);
			node.show();
			
			btn   = node.find('#btn');
			input = node.find('input');
			old_value = input.val();
			
			btn.bind('touchstart',onEvent);
			input.bind('focus',onInputEvent);
			input.bind('blur',onInputEvent);
			input.bind('input propertychange',onTextInput);
		}
		
		function onEvent(e)
		{
			timer = window.setInterval(onTimer,1000);
			btn.css('border','1px solid #fff');
			btn.css('color','#999');
			btn.unbind('touchstart',onEvent);
			
			sendEvent('code_btn_click')
		}
		
		function onTimer()
		{
			time -=1;
			btn.text('('+time+'秒)重新获取验证码');
			
			if(time == 0)
			{
				btn.text('重新获取验证码');
				window.clearInterval(timer);
				btn.bind('touchstart',onEvent);
				btn.css('border','1px solid #5baef5');
				btn.css('color','#5baef5');
				time = 60;
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
	
	return CodeInput
})
