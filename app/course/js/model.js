/**
 * 主数据
 */
module('model',function()
{
	
	var storage = reg('storage');
	
	var request = reg('request');
	
	var system = reg('system');
	
	var user = JSON.parse(storage.read('user'));
	
	reg('configure').start(complete)
	
	function complete()
	{
		school(JSON.parse(storage.read(config.code)))
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
		
		init_course_info();
	}
	
	
	/**
	 * 章节列表(包含课程信息)
	 */
	var _course_info;
	
	function course_info()
	{
		return _course_info;
	}
	
	function init_course_info()
	{
		var _classid = '';
		
		if(system.getValue('classid') !== null)
		{
			_classid = system.getValue('classid');
		}
		
		request.connect({
			
			debug:1,
			deviceId:'h5',
			mid:user.uid,
			oauth_token:user.oauth_token,
			oauth_token_secret:user.oauth_token_secret,
			type:'video_text_document_practice_url_vr',
			treeid:system.getValue('treeid'),
			classid:_classid,
			publicCourse:system.getValue('publicCourse')
			
		},
		config.api.get_courser_video,'get',config.service,function(e)
		{
			if(e.code == 1000)
			{
				_course_info = e.data;
				sendEvent('COURSE_INFO_COMPLETE');
				console.log(e.data);
				
				init_live_list();
			}
			else
			{
				alert(e.msg)
			}
		})
	}
	
	
	/**
	 * 直播列表
	 */
	var _live_list;
	
	function live_list()
	{
		return _live_list;
	}
	
	function init_live_list()
	{
		var classid = system.getValue('classid');
		
		if(classid == null)
		{
			classid = course_info().classInfo.classId;
		}
		
		request.connect({
			debug:1,
			deviceId:'h5',
			courseId:system.getValue('treeid'),
			classId:classid
		},
		config.api.live_list,'get',config.service,function(e)
		{
			if(e.code == 1000)
			{
				_live_list = e.data;
				sendEvent('LIVE_LIST_COMPLETE');
				console.log(e.data)
			}
		})
	}
	
	
	/**
	 * 加入授课班
	 */
	function add_class()
	{
		request.connect({
			debug:1,
			deviceId:'h5',
			mid:user.uid,
			oauth_token:user.oauth_token,
			oauth_token_secret:user.oauth_token_secret,
			courseId:system.getValue('treeid'),
			publicCourse:system.getValue('publicCourse')
		},
		config.api.join_study,'post',config.service,function(e)
		{
			if(e.code == 1000)
			{
				location.reload();
			}
			else if(e.code == 2001)
			{
				location.href = config.route.login;
			}
			else if(e.code == 500)
			{
				alert(e.msg)
			}
		})
	}
	
	
	/**
	 * 获取本页链接
	 */
	function href()
	{
		return config.route.course+'?treeid='+system.getValue('treeid')+'&publicCourse='+system.getValue('publicCourse');
	}
	
	return{
		
		school:school,
		course_info:course_info,
		live_list:live_list,
		add_class:add_class,
		href:href
	}
	
})
