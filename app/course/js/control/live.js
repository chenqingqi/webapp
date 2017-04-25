/**
 * 直播列表
 */
module('live',function()
{
	var model = reg('model');
	
	var ui = $('#live');
	
	var storage = reg('storage')
	
	var system = reg('system');
	
	var user = JSON.parse(storage.read('user'));
	
	listenEvent('LIVE_LIST_COMPLETE',init);
	
	function init()
	{
		if(model.live_list().length == 0)
		{
			ui.css('height',($(window).height()-616)+'px');
			ui.css('text-align','center');
			ui.css('line-height',($(window).height()-616)+'px');
			ui.text('没有直播');
			
			return;
		}
		else
		{
			var _item = $('#live_item')[0].outerHTML;
			$('#live_item').remove();
			
			for(var i=0;i<model.live_list().length;i++)
			{
				var start_time = new Date(model.live_list()[i].readyStartTime*1000).format();
				
				var end_time   = new Date(model.live_list()[i].readyEndTime*1000).format()
				
				var item = $(_item);
				item.attr('hidden',false);
				item.attr('talk',model.course_info().chatRoomStatus);
				item.attr('liveid',model.live_list()[i].id);
				item.attr('free',model.live_list()[i].isFree);
				item.bind('click',item_click);
				item.find('#day').text(start_time.slice(5,10));
				item.find('#year').text(start_time.slice(0,4));
				item.find('#title').text(model.live_list()[i].liveTitle);
				item.find('#time').text(start_time.slice(11,16)+'-'+end_time.slice(11,16))
				
				
				if(model.live_list()[i].aboutBegin == 0)
				{
					item.find('#statu').text('正在直播');
					item.find('#statu').css('color','#00CC66');
				}
				else if(model.live_list()[i].aboutBegin == 1)
				{
					item.find('#statu').text('即将直播');
					item.find('#statu').css('color',model.school().mainColor);
				}
				else if(model.live_list()[i].aboutBegin == -1)
				{
					item.find('#statu').text('未开始');
					item.find('#statu').css('color','#999');
				}
				
				if(model.live_list()[i].isFree == 1)
				{
					item.find('#price').text('免费');
				}
				
				$('#tab #live').append(item)
			}
		}
	}
	
	
	function item_click(e)
	{
		
		/**
		 * 第一步：判断用户是否登录
		 */
		if(user == 0)
		{
			//用户未登录(登录完成后，跳回此页面)
			location.href = config.route.login+'?form=course&treeid='+system.getValue('treeid')+'&publicCourse='+system.getValue('publicCourse');
		}
		else
		{
			/**
			 * 第二步：判断是否是自己创建的课程
			 */
			
			if(model.course_info().teacher.length == 0)
			{
				var teacherid = 0;
			}
			
			if(user.openId == teacherid || user.uid == teacherid)
			{
				//如果是资源库课程openId，本校课程uid
				location.href = config.route.live+'?id='+$(this).attr('liveid')+'&talk='+$(this).attr('talk');
			}
			else
			{
				
				/**
				 * 第三步：判断是否已加入授课班
				 */
				if(model.course_info().isJoinStudy == 1)
				{
					location.href = config.route.live+'?id='+$(this).attr('liveid')+'&talk='+$(this).attr('talk');
				}
				else
				{
					
					/**
					 * 第四步：判断课时是否免费
					 */
					if($(this).attr('free') == 1)
					{
						location.href = config.route.live+'?id='+$(this).attr('liveid')+'&talk='+$(this).attr('talk');
					}
					else
					{
						alert('仅限本授课班学员学习')
					}
				}
			}
		}
	}
})