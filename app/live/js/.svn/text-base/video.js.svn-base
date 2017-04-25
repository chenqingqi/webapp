/**
 * 直播控制器
 */
module('video',function()
{
	
	/**
	 * 初始化模块
	 */
	var model    	= reg('model');
	var request  	= reg('request');
	var system   	= reg('system');
	var simpletip   = reg('simpletip')
	var user     	= JSON.parse(reg('storage').read('user'));
	var video    	= $('video');
	var play_btn 	= $('#player #play_btn');
	var loading  	= $('#player #video_loading');
	var tip      	= $('#player #tip');
	var pic         = $('#pic');
	var isplaying   = false;
	var timeupdate_count = 0;
	
	
	/**
	 * 事件
	 */
	listenEvent('READY',intolive);
	listenEvent('COUNTDOWN_CHANGE',countdown_change);
	listenEvent('ROOM_STATUS_CHANGE',room_status_change);
	listenEvent('SERVER_EVENT',server_event);
	
	video.bind('timeupdate',play_event);
	video.bind('ended',stop_event);
	
	play_btn.bind('touchend',play)
	
	
	
	/**
	 * 进入直播
	 */
	function intolive()
	{
		request.connect({
	
			debug:1,
			deviceId:'h5',
			publicCourse:0,
			liveId:system.getValue('id'),
			mid:user.uid,
			oauth_token:user.oauth_token,
			oauth_token_secret:user.oauth_token_secret
	
		},config.api.into_live,'post',config.service,function(e)
		{
			if(e.code == 1000)
			{
				model.report_time = e.data.reportTime;
				heart_start();
			}
			else
			{
				if(e.code == 2001)
				{
					//用户未登录(登录完成后，跳回此页面)
					//location.href = config.route.login+'?form=live_list';
				}
				else
				{
					alert(e.msg)
				}
			}
		})
	}
	
	
	
	/**
	 * 启动心跳
	 */
	function heart_start()
	{
		
		var heart = window.setTimeout(function(){
			
			request.connect({
	
				debug:1,
				deviceId:'h5',
				publicCourse:0,
				liveId:system.getValue('id'),
				mid:user.uid,
				oauth_token:user.oauth_token,
				oauth_token_secret:user.oauth_token_secret
		
			},config.api.live_report,'post',config.service,function(e)
			{
				if(e.code == 1000)
				{
					model.report_data(e.data);
					window.clearTimeout(heart);
					heart_start();
				}
				else
				{
					/**
					 * 心跳返回1004错误,当老师下课了
					 */
					if(e.code == 1004)
					{
						pic.css('background-image','url("/resource/live_over.jpg")');
					}
					else
					{
						alert(e.msg)
					}
				}
			})
		
		},model.report_time);
	}
	
	
	
	/**
	 * 上课倒计时
	 */
	function countdown_change(e)
	{
		console.log('距离开播剩余:'+e.data+'秒')
		
		if(model.get_room_status() == 0)
		{
			if(Number(e.data) > 0)
			{
				var minute = parseInt(Number(e.data)/60);
				var second = Number(e.data)%60;
			
				tip.text('距离开播剩余'+minute+'分'+second+'秒').attr('hidden',false);
			}
			else
			{
				tip.text('请耐心等待').attr('hidden',false);
			}
		}
	}
	
	
	
	/**
	 * 房间状态(0上课之前,1上课时间,2下课时间)
	 */
	function room_status_change(e)
	{
		switch(Number(e.data))
		{
			case 0:
				console.log('房间状态：上课之前')
				break;
			
			case 1:
				console.log('房间状态：上课时间')
				break;
				
			case 2:
				console.log('房间状态：下课时间')
				break;
		}
	}
	
	
	
	/**
	 * 老师端事件
	 */
	function server_event(e)
	{
		loading.hide();
		
		tip.hide();
		
		switch(e.data)
		{
			
			/**
			 * 老师通过客户端,进入了直播间
			 */
			case "ready":
				pic.css('background-image','url("/resource/live_ready.jpg")');
				play_btn.attr('hidden',true);
				break;
			
			
			/**
			 * 老师开始推流讲课
			 */
			case "playing":
				pic.css('background-image','none');
				pic.css('background-color','#000000');
				play_btn.attr('hidden',false);
				break;
				
			
			/**
			 * 老师正在某种方式讲课(摄像头或分享屏幕或点播视频)
			 */
			case "switch":
				video[0].load()
			    pic.css('background-image','url("/resource/live_switch.jpg")');
				play_btn.attr('hidden',true);
				break;
			
			
			/**
			 * 老师已关闭推流客户端或已退出直播间
			 */
			case "stop":
				pic.css('background-image','url("/resource/live_ready.jpg")');
				play_btn.attr('hidden',true);
				break;
		}
	}
	
	
	/**
	 * 播放开始事件
	 */
	function play_event(e)
	{
		
		timeupdate_count +=1;
		
		if(timeupdate_count>3)
		{
			loading.hide();
			
			isplaying = true;
			
			pic.css('background-color','transparent');
		}
	}
	
	
	/**
	 * 播放结束事件
	 */
	function stop_event(e)
	{
		video.unbind('error',error_event);
		
		timeupdate_count = 0;
		
		isplaying = false;
	}
	
	
	/**
	 * 播放错误事件
	 */
	function error_event(e)
	{
		timeupdate_count = 0;
		
		isplaying = false;
		
		reload();
	}
	
	
	/**
	 * 播放按钮被点击
	 */
	function play()
	{
		video.bind('error',error_event);
		
		play_btn.attr('hidden',true);
		
		video[0].src = model.video_url();
		video[0].load();
		video[0].play();
		
		loading.show();
	}
	
	
	/**
	 * 重连视频
	 */
	function reload()
	{
		loading.show();
		
		video.unbind('error',error_event);
		
		simpletip.show('重新获取数据')
		
		var timer = window.setInterval(function(){
			
			if(isplaying == false)
			{
				video[0].load();
				video[0].play();
			}
			else
			{
				window.clearInterval(timer);
				video.bind('error',error_event);
				loading.hide();
			}
			
		},2000)
	}
})
