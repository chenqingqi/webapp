/**
 * 我的
 */
module('my',function()
{
	
	var ui = $('#my');
	
	var storage = reg('storage');

	var user_data = storage.read('user');
	
	var model = reg('model');
	
	var request = reg('request');
	
	var toner = reg('toner');
	
	var loading = get('loading')();
	
	function main()
	{
		ui.append(loading.ui);
		loading.show((640-90)/2,($(window).height()-250)/2)
		
		if(user_data == 0)
		{
			ui.find('#head img').bind('click',head_click);
			show_no_data();
		}
		else
		{
			ui.find('#more_button').show();
			ui.find('#more_button').bind('touchend',function(e)
			{
				location.href = config.route.more;
			})
			
			user_data  = JSON.parse(user_data);
			
			show_user_info();
			
			if(model.course() == undefined)
			{
				request.connect({
		
					debug:1,
					deviceId:'h5',
					mid:user_data.uid,
					oauth_token:user_data.oauth_token,
					oauth_token_secret:user_data.oauth_token_secret
				
				},config.api.mycourse,'post',config.service,function(e)
				{
					if(e.code == 1000)
					{
						model.course(e.data.free);
						
						if(user_data.isTeacher == 1)
						{
							getTeaching()
						}
					}
					
					if(e.code == 2001)
					{
						location.href = config.route.login;
					}
					
					console.log(e.msg)
				})
			}
		}
		
		listenEvent('COURSE_COMPLETE',show_course);
		listenEvent('TEACHING_COMPLETE',show_teaching);
	}
	
	
	/**
	 * 请求我的授课数据
	 */
	function getTeaching()
	{
		
		request.connect({

			debug:1,
			deviceId:'h5',
			mid:user_data.uid,
			oauth_token:user_data.oauth_token,
			oauth_token_secret:user_data.oauth_token_secret,
			status:'published',
			page:'0',
			pageNum:'10'
		
		},config.api.teaching,'post',config.service,function(e)
		{
			if(e.code == 1000)
			{
				model.teaching(e.data);
			}
			
			if(e.code == 2001)
			{
				location.href = config.route.login;
			}
		})
	}
	
	
	/**
	 * 显示用户信息
	 */
	function show_user_info()
	{
		var user_info = $('#user_info');
		user_info.find('p').text(user_data.nickname);
		user_info.find('img').attr('src',user_data.userface)
	}
	
	
	/**
	 * 显示无数据列表
	 */
	function show_no_data()
	{
		loading.ui.remove();
		$('#user_info').attr('hidden',false);
		
		var no_data = ui.find('#no_data');
		no_data.css('height',($(window).height()-580)+'px');
		
		
		if(($(window).height()-580)<300)
		{
			no_data.css('background-image','none')
			no_data.css('line-height',$(window).height()-580+'px');
		}
		else
		{
			no_data.css('background-position-y',(no_data.height()-125)/2-50+'px')
			no_data.css('line-height',no_data.height()+100+'px');
		}
		
		no_data.show();
		
		listenEvent('DOWNLOAD_COLSE',function(){
			no_data.css('background-image','url(/resource/empty_class.png)');
			no_data.css('height',($(window).height()-570+80)+'px');
			no_data.css('background-position-y',(no_data.height()-125)/2-50+'px')
			no_data.css('line-height',no_data.height()+100+'px');
		})
	}
	
	
	/**
	 * 显示我的课程列表
	 */
	function show_course()
	{
		loading.ui.remove();
		$('#user_info').attr('hidden',false);
		
		if(model.course().length ==0)
		{
			show_no_data();
			return
		}
		
		var my_course = $('#my #course');
		my_course.show();
		
		toner.setBgImageColor(my_course.find('#title')[0],'#5BAEF5',model.school().mainColor);
		
		for(var i=0;i<model.course().length;i++)
		{
			var item = $($('#item')[0].outerHTML).attr('hidden',false);
			
			if(model.course()[i].pic !== "")
			{
				item.find('#photo').attr('src',model.course()[i].pic);
			}
			
			item.find('#item_title').text(model.course()[i].title);
			item.find('#link').attr('href',config.route.course+'?treeid='+model.course()[i].courseId+'&publicCourse='+model.course()[i].publicCourse);
			
			
			var teacherName = "";
			
			if(model.course()[i].teachers.length>0)
			{
				for(var t=0;t<model.course()[i].teachers.length;t++)
				{
					teacherName+=model.course()[i].teachers[t].nickname;
					
					if(t>0)
					{
						teacherName+=','+model.course()[i].teachers[t].nickname;
					}
				}
			}
			else
			{
				teacherName = '暂无'
			}
			
			
			item.find('#sub_title').text('讲师:'+teacherName);
			item.find('#hour').text(model.course()[i].lessonNum+'课时');
			//console.log(model.course())
			my_course.find('#content').append(item);
			
			if(i==2)
			{
				return
			}
		}
	}
	
	
	/**
	 * 显示我的授课列表
	 */
	function show_teaching()
	{
		loading.ui.remove();
		$('#user_info').attr('hidden',false);
		
		if(model.course().length ==0 && model.teaching().length==0)
		{
			show_no_data();
		}
		
		if(model.teaching().length ==0)
		{
			return
		}
		
		var teaching = $('#my #teaching');
		teaching.show()
		toner.setBgImageColor(teaching.find('#title')[0],'#5BAEF5',model.school().mainColor);
		
		for(var i=0;i<model.teaching().length;i++)
		{
			var item = $($('#item')[0].outerHTML).attr('hidden',false);
			item.find('#photo').attr('src',model.teaching()[i].pic);
			item.find('#item_title').text(model.teaching()[i].title);
			item.find('#sub_title').text('授课班:'+model.teaching()[i].classNum+'个');
			item.find('#hour').text(model.teaching()[i].subtitle+'课时');
			
			var _title=encodeURI(model.teaching()[i].title);
    		_title=encodeURI(_title);
    		
			item.find('#link').attr('href',config.route.coursedetails+'?title='+_title+'&pic='+model.teaching()[i].pic+'&class='+model.teaching()[i].classNum+'&courseId='+model.teaching()[i].courseId)
			
			teaching.find('#content').append(item);
			
			if(i==2)
			{
				return
			}
		}
	}
	
	
	/**
	 * 点击登录
	 */
	function head_click(e)
	{
		ui.find('#head img').unbind('click',head_click);
		location.href = config.route.login;
	}
	
	main();
})
