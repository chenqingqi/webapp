require.config({baseUrl:'/'});
require(['modules/config',
		 'core/inside/toner',
		 'core/inside/request',
		 'modules/service',
		 'modules/tip/logout/logout',
	 	 'modules/title/white/title',
	 	 'modules/tip/simple/tip'],
		 
function(Config,toner,Request,Service,Logout,WhiteTitle,Tip)
{
	
	Config.init(getSchoolInof);
	
	var logout,title,tip,bindTip,button,content;
	
	var local_uid;
	
	var data;
	
	function main(e)
	{
		content = $('#content');
		content.find('#button').bind('touchend',onEvent);
		logout = new Logout('logout');
		title  = new WhiteTitle('title');
		title.cross(true);
		tip = new Tip('tip');
		
		
		toner.setImageColor($('#icon').find('img')[0],'#5BAEF5',e.data.mainColor);
		toner.setBgImageColor($('#button')[0],'#5BAEF5',e.data.mainColor);
		
		data = JSON.parse(Service.get('data'));
		
		if(Service.get('type') == 'cloud')
		{
			content.find('#first_name').text('云联盟');
			content.find('#first_account').find('img').attr('src',data.colud.userface);
			content.find('#first_account').find('p').text(data.colud.user);
			
			content.find('#next_name').text(e.data.webSimpleName);
			content.find('#next_account').find('img').attr('src',data.local_user_0.userface);
			content.find('#next_account').find('p').text(data.local_user_0.user);
			content.find('#next_account').bind('touchstart',onGetUid)
			
			
			if(data.local_user_1.user !=="")
			{
				content.find('#end_name').bind('touchstart',onGetUid)
				content.find('#end_name').show();
				content.find('#end_account').show();
				content.find('#end_account').find('img').attr('src',data.local_user_1.userface);
				content.find('#end_account').find('p').text(data.local_user_1.user);
			}
			
			content.find('#info').text('请选择你的【'+e.data.webSimpleName+'】账号进行关联，方可完成登录。');
		}
		else
		{
			content.find('#first_name').text(e.data.webSimpleName);
			content.find('#first_account').find('img').attr('src',data.local.userface);
			content.find('#first_account').find('p').text(data.local.user);
			
			content.find('#next_name').text('云联盟');
			content.find('#next_account').find('img').attr('src',data.local.userface);
			content.find('#next_account').find('p').text(data.local.user);
			content.find('#next_account').bind('touchstart',onGetUid)
			
			content.find('#info').text('请选择你的【云联盟】账号进行关联，方可完成登录。');
		}
		
		$('body').show();
		
		listenEvent('close_click',onButtonEvent)
	}
	
	function onGetUid(e)
	{
		if(Service.get('type') == 'cloud')
		{
			if(this.id == 'next_account')
			{
				local_uid = data.local_user_0.uid
			}
			
			if(this.id == 'end_account')
			{
				local_uid = data.local_user_1.uid
			}
		}
		else
		{
			local_uid = data.local.uid
		}
		
	}
	
	function onEvent(e)
	{
		if(Service.get('type') == 'cloud')
		{
			
			Request.connect({
				debug:1,
				deviceId:'h5',
				centerUid:data.cloud.uid,
				localUid:data.local.uid,
				account:data.cloud.user
			},'bindUserAction','post',Service.host(),onbind)
		}
		else
		{
			console.log(data)
			Request.connect({
				debug:1,
				deviceId:'h5',
				centerUid:data.cloud.uid,
				localUid:data.local.uid,
				account:data.local.user
			},'bindUserAction','post',Service.host(),onbind)
		}
		
		
	}
	
	function onButtonEvent(e)
	{
		logout.show()
	}
	
	function onbind(e)
	{
		if(e.code == 1000)
		{
			location.href = "/app/main/main.html";
		}
		else
		{
			tip.show(e.msg)
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
		},'getWebConfigInfoAction','get',Service.host(),main)
	}
})
