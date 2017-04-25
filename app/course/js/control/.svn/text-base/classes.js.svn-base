/**
 * 授课班
 */
module('classes',function()
{
	
	var model = reg('model');
	
	var ui = $('#classes');
	
	var status = 'close';
	
	listenEvent('COURSE_INFO_COMPLETE',init);
	
	function init()
	{
		
		ui.find('#title span').text(model.course_info().className);
		
		if(model.course_info().price>0)
		{
			ui.find('#price').text('￥'+model.course_info().price);
			ui.find('#price').css('color',model.school().mainColor)
		}
		else
		{
			ui.find('#price').text('免费');
			ui.find('#price').css('color','green');
		}
		
		
		if(model.course_info().isJoinStudy == 0)
		{
			if(model.course_info().classList.length>1)
			{
				ui.find('#arrow').bind('touchend',on_arrow_click);
			}
			else
			{
				ui.find('#arrow').remove();
				ui.find('#price').css('padding-right','25px')
			}
		}
		else
		{
			ui.find('#arrow').remove();
			ui.find('#price').css('padding-right','25px')
		}
		
		
		
		for(var i=0;i<model.course_info().classList.length;i++)
		{
			if(model.course_info().classList[i].className !== model.course_info().className)
			{
				if(model.course_info().classList[i].price>0)
				{
					var node = $('<li>'+model.course_info().classList[i].className+'<span>￥'+model.course_info().classList[i].price+'</span></li>');
					node.find('span').css('color',model.school().mainColor);
				}
				else
				{
					var node = $('<li>'+model.course_info().classList[i].className+'<span>免费</span></li>');
					node.find('span').css('color','green');
				}
				
				node.bind('click',class_click)
				node.attr('classid',model.course_info().classList[i].classId);
				node.attr('isCurrent',model.course_info().classList[i].isCurrent)
				ui.find('#content').append(node);
			}
		}
	}
	
	function class_click(e)
	{
		location.href = model.href()+'&classid='+$(this).attr('classid');
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