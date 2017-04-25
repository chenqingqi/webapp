/**
 * 主数据
 */
module('model',function()
{
	
	var storage = reg('storage');
	
	var system = reg('system');
	
	/**
	 * 初始化配置数据
	 */
	reg('configure').start(complete)
	
	function complete()
	{
		school(JSON.parse(storage.read(config.code)));
	}
	
	
	/**
	 * 学校数据
	 */
	var _school;
	
	function school(data)
	{
		if(!data)
		{
			return _school;
		}
		
		_school = data;
		
		sendEvent('READY');
	}
	
	
	
	/**
	 * 处理心跳数据
	 */
	var _report_data;
	
	function report_data(data)
	{
		console.log(data);
		
		video_url(data.liveUrlM3u8);
		
		room_status(data.liveStatus);
		
		countdown(data.remainingTime);
		
		server_event(data.liveVideoStatus);
	}
	
	
	/**
	 * 心跳的间隔
	 */
	var report_time;
	
	
	/**
	 * 播放地址
	 */
	var _video_url;
	
	function video_url(data)
	{
		if(!data)
		{
			return _video_url;
		}
		
		_video_url = data;
	}
	
	
	/**
	 * 倒计时的值已变更
	 */
	var _countdown;
	
	function countdown(data)
	{
		if(_countdown !== data && data>=0)
		{
			_countdown = data;
			sendEvent('COUNTDOWN_CHANGE',data);
		}
	}
	
	
	/**
	 * 房间状态已更改(data = 0未开播,1直播中,2已结束)
	 */
	var _room_status;
	
	function room_status(data)
	{
		if(_room_status !== data)
		{
			_room_status = data;
			sendEvent('ROOM_STATUS_CHANGE',data);
		}
	}
	
	function get_room_status()
	{
		return _room_status;
	}
	
	
	/**
	 * 视频服务器事件(data = ready准备就绪/playing播放中/switch视频源已切换/stop停止播放 )
	 */
	var _server_event = '';
	
	function server_event(data)
	{
		if(_server_event !== data)
		{
			video_url(data.liveUrlM3u8);
			_server_event = data;
			sendEvent('SERVER_EVENT',data);
		}
	}
	
	
	/**
	 * 聊天是否开启
	 */
	var talk_status = system.getValue('talk');
	
	
	/**
	 * 获取聊天室信息
	 */
	var _talk_data;
	
	function talk_data(data)
	{
		if(!data)
		{
			return _talk_data;
		}
		
		_talk_data = data;
		
		sendEvent('TALK_DATA_COMPLETE',data);
	}
	
	
	return{
		
		school      	:school,
		report_data 	:report_data,
		report_time 	:report_time,
		video_url		:video_url,
		get_room_status :get_room_status,
		talk_status	    :talk_status,
		talk_data       :talk_data
		
	}
})
