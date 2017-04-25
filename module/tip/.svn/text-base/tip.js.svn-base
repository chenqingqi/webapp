/**
 * 简单提示
 */
module('tip',function()
{
	var timer;
	
	var ui = $('#tip');
	
	var status = true;
	
	function show(txt)
	{
		if(status)
		{
			status = false;
			
			ui.find('p').text(txt);
		
			timer = window.setInterval(function()
			{
				if(ui.width()>30)
				{
					var x = ($(window).width() -ui.width())/2;
					var y =  $(window).height()-200;
					ui.css({left:x+'px',top:y+'px'});
					ui.show();
					
					window.setTimeout(function()
					{
						ui.hide();
						status = true;
						
					},1500)
					
					window.clearInterval(timer);
					timer = null;
				}
				
			},500)
		}
	}
	
	return{
		
		show:show
	}
})
