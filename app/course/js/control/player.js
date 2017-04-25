/**
 * 播放器
 */
module('player',function()
{
	
	var model = reg('model');
	
	var ui = $('#player');
	
	listenEvent('COURSE_INFO_COMPLETE',initPlayer);
	
	
	function initPlayer()
	{
		ui.css('background-image','url('+model.course_info().pic+')')
	}
	
	
	/**
	 * 播放
	 */
	function play(url)
	{
		var video = ui.find('video')[0];
		
		video.src = url;
		video.load();
		video.play();
		
		$(video).bind('play timeupdate error',video_event);
		$(video).show();
		
		ui.css('background-image','none')
	}
	
	
	/**
	 * 播放事件
	 */
	function video_event(e)
	{
		switch(e.type)
		{
			case 'play':
				ui.find('#loading').show();
				break
			
			case 'timeupdate':
				ui.find('#loading').hide();
				break
			
			case 'error':
				alert('加载视频错误')
				break
		}
	}
	
	
	
	window.addEventListener('orientationchange',onOrientationchange);
	
	function onOrientationchange(e)
	{
		
		if(orientation == 90 || orientation == -90)
		{
			window.addEventListener('click',requestFullScreen)
		}
		else
		{
			window.removeEventListener('click',requestFullScreen)
			exitFullscreen()
		}
	}
	
	
	/**
     * 进入全屏
     */
    function requestFullScreen() 
    {
        var de = document.documentElement;
        if(de.requestFullscreen) 
        {
            de.requestFullscreen();
        } 
        else if(de.mozRequestFullScreen) 
        {
            de.mozRequestFullScreen();
        } 
        else if(de.webkitRequestFullScreen) 
        {
            de.webkitRequestFullScreen();
        }
    }

    /**
     * 退出全屏
     */
    function exitFullscreen()
    {
        var de = document;

        if (de.exitFullscreen) 
        {
            de.exitFullscreen();
        } 
        else if (de.mozCancelFullScreen) 
        {
            de.mozCancelFullScreen();
        } 
        else if (de.webkitCancelFullScreen) 
        {
            de.webkitCancelFullScreen();
        }
    }
	
	return{
		
		play:play
	}
})