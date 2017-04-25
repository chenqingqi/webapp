/**
 * 设置密码视图
 */
module('code',function()
{
	
	var model      = reg('model');
	var control    = reg('control');
	var ui         = $('#code');
	var submit     = ui.find('#submit')
	var one_code   = get('password')();
	var two_code   = get('password')();
	
	
	(function main(){
		
		submit.css('background-color',model.school().mainColor)
		ui.find('#password').remove();
		
		one_code.value('请输入5-20位密码')
		two_code.value('请再次输入密码')
		ui.prepend(two_code.ui)
		ui.prepend(one_code.ui);
		
		submit.bind('click',submit_event)
		
	}());
	
	
	/**
	 * 提交
	 */
	function submit_event(e)
	{
		if(one_code.value() !== two_code.value())
		{
			model.error_status('密码输入的不一致')
		}
		else
		{
			model.password(two_code.value());
			control.regAccount();
			disable(true)
		}
	}
	
	
	/**
	 * 是否禁用提交按钮
	 */
	function disable(b)
	{
		if(b)
		{
			submit.unbind('click',submit_event);
			submit.css('opacity',0.5)
		}
		else
		{
			submit.bind('click',submit_event);
			submit.css('opacity',1)
		}
	}
	
	return{
		
		disable:disable
	}
})
