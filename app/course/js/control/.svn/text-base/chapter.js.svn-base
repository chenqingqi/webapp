/**
 * 章节
 */
module('chapter',function()
{
	
	var model = reg('model');
	
	var ui = $('#chapter');
	
	var system = reg('system');
	
	var player = reg('player');
	
	var storage = reg('storage')
	
	var user = JSON.parse(storage.read('user'));
	
	listenEvent('COURSE_INFO_COMPLETE',init);
	
	function init()
	{
		var _course = $('#course')[0].outerHTML;
		$('#course').remove();
		
		var _item   = $('#item')[0].outerHTML;
		$('#item').remove();
		
		
		if(model.course_info().data.length == 0)
		{
			ui.css('height',($(window).height()-616)+'px');
			ui.css('text-align','center');
			ui.css('line-height',($(window).height()-616)+'px');
			ui.text('没有内容');
			
			return;
		}
		
		
		for(var i=0;i<model.course_info().data.length;i++)
		{
			var data   = model.course_info().data[i].video;
			var course = $(_course).attr('hidden',false);
			course.find('#txt').text(model.course_info().data[i].title);
			course.find('#button').bind('click',course_click);
			
			for(var k=0;k<data.length;k++)
			{
				var item = $(_item).attr('hidden',false);
				
				item.find('#txt').text(data[k].title);
				item.attr('type',data[k].type);
				
				item.attr('title',data[k].title);
				item.attr('url',data[k].mediaUri);
				item.attr('free',data[k].free);
				item.attr('needGoldNum',data[k].needGoldNum);
				item.attr('supportGoldBuy',data[k].supportGoldBuy);
				item.attr('buy',data[k].isGoldBuy);
				
				item.bind('click',item_click);
				
				if(data[k].type == 'video')
				{
					if(data[k].friendTm !== "00:00")
					{
						item.find('#time').text(data[k].friendTm);
					}
				}
				else
				{
					if(data[k].type == 'text')
					{
						item.css('background-image','url(/resource/picture.png)');
					}
					
					if(data[k].type == 'document')
					{
						item.css('background-image','url(/resource/document.png)');
					}
					
					if(data[k].type == 'url')
					{
						item.css('background-image','url(/resource/url.png)');
					}
				}
				
				if(data[k].free == 1)
				{
					item.find('#free').attr('hidden',false);
				}
				
				if(data[k].needGoldNum>0)
				{
					item.find('#gold').attr('hidden',false);
					item.find('#gold').text(data[k].needGoldNum)
				}
				
				course.find('#content').append(item)
			}
			
			$('#chapter').append(course)
		}
		
		
		/**
		 * 列表项点击
		 */
		function item_click(e)
		{
			
			if($(this).attr('type') == 'video')
			{
				reg('system').setTitle($(this).attr('title'));
				
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
						player.play($(this).attr('url'));
					}
					else
					{
						
						/**
						 * 第三步：判断是否已加入课程
						 */
						if(model.course_info().isJoinStudy == 1)
						{
							player.play($(this).attr('url'));
						}
						else
						{
							
							/**
							 * 第四步：判断课时是否免费
							 */
							if($(this).attr('free') == 1)
							{
								player.play($(this).attr('url'));
							}
							else
							{
								
								/**
								 * 第五步：是否支持金币兑换
								 */
								if($(this).attr('supportGoldBuy') == 0)
								{
									alert('仅限本课程学员学习')
								}
								else
								{
									
									
									/**
									 * 第六步：判断课时金币是否在其他客户端兑换过
									 */
									if($(this).attr('buy')==1)
									{
										player.play($(this).attr('url'));
									}
									else
									{
										alert('网页端暂不支持金币兑换')
									}
								}
							}
						}
					}
				}
			}
			else
			{
				alert('网页端暂不支持,请在app查看')
			}
		}
		
		/**
		 * 课程折叠
		 */
		function course_click(e)
		{
			if($(this).attr('status') == 'show')
			{
				$(this).attr('status','hide');
				$(this).css('background-image','url(/resource/arrow_right.png)');
				$(this).parent().parent().find('#content').hide();
			}
			else
			{
				$(this).attr('status','show');
				$(this).css('background-image','url(/resource/arrow_rotate.png)');
				$(this).parent().parent().find('#content').show();
			}
		}
	}
})