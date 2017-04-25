/**
 * 文本输入框
 */
module('username',function()
{
	
	var ui = $('#username').attr('hidden',false);
	
	var old_value,input,btn;
	
	(function main(){
		
		input 	  = ui.find('input');
		btn   	  = ui.find('#clear');
		input.bind('focus',onInputEvent);
		input.bind('blur',onInputEvent);
		input.bind('input propertychange',onTextInput);
		btn	 .bind('touchstart',onEvent);
		btn	 .bind('touchend',onEvent);
	}())
	
	function onInputEvent(e)
	{
		if(e.type == 'focus')
		{
			if(input.val() == old_value) input.val("");
			ui.find('#text_input').css('border-bottom','1px solid #666');
		}
		else
		{
			if(input.val() == "" || input.val().length<1) input.val(old_value)
			ui.find('#text_input').css('border-bottom','1px solid #999');
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
	}
	
	function value(v)
	{
		if(!v)
		{
			return ui.find('input').val();
		}
		
		if(old_value == undefined)
		{
			old_value = v
		}
		
		ui.find('input').val(v);
	}
	
	function icon(b)
	{
		if(b)
		{
			ui.find('#icon').show();
		}
		else
		{
			ui.find('#icon').hide();
		}
	}
	
	return{
		
		value:value,
		icon:icon
	}
})
