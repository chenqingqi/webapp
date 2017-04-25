require.config({baseUrl:'/'});
require(['modules/config',
		 'core/inside/request',
		 'modules/service',
		 'modules/tip/logout/logout',
	 	 'modules/title/white/title',
		 'app/bind_end/tip/unbind_tip',
		 'modules/tip/simple/tip',
		 'core/inside/string'],
		 
function(Config,Request,Service,Logout,WhiteTitle,UnbindTip,SimpleTip)
{
	
	Config.init(getSchoolInof);
	
	var logout,title,tip,button,content,simple_tip,data;
	
	
	function main(e)
	{
		content = $('#content');
		content.find('#button').bind('touchend',onEvent);
		simple_tip = new SimpleTip('simple_tip')
		title = new WhiteTitle('title');
		title.cross(true);
		tip    = new UnbindTip('unbind_tip');
		logout = new Logout('logout');
		
		
		
		data = JSON.parse(Service.get('data'));
		
		if(Service.get('type') == 'cloud')
		{
			content.find('#first_name').text('云联盟');
			content.find('#first_account').find('img').attr('src',data.cloud.userface);
			content.find('#first_account').find('p').text(data.cloud.user);
			
			content.find('#next_name').text(e.data.webSimpleName);
			content.find('#next_account').find('img').attr('src',data.local.userface);
			content.find('#next_account').find('p').text(data.local.user);
			content.find('#info').text('该 【云联盟】 账号，已与你的其他【'+e.data.webSimpleName+'】账号关联，你可解除关联再与此账号关联。');
			
			tip.first(e.data.webSimpleName,data.local.userface,data.local.user)
			tip.next('云联盟',data.cloud.userface,data.cloud.user)
		}
		else
		{
			content.find('#first_name').text('云联盟');
			content.find('#first_account').find('img').attr('src',data.cloud.userface);
			content.find('#first_account').find('p').text(data.cloud.user);
			
			content.find('#next_name').text(e.data.webSimpleName);
			content.find('#next_account').find('img').attr('src',data.local.userface);
			content.find('#next_account').find('p').text(data.local.user);
			content.find('#info').text('该 【云联盟】 账号，已与你的其他【'+e.data.webSimpleName+'】账号关联，你可解除关联再与此账号关联。');
			
			tip.first(e.data.webSimpleName,data.local.userface,data.local.user)
			tip.next('云联盟',data.cloud.userface,data.cloud.user)
		}
		
		$('body').show();
		
		listenEvent('close_click',onTitleEvent)
		listenEvent('code_btn_click',onCodeClickEvent);
		listenEvent('enter',onUnBind)
	}
	
	function onUnBind(e)
	{
		Request.connect({
			
			debug:1,
			deviceId:'h5',
			centerUid:data.cloud.uid,
			localUid:data.local.uid,
			code:e.data
			
		},app.api.unbind_user,'post',Service.host(),unbind_complete)
	}
	
	function unbind_complete(e)
	{
		simple_tip.show(e.msg)
	}
	
	function onCodeClickEvent(e)
	{
		if(data.cloud.user.isMobileNumber())
		{
			Request.connect({
				
			debug:1,
			deviceId:'h5',
			mobile:data.cloud.user,
			type:1
			
			},app.api.get_mobile_code,'post',Service.host(),code_complete)
		}
		else
		{
			Request.connect({
				
				debug:1,
				deviceId:'h5',
				email:data.cloud.user,
				type:0
				
			},app.api.get_mail_code,'post',Service.host(),code_complete)
		}
	}
	
	function code_complete(e)
	{
		if(data.cloud.user.isMobileNumber())
		{
			simple_tip.show('验证码已发送至你的手机')
		}
		else
		{
			simple_tip.show('验证码已发送至你的邮箱')
		}
	}
	
	function onEvent(e)
	{
		if(this.id == 'button')
		{
			tip.show()
		}
	}
	
	/**
	 * 获取学校信息
	 */
	function getSchoolInof()
	{
		Request.connect({
			debug:1,
			deviceId:'h5',
			webCode:Service.code()
		},app.api.school_info,'get',Service.host(),main)
	}
	
	function onTitleEvent(e)
	{
		logout.show()
	}
})
