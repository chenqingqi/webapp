/**
 * 加入授课班
 */
module('add_class',function()
{
	
	var model = reg('model');
	
	var ui = $('#add_class');
	
	var storage = reg('storage')
	
	var system = reg('system');
	
	var user = JSON.parse(storage.read('user'));
	
	listenEvent('COURSE_INFO_COMPLETE',init);
	
	function init()
	{
		if(model.course_info().isJoinStudy == 0)
		{
			ui.bind('touchend',on_click);
			$('#scroll').css('height',($(document.body).height()-80)+'px')
			ui.show();
		}
		else
		{
			$('#scroll').css('height',$(document.body).height()+'px')
		}
	}
	
	function on_click(e)
	{
		
		if(model.course_info().price==0)
		{
			model.add_class()
		}
		else
		{
			alert('网页端暂不支持购买收费课程')
		}
		
	}
})