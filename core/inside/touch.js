/**
 * 触摸扩展类
 */
define(function()
{
	
	var Touch = new Object();
	
	/**
	 * 滑动的矩形(起始值)
	 */
	Touch.rect = {x:0,y:0,w:0,h:0};
	
	
	/**
	 * 滑动的方向:x:0左,1右, y:0上,1下,
	 */
	Touch.direction = {x:0,y:0};
	
	
	/**
	 * 滑动距离
	 */
	Touch.distance = {x:0,y:0};
	
	
	/**
	 * 滑动点击(按下和弹起在同一位置)
	 */
	Touch.click = false;
	
	
	
	/**
	 * 按下
	 */
	window.addEventListener('touchstart',function(e){
		
		Touch.rect.x = e.targetTouches[0].screenX;
		Touch.rect.y = e.targetTouches[0].screenY;
		
	},true);
	
	
	/**
	 * 移动
	 */
	window.addEventListener('touchmove',function(e){
		
		Touch.rect.w     = e.targetTouches[0].screenX;
		Touch.rect.h     = e.targetTouches[0].screenY;
		Touch.distance.x = e.targetTouches[0].screenX-Touch.rect.x;
		Touch.distance.y = e.targetTouches[0].screenY-Touch.rect.y;
		
	},true);
	
	
	/**
	 * 弹起
	 */
	window.addEventListener('touchend',function(e)
	{
		
		if(Touch.rect.w>Touch.rect.x)
		{
			Touch.direction.x = 1;
		}
		else
		{
			Touch.direction.x = 0;
		}
		
		if(Touch.rect.h>Touch.rect.y)
		{
			Touch.direction.y = 1;
		}
		else
		{
			Touch.direction.y = 0;
		}
		
		if(Touch.rect.w == Touch.rect.x && Touch.rect.h == Touch.rect.y)
		{
			Touch.click = true;
		}
		else
		{
			Touch.click = false;
		}
		
	},true);
	
	
	return Touch;
	
});
