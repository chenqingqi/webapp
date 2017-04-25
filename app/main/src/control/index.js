/**
 * 首页控制器
 */
module('index',function()
{
	var ui = $('#home');
	
	var model = reg('model');
	
	var request = reg('request');
	
	var storage = reg('storage');
	
	var user_data = storage.read('user');
	
	var toner = reg('toner');
	
	var loading = get('loading')();
	
	function main()
	{
		getSlideData();
		getHomeData();
		
		listenEvent('SLIDE_COMPLETE',slide_complete);
		listenEvent('HOME_COMPLETE',home_complete);
		
		ui.append(loading.ui);
		loading.show((640-90)/2,($(window).height()-250)/2);
	}
	
	
	/**
	 * 请求幻灯数据
	 */
	function getSlideData()
	{
		request.connect({
		
			debug:1,
			deviceId:'h5',
			bannerImgWidth:'640'
		
		},config.api.slide,'get',config.service,function(e)
		{
			if(e.code == 1000)
			{
				model.slide(e.data.banner)
			}
		})
	}
	
	
	/**
	 * 请求首页数据
	 */
	function getHomeData()
	{
		user_data  = JSON.parse(user_data);
		
		request.connect({
		
			debug:1,
			deviceId:'h5',
			mid:user_data.uid,
			oauth_token:user_data.oauth_token,
			oauth_token_secret:user_data.oauth_token_secret
		
		},config.api.home,'get',config.service,function(e)
		{
			if(e.code == 1000)
			{
				model.home(e.data);
				
				console.log(e.data)
			}
		})
	}
	
	
	/**
	 * 首页初始化
	 */
	function home_complete(e)
	{
		loading.ui.remove();
		$('#slide').attr('hidden',false);
		
		//console.log(model.home())
		
		/**
		 * 老师/学生
		 */
		live_list();
		
		if(user_data.isTeacher == 1)
		{
			showTeaching()
		}
		else
		{
			offLineCourse();
			pay_course()
		}
		
		showQualityCourse();
		showPublicCourse();
	}
	
	
	/**
	 * 显示本校精品课程
	 */
	function showQualityCourse()
	{
		var item_html = $('#item_course')[0].outerHTML;
		
		var data = model.home().qualityCourse;
		
		toner.setBgImageColor(ui.find('#quality_course #title')[0],'#5BAEF5',model.school().mainColor);
		
		
		if(data.length==0)
		{
			return
		}
		
		ui.find('#quality_course').attr('hidden',false)
		
		for(var i=0;i<data.length;i++)
		{
			var item = $(item_html).attr('hidden',false);
			
			if(data[i].pic !== "")
			{
				item.find('img').attr('src',data[i].pic)
			}
			
			item.find('#item_title').text(data[i].title);
			item.find('#hour').text(data[i].lessonNum+'课时');
			item.find('#link').attr('href',config.route.course+'?treeid='+data[i].courseId+'&publicCourse='+data[i].publicCourse+'&type=0');
			
			if(data[i].price==0)
			{
				//item.find('#price').text('免费');
				item.find('#price').text('');
				item.find('#price').css('color','green');
			}
			else
			{
				//item.find('#price').text('￥'+data[i].price);
				item.find('#price').text('');
				item.find('#price').css('color','red');
			}
			
			ui.find('#quality_course').append(item);
			
			if(i == 5)
			{
				return
			}
		}
	}
	
	
	/**
	 * 显示资源库课程
	 */
	function showPublicCourse()
	{
		var item_html = $('#item_course_library')[0].outerHTML;
		
		var data = model.home().publicCourse;
		
		
		toner.setBgImageColor(ui.find('#public_course #title')[0],'#5BAEF5',model.school().mainColor);
		
		if(data.length==0)
		{
			return
		}
		
		ui.find('#public_course').attr('hidden',false);
		
		for(var i=0;i<data.length;i++)
		{
			var item = $(item_html).attr('hidden',false);
			
			if(data[i].pic !== "")
			{
				item.find('img').attr('src',data[i].pic)
			}
			
			item.find('#item_title').text(data[i].title);
			item.find('#item_school').text(data[i].schoolName);
			item.find('#link').attr('href',config.route.course+'?treeid='+data[i].courseId+'&publicCourse='+data[i].publicCourse+'&type=0');
			
			
			
			if(data[i].price==0)
			{
				//item.find('#item_price').text('免费');
				item.find('#item_price').text('');
				item.find('#item_price').css('color','green');
			}
			else
			{
				//item.find('#item_price').text('￥'+data[i].price);
				item.find('#item_price').text('');
				item.find('#item_price').css('color','red');
			}
			
			ui.find('#public_course').append(item);
			
			if(i == 5)
			{
				return
			}
		}
	}
	
	
	/**
	 * 显示我的授课
	 */
	function showTeaching()
	{
		var item_html = $('#item')[0].outerHTML;
		
		var data = model.home().myCourse;
		
		toner.setBgImageColor(ui.find('#teaching #title')[0],'#5BAEF5',model.school().mainColor);
		
		
		if(data.length==0)
		{
			return
		}
		
		ui.find('#teaching').attr('hidden',false);
		
		
		for(var i=0;i<data.length;i++)
		{
			var item = $(item_html).attr('hidden',false);
			
			if(data[i].pic !== "")
			{
				item.find('#photo').attr('src',data[i].pic);
			}
			
			item.find('#item_title').text(data[i].title);
			item.find('#sub_title').text('授课班数:'+data[i].classNum+'个');
			item.find('#hour').hide();
			
			var _title=encodeURI(data[i].title);
    		_title=encodeURI(_title);
    		
			item.find('#link').attr('href',config.route.coursedetails+'?title='+_title+'&pic='+data[i].pic+'&class='+data[i].classNum+'&courseId='+data[i].courseId)
			
			ui.find('#teaching').append(item);
			
			if(i==2)
			{
				return
			}
		}
	}
	
	
	/**
	 * 显示直播课
	 */
	function live_list()
	{
		var item_html = $('#live_item')[0].outerHTML;
		
		var data = model.home().courseLive;
		
		toner.setBgImageColor(ui.find('#live_list #title')[0],'#5BAEF5',model.school().mainColor);
		
		if(data.length==0)
		{
			return
		}
		
		ui.find('#live_list').attr('hidden',false);
		
		for(var i=0;i<data.length;i++)
		{
			var item = $(item_html).attr('hidden',false);
			
			if(data[i].pic !== "")
			{
				item.find('#live_photo').attr('src',data[i].coverImage);
			}
			
			if(data[i].aboutBegin == 0)
			{
				item.find('#live_sub_title').css('background-color','#00CC66');
				item.find('#live_sub_title').text('正在直播');
				item.find('#live_people').text(data[i].viewUserNum+'人');
			}
			else
			{
				if(data[i].aboutBegin == 1)
				{
					item.find('#live_sub_title').text('即将直播');
					item.find('#live_sub_title').css('background-color',model.school().mainColor)
				}
				else if(data[i].aboutBegin == -1)
				{
					item.find('#live_sub_title').text('未开始');
					item.find('#live_sub_title').css('background-color','#E0E0E0')
				}
				
				item.find('#live_people').text('讲师：'+data[i].teacher);
				item.find('#live_people').css('background-image','none');
				item.find('#live_people').css('padding-left','0px')
			}
			
			item.find('#live_item_title').text(data[i].liveTitle);
			
			item.find('#link').attr('href',config.route.course+'?treeid='+data[i].courseId+'&publicCourse='+data[i].publicCourse+'&classid='+data[i].courseClassId+'&type=1');
			
			ui.find('#live_list').append(item);
			
			if(i==2)
			{
				return
			}
		}
	}
	
	
	/**
	 * 显示我的必修课和选修课
	 */
	function offLineCourse()
	{
		var item_html = $('#item')[0].outerHTML;
		
		var data = model.home().offLineCourse;
		
		toner.setBgImageColor(ui.find('#off_line_course #title')[0],'#5BAEF5',model.school().mainColor);
		
		
		if(data.length==0)
		{
			return
		}
		
		ui.find('#off_line_course').attr('hidden',false);
		
		for(var i=0;i<data.length;i++)
		{
			var item = $(item_html).attr('hidden',false);
			
			if(data[i].pic !== "")
			{
				item.find('#photo').attr('src',data[i].pic);
			}
			
			item.find('#item_title').text(data[i].title);
			item.find('#sub_title').text('讲师:'+data[i].teacher);
			item.find('#hour').text(data[i].lessonNum+'课时');
			item.find('#link').attr('href',config.route.course+'?treeid='+data[i].courseId+'&publicCourse='+data[i].publicCourse);
			
			ui.find('#off_line_course').append(item);
			
			if(i==2)
			{
				return
			}
		}
	}
	
	
	/**
	 * 我的自修课
	 */
	function pay_course()
	{
		var item_html = $('#item')[0].outerHTML;
		
		var data = model.home().payCourse;
		
		toner.setBgImageColor(ui.find('#pay_course #title')[0],'#5BAEF5',model.school().mainColor);
		
		
		if(data.length==0)
		{
			return
		}
		
		ui.find('#pay_course').attr('hidden',false);
		
		for(var i=0;i<data.length;i++)
		{
			var item = $(item_html).attr('hidden',false);
			
			if(data[i].pic !== "")
			{
				item.find('#photo').attr('src',data[i].pic);
			}
			console.log(data);
			item.find('#item_title').text(data[i].title);
			item.find('#sub_title').text('讲师:'+data[i].teacher);
			item.find('#hour').text(data[i].lessonNum+'课时');
			item.find('#link').attr('href',config.route.course+'?treeid='+data[i].courseId+'&publicCourse='+data[i].publicCourse);
			
			ui.find('#pay_course').append(item);
			
			if(i==2)
			{
				return
			}
		}
	}
	
	
	/**
	 * 幻灯片
	 */
	function slide_complete(e)
	{
		
		var slide = ui.find('#slide');
		
		slide.bind('touchmove',function(e)
		{
			e.preventDefault()
		})
		
		var count = 0
		
		if(model.slide().length>0)
		{
			slide.find('#content').css('width',model.slide().length*640+'px');
			
		}
		
		var photo_html = $('#slide #content #photo')[0].outerHTML;
		$('#slide #content #photo').remove()
		
		for(var i=0;i<model.slide().length;i++)
		{
			var photo = $(photo_html).attr('hidden',false);
			photo.find('img').attr('src',model.slide()[i].img);
			
			if(model.slide()[i].url !== "")
			{
				photo.attr('href',model.slide()[i].url)
			}
			
			slide.find('#content').append(photo)
		}
		
		var variable = 1
		
		var timer = window.setInterval(function()
		{
			count +=variable;
			
			if(count == model.slide().length-1 || count == 0)
			{
				variable = -variable;
			}
			
			slide.find('#content').animate({'margin-left':-count*640+'px'});
			
			$('#slide #thumb #dot').css('opacity',0.5);
			$($('#slide #thumb').children()[model.slide().length-count-1]).css('opacity',1);
			
		},2000);
		
		
		var dot_html = $('#slide #thumb #dot')[0].outerHTML;
		$('#slide #thumb #dot').remove();
		
		for(var i=0;i<model.slide().length;i++)
		{
			var dot = $(dot_html).attr('hidden',false);
			$('#slide #thumb').append(dot);
		}
		
		$($('#slide #thumb').children()[model.slide().length-1]).css('opacity',1)
	}
	
	main();
})
