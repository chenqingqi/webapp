/**
 * 账户视图
 */
module('user',function()
{
	
	var model     = reg('model');
	var control   = reg('control');
	
	var clear 	  = $('#clear');
	var input  	  = $('#account input');
	var next_btn  = $('#nextbtn');
	var type_btn  = $('#typebtn');
	
	var old_value = input.val();
	
	
	(function main(){
		
		next_btn.css('background-color',model.school().mainColor);
		type_btn.css('color',model.school().mainColor);
		type_btn.css('top',($(window).height()-80)+'px');
		
		clear.bind('click',clear_event);
		input.bind('focus blur input propertychange',input_event);
		next_btn.bind('touchend',next_event);
		type_btn.bind('touchend',type_event);
		
	}());
	
	
	
	/**
	 * 清除
	 */
	function clear_event(e)
	{
		input.val('');
		clear.hide()
	}
	
	
	
	/**
	 * 输入
	 */
	function input_event(e)
	{
		if(e.type =='focus')
		{
			if(input.val() == old_value) input.val('')
		}
		
		if(e.type =='blur')
		{
			if(input.val() == '') input.val(old_value)
		}
		
		if(input.val() == '' || input.val() == old_value)
		{
			clear.hide()
		}
		else
		{
			clear.show()
		}
	}
	
	
	
	/**
	 * 下一步
	 */
	function next_event(e)
	{
		control.checkAccount(input.val())
	}
	
	
	
	/**
	 * 注册类型
	 */
	function type_event(e)
	{
		if(type_btn.text() == '使用邮箱地址验证')
		{
			type_btn.text('使用手机号码验证');
			
			$('#area').hide();
			input.val('请输入邮箱地址');
			control.setType('请输入邮箱地址')
		}
		else
		{
			type_btn.text('使用邮箱地址验证');
			
			$('#area').show();
			input.val('请输入手机号码');
			control.setType('请输入手机号码');
		}
		
		old_value  = input.val();
	}
	
	
	/**
	 * 是否禁用下一步按钮
	 */
	function disbale(b)
	{
		if(b)
		{
			next_btn.unbind('click',next_event);
			next_btn.css('opacity',0.5);
		}
		else
		{
			next_btn.bind('click',next_event);
			next_btn.css('opacity',1);
		}
	}
	
	return{
		
		disbale:disbale
	}
	
})