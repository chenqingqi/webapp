/**
 * 主数据
 */
module('model',function()
{
	
	var storage = reg('storage');
	
	
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
	 * 我的课程
	 */
	var _course;
	
	function course(value)
	{
		if(!value)
		{
			return _course;
		}
		
		_course = value;
		
		sendEvent('COURSE_COMPLETE');
	}
	
	
	/**
	 * 我的授课
	 */
	var _teaching;
	
	function teaching(value)
	{
		if(!value)
		{
			return _teaching;
		}
		
		_teaching = value;
		
		sendEvent('TEACHING_COMPLETE');
	}
	
	
	/**
	 * 院系数据
	 */
	var _school_tree;
	
	function school_tree(value)
	{
		if(!value)
		{
			return _school_tree;
		}
		
		_school_tree = value;
		
		sendEvent('SCHOOLTREE_COMPLETE');
		
		
		console.log(_school_tree)
	}
	
	
	/**
	 * 首页幻灯数据
	 */
	var _slide;
	
	function slide(value)
	{
		if(!value)
		{
			return _slide;
		}
		
		_slide = value;
		
		sendEvent('SLIDE_COMPLETE');
	}
	
	
	/**
	 * 首页数据
	 */
	var _home;
	
	function home(value)
	{
		if(!value)
		{
			return _home;
		}
		
		_home = value;
		
		sendEvent('HOME_COMPLETE');
	}
	
	
	/**
	 * 页面指针
	 */
	
	var _pointer
	
	if(reg('system').getValue('pointer') == null)
	{
		if(reg('storage').read('pointer') !==0)
		{
			_pointer = reg('storage').read('pointer');
		}
		else
		{
			_pointer = 0;
		}
	}
	else
	{
		_pointer = reg('system').getValue('pointer');
	}
	
	function pointer(value)
	{
		if(!value && value!==0)
		{
			return _pointer;
		}
		
		_pointer = value;
		sendEvent('POINTER_CHANGE');
	}
	
	
	
	return{
		school:school,
		pointer:pointer,
		course:course,
		teaching:teaching,
		school_tree:school_tree,
		slide:slide,
		home:home
	}
})
