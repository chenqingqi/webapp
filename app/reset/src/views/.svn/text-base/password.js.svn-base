/**
 * 密码输入框
 */
module('password',function()
{
	
	var ui = $($('#password')[0].outerHTML).attr('hidden',false);
	
	var old_value,input,btn,eye,eye_status;
	
	
	/**
	 * 构造函数
	 */
	function main(){
		
		input = ui.find('input');
		btn   = ui.find('#clear');
		eye   = ui.find('#eye');
		eye_status = true;
		
		input.bind('focus',onInputEvent);
		input.bind('blur',onInputEvent);
		input.bind('input propertychange',onTextInput);
		btn.bind('touchstart',onBtnEvent);
		btn.bind('touchend',onBtnEvent);
		eye.bind('touchstart',onEyeEvent);
		eye.bind('touchend',onEyeEvent);
		
	};
	
	
	/**
	 * 输入框焦点
	 */
	function onInputEvent(e)
	{
		if(e.type == 'focus')
		{
			console.log(old_value)
			
			if(input.val() == old_value)
			{
				input.val("");
				onEyeEvent({type:null});
			}
			ui.css('border-bottom','1px solid #666');
		}
		else
		{
			if(input.val() == "" || input.val().length<1)
			{
				input.val(old_value);
				onEyeEvent({type:null});
			}
			ui.css('border-bottom','1px solid #999');
		}
	}
	
	
	/**
	 * 清除按钮
	 */
	function onBtnEvent(e)
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
	
	
	/**
	 * 密码显隐
	 */
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
				eye.attr('src','/resource/eye_close.png');
				type('password')
			}
			else
			{
				eye_status = true;
				eye.attr('src','/resource/eye_open.png');
				type('text')
			}
		}
	}
	
	
	/**
	 * 用户输入
	 */
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
	
	
	/**
	 * 输入类型
	 */
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
	
	
	/**
	 * 输入值
	 */
	function value(str)
	{
		if(!str)
		{
			return input.val();
		}
		else
		{
			if(old_value == undefined)
			{
				old_value = str
			}
			
			input.val(str);
		}
	}
	
	main()
	
	/**
	 * 公开API
	 */
	return{
		
		ui:ui,
		value:value
	}
})
