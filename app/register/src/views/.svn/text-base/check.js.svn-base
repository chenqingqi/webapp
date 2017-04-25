/**
 * 验证码视图
 */
module('check',function()
{
	
	var model   	= reg('model');
	var control 	= reg('control');
	
	var input   	= $('#check input');
	var input_btn	= $('#btn');
	var sumbit 		= $('#submit');
	
	var count 		= 60;
	var timer;
	
	
	(function main(){
		
		input_btn.css('color',model.school().mainColor);
		input_btn.css('border','1px solid '+model.school().mainColor);
		sumbit.css('background-color',model.school().mainColor);
		
		input.bind('focus blur input propertychange',input_event);
		input_btn.bind('click',input_btn_event)
		sumbit.bind('click',sumbit_event);
		
	}());
	
	
	/**
	 * 输入框
	 */
	function input_event(e)
	{
		if(e.type =='focus')
		{
			if(input.val() == '请输入验证码') input.val('')
		}
		
		if(e.type =='blur')
		{
			if(input.val() == '') input.val('请输入验证码')
		}
		
		control.saveCode(input.val())
	}
	
	
	/**
	 * 验证码按钮
	 */
	function input_btn_event(e)
	{
		count-=1;
		input_btn.text('('+count+')重新获取验证码');
		input_btn.css('color','#999');
		input_btn.css('border','1px solid #fff');
				
		input_btn.unbind('click',input_btn_event);
		timer = window.setInterval(function(){
			
			if(count !== 0)
			{
				count-=1;
				input_btn.text('('+count+')重新获取验证码');
				input_btn.css('color','#999');
				input_btn.css('border','1px solid #fff');
			}
			else
			{
				input_btn.text('获取验证码');
				input_btn.bind('click',input_btn_event);
				input_btn.css('color',model.school().mainColor);
				input_btn.css('border','1px solid '+model.school().mainColor);
				count = 60;
				window.clearInterval(timer)
			}
			
		},1000);
		
		control.getCode();
	}
	
	
	/**
	 * 是否显示提示信息
	 */
	function showInfo(b)
	{
		if(b)
		{
			$('#info span').text(model.username());
			$('#info').show();
		}
		else
		{
			$('#info').hide();
		}
	}
	
	
	
	/**
	 * 提交
	 */
	function sumbit_event(e)
	{
		control.checkCode();
	}
	
	
	/**
	 * 是否禁用提交按钮
	 */
	function disable(b)
	{
		if(b)
		{
			sumbit.unbind('click',sumbit_event);
			sumbit.css('opacity',0.5);
		}
		else
		{
			sumbit.bind('click',sumbit_event);
			sumbit.css('opacity',1);
		}
	}
	
	return{
		
		disable:disable,
		showInfo:showInfo
	}
})