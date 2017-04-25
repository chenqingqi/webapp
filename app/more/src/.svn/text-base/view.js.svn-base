/**
 * 主视图
 */
module('more_view',function()
{
	var model = reg('more_model');
	var control = reg('more_control');
	var storage = reg('storage');
	var ui = $('#titlebar');
	listenEvent('READY',onReady);
	
	function onReady(e)
	{   	  
	    $('#back').bind('click',onBack);
	    style(model.school().mainColor);
	    $('body').attr('hidden',false);
	    $('#logout').bind('click',logout);
	}	


	function logout(){
		control.getresourcelist();
		listenEvent('logout',outIndex);
	}
	
	function outIndex(){
		if(model.logout().code=='1000'){
			storage.remove('user');
			window.location.href='/app/main/main.html';
		}
	}
	
	
	function onBack(e)
	{
		history.back();
	}
	/*
	 * 修改导航条的背景颜色
	 */
	
	function style(bgcolor)
	{
			ui.css('background-color',bgcolor)	
	}

	return {
		style: style
	}


})