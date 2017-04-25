/**
 * 主控制器
 */
module('control',function()
{
	var model   = reg('model');
	var toner   = reg('toner');
	var request = reg('request');
	var loading = reg('loading')
	
	listenEvent('READY',ready);
	
	function ready(e)
	{
		toner.setBgImageColor($('#live_list_start #title')[0],'#5BAEF5',model.school().mainColor);
		toner.setBgImageColor($('#live_list_ready #title')[0],'#5BAEF5',model.school().mainColor);
		getLiveData();
	}
	
	
	/**
	 * 请求列表数据
	 */
	function getLiveData()
	{
		$('body').append(loading.ui);
		loading.show(($('body').width()-90)/2,($('body').height()-70)/2);
		
		request.connect({
		
			debug:1,
			deviceId:'h5'
		
		},config.api.all_live,'get',config.service,function(e)
		{
			if(e.code == 1000)
			{
				loading.hide();
				
				for(var i=0;i<e.data.length;i++)
				{
					if(e.data[i].aboutBegin == 0)
					{
						live_start(e.data[i]);
					}
					else if(e.data[i].aboutBegin == 1)
					{
						live_ready(e.data[i]);
					}
				}
			}
			
			if(e.data.length ==0)
			{
				loading.hide();
				$('#nolive').css('height',document.documentElement.clientHeight+'px');
				$('#nolive').css('line-height',document.documentElement.clientHeight+'px')
				$('#nolive').show();
			}
			
			console.log(e.data)
		})
	}
	
	
	
	/**
	 * 正在直播列表
	 */
	function live_start(data)
	{
		var ui = $('#live_list_start');
		
		var item_html = $('#live_item')[0].outerHTML;
				
		ui.attr('hidden',false);
		
		var item = $(item_html).attr('hidden',false);
		
		if(data.coverImage !== "")
		{
			item.find('#live_item_photo').attr('src',data.coverImage);
		}
		
		item.find('#live_status').css('background-color','#00CC66');
		item.find('#live_status').text('正在直播')
			
		item.find('#live_item_title').text(data.liveTitle);
		item.find('#live_people').text(data.viewUserNum+'人');
		item.find('#link').attr('href',config.route.course+'?treeid='+data.courseId+'&publicCourse='+data.publicCourse+'&classid='+data.courseClassId+'&type=1');
		ui.find('#content').append(item);
	}
	
	
	/**
	 * 即将直播列表
	 */
	function live_ready(data)
	{
		var ui = $('#live_list_ready');
		
		var item_html = $('#live_item')[0].outerHTML;
				
		ui.attr('hidden',false);
		
		var item = $(item_html).attr('hidden',false);
		
		if(data.coverImage !== "")
		{
			item.find('#live_item_photo').attr('src',data.coverImage);
		}
		
		
		item.find('#live_status').css('background-color',model.school().mainColor)
		item.find('#live_status').text('即将直播');
		
		item.find('#live_item_title').text(data.liveTitle);
		item.find('#live_people').text('讲师：'+data.teacher);
		item.find('#live_item_content').css('background-image','none');
		item.find('#live_item_content').css('text-indent','5px');
		
		item.find('#link').attr('href',config.route.course+'?treeid='+data.courseId+'&publicCourse='+data.publicCourse+'&classid='+data.courseClassId+'&type=1');
		ui.find('#content').append(item);
	}
})
