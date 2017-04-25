/**
 * 主视图
 */
module('view',function()
{
	
	var model   = reg('model');
	var control = reg('control');
	var titlebar,tip,content,user,check,code;
	
	listenEvent('MODEL_READY',ready);
	listenEvent('REGISTER_TYPE_CHANGE',type_change);
	listenEvent('MODEL_ERROR_STATUS',error_status);
	listenEvent('MODEL_PAGE_CHANGE',page_change);
	listenEvent('TITLEBAR_BACK',titlebar_back);
	
	
	/**
	 * 配置数据完成
	 */
	function ready(e)
	{
		/*titlebar = reg('titlebar')
		titlebar.style(model.school().mainColor,'#FFFFFF');
		titlebar.value('手机号注册');*/
		reg('system').setTitle('手机号注册');
		
		
		tip     = reg('tip')
		user    = reg('user');
		check   = reg('check');
		code    = reg('code');
		content = $('#content');
		
		$('body').show();
	}
	
	
	/**
	 * 注册类型已变更
	 */
	function type_change(e)
	{
		if(model.type()== 1)
		{
			//titlebar.value('邮箱地址注册');
			reg('system').setTitle('邮箱地址注册');
		}
		else
		{
			//titlebar.value('手机号注册');
			reg('system').setTitle('手机号注册');
		}
	}
	
	
	/**
	 * 请求错误
	 */
	function error_status(e)
	{
		tip.show(model.error_status())
	}
	
	
	/**
	 * 页面指针已变更
	 */
	function page_change(e)
	{
		if(model.page()==2)
		{
			//titlebar.value('设置密码');
			reg('system').setTitle('设置密码');
		}
		else
		{
			type_change(null)
		}
		
		content.animate({'margin-left':-(model.page()*640)},{ duration:200,easing:'easeOutQuad',complete:null});
		
		if(model.page()==0)
		{
			$('#typebtn').show()
		}
		else
		{
			$('#typebtn').hide()
		}
	}
	
	
	/**
	 * 后退处理
	 */
	function titlebar_back(e)
	{
		history.back()
		
		/*if(model.page() == 0)
		{
			history.back()
		}
		else
		{
			model.page(model.page()-1)
		}*/
	}
})