/**
 * 课程简介
 */
module('intro',function()
{
	
	var model = reg('model');
	
	var ui = $('#intro');
	
	var status = 'close';
	
	listenEvent('COURSE_INFO_COMPLETE',init);
	
	function init()
	{
		ui.find('#content').text(model.course_info().info)
		ui.find('#arrow').bind('touchend',on_arrow_click);
	}
	
	function on_arrow_click(e)
	{	
		if(status == 'close')
		{
			status = 'open';
			ui.css('height','auto');
			ui.find('#arrow').css('background-image','url(/resource/arrow_rotate.png)');
		}
		else
		{
			status = 'close'
			ui.css('height','80px');
			ui.find('#arrow').css('background-image','url(/resource/arrow_right.png)');
		}
	}
})