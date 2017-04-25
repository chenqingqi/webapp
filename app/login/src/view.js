/**
 * 主视图
 */
module('view',function()
{
	var model = reg('model');
	
	var control = reg('control');
	
	var titlebar,password,username,forget,loginbtn,reg_btn,typebtn,tip;
	
	listenEvent('READY',onReady);
	listenEvent('TYPEBTN_CHANGE',typebtnEvent);
	listenEvent('LOGINBTN_CLICK',loginbtnEvent);
	listenEvent('ERROR_STATUS_CHANGE',error_status);
	
	function onReady(e)
	{
		titlebar = reg('titlebar');
		titlebar.style(model.school().mainColor,'#FFFFFF');
		titlebar.value('登录');
		
		username = reg('username');
		username.value('请输入手机号/邮箱');
		username.icon(true);
		
		password = reg('password');
		password.value('请输入密码');
		
		forget   = $('#forget');
		forget.css('color',model.school().mainColor);
		
		loginbtn = reg('loginbtn');
		loginbtn.color(model.school().mainColor);
		
		reg_btn  = $('#reg');
		reg_btn.css('color',model.school().mainColor);
		
		typebtn  = reg('typebtn');
		typebtn.color(model.school().mainColor);
		
		tip  = reg('tip');
		
		$('body').show();
	}
	
	function typebtnEvent(e)
	{
		control.setType(e.data)
		
		
		if(e.data==0)
		{
			loginbtn.ui.text('登录')
			//reg('system').setTitle('登录');
			$('#forget').text("忘记密码");
            $('#forget').parent().attr('href','/app/reset/reset.html')
            $('#reg').text("注册")
            $('#reg').parent().attr('href','/app/register/register.html')
		}
		else
		{
			
			loginbtn.ui.text('云联盟账号登录')
			//reg('system').setTitle('云联盟账号登录');
            $('#forget').text("");
            $('#forget').parent().attr('href','')
            $('#reg').text("")
            $('#reg').parent().attr('href','')
		}
		
		username.value('请输入手机号/邮箱');
		password.value('请输入密码');
		loginbtn.disable(false)
	}
	
	function loginbtnEvent(e)
	{
		control.login(username.value(),password.value())
	}
	
	function error_status(e)
	{
		tip.show(model.error_status());
		loginbtn.disable(false)
	}
})