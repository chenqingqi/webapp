define(function()
{
	/**
	 * 解绑弹框
	 */
	function UnbindTip(class_name)
	{
		var node,code_btn,input,old_value,timer;
		
		function main()
		{
			node = $('.'+class_name);
			code_btn = node.find('#code_btn');
			input = node.find('input');
			old_value = input.val();
			node.find('#panel').css('margin-top',($(window).height()-700)/2+'px');
			
			node.find('#esc').bind('touchend',onEvent);
			node.find('#enter').bind('touchend',onEvent);
			code_btn.bind('touchend',onEvent);
			input.bind('focus',onInputEvent);
			input.bind('blur',onInputEvent);
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
				sendEvent('enter',input.val())
				return;
			}
			
			if(this.id == 'code_btn')
			{
				code_btn.unbind('touchend',onEvent);
				code_btn.css('background-color','#999')
				sendEvent('code_btn_click')
				
				var time = 60;
				timer = window.setInterval(function(){
					
					time -=1;
					code_btn.text(time+'秒');
					
					if(time == 1)
					{
						time = 60;
						code_btn.text('获取验证码');
						code_btn.bind('touchend',onEvent);
						code_btn.css('background-color','#5baef5')
						window.clearInterval(timer);
					}
					
				},1000)
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
				
				node.find('#panel').css('margin-top','-200px');
				return;
			}
			
			if(e.type == 'blur')
			{
				if(input.val() == "" || input.val().length<1)
				{
					input.val(old_value)
				}
				
				window.setTimeout(function(){
					
					node.find('#panel').css('margin-top',($(window).height()-700)/2+'px')
				},500)
			}
		}
		
		
		this.show = function()
		{
			node.show()
		}
		
		this.first = function(name,icon,user)
		{
			node.find('#panel').find('#first_name').text(name);
			node.find('#panel').find('#first_account').find('img').attr('src',icon);
			node.find('#panel').find('#first_account').find('p').text(user);
		}
		
		this.next = function(name,icon,user)
		{
			node.find('#panel').find('#next_name').text(name);
			node.find('#panel').find('#next_account').find('img').attr('src',icon);
			node.find('#panel').find('#next_account').find('p').text(user);
		}
		
		main()
	}
	
	return UnbindTip;
})