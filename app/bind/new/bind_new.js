require.config({baseUrl:'/'});
require(['modules/config',
		 'core/inside/request',
		 'core/inside/toner',
		 'modules/service',
		 'modules/tip/logout/logout',
	 	 'modules/title/white/title',
		 'app/bind/new/tip/bind_tip',
		 'modules/tip/simple/tip'],
		 
		 
function(Config,Request,toner,Service,Logout,WhiteTitle,BindTip,SimpleTip)
{
	
	Config.init(getSchoolInof);
	
	var logout,title,tip,content,createType;
	
	function main(e)
	{
		console.log(e)
		content = $('#content');
		content.find('#button').bind('touchend',onEvent)
		
		logout = new Logout('logout');
		
		title  = new WhiteTitle('title');
		title.cross(true);
		
		tip = new BindTip('bind_tip');
		
		
		toner.setImageColor($('#icon').find('img')[0],'#5BAEF5',e.data.mainColor);
		toner.setBgImageColor($('#button')[0],'#5BAEF5',e.data.mainColor);
		$('#enter').css('color',e.data.mainColor);
		
		
		if(Service.get('type') == 'cloud')
		{
			createType = 2;
			
			content.find('#first_name').text('云联盟');
			content.find('#first_account').find('img').attr('src',Service.get('userface'));
			content.find('#first_account').find('p').text(Service.get('user'));
			content.find('#next_name').text(e.data.webName);
			content.find('#next_account').find('img').attr('src',Service.get('userface'));
			content.find('#next_account').find('p').text(Service.get('user'));
			content.find('#info').text('进入App之前，需新建一个'+e.data.webName+'账号。');
			
			tip.name(e.data.webSimpleName);
			tip.img(Service.get('userface'));
			tip.user(Service.get('user'))
			tip.info('你的【'+e.data.webSimpleName+'】"账号"、"密码"与【云联盟】一致。');
		}
		else
		{
			createType = 1;
			
			content.find('#first_name').text(e.data.webName);
			content.find('#first_account').find('img').attr('src',Service.get('userface'));
			content.find('#first_account').find('p').text(Service.get('user'));
			content.find('#next_name').text('云联盟');
			content.find('#next_account').find('img').attr('src',Service.get('userface'));
			content.find('#next_account').find('p').text(Service.get('user'));
			content.find('#info').text('进入App之前，需新建一个云联盟账号。');
			
			tip.name('云联盟');
			tip.img(Service.get('userface'));
			tip.user(Service.get('user'))
			tip.info('你的【云联盟】"账号"、"密码"与【'+e.data.webName+'】一致。');
		}
		
		simpletip = new SimpleTip('simple_tip');
		
		$('body').show();
		
		listenEvent('close_click',showLogout);
		listenEvent('iknow_click',createUser);
		listenEvent('enter_click',onLogout);
	}
	
	
	
	/**
	 * 弹出创建确认面板
	 */
	function onEvent(e)
	{
		tip.show()
	}
	
	
	/**
	 * 弹出登出面板
	 */
	function showLogout(e)
	{
		logout.show()
	}
	
	
	/**
	 * 创建本地或云账户
	 */
	function createUser(e)
	{
		Request.connect({
			debug:1,
			deviceId:'h5',
			uid:Service.get('uid'),
			type:createType,
			account:Service.get('user')
		},'addBindUserAction','post',Service.host(),create_complete)
	}
	
	function create_complete(e)
	{
		if(e.code == 1000)
		{
			location.href = app.route.login
		}
		
		simpletip.show(e.msg);
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
	
	
	/**
	 * 退出登录
	 */
	function onLogout(e)
	{
		Request.connect({
			debug:1,
			deviceId:'h5'
		},app.api.logout,'get',Service.host(),onLogOut)
	}
	
	function onLogOut(e)
	{
		location.href = app.route.login
	}
})
