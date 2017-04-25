/**
 * 框架扩展：触摸
 */
define(function()
{
	
	/**
	 * 滑动的矩形(起始值)
	 */
	var rect = {x:0,y:0,w:0,h:0};
	
	
	/**
	 * 滑动的方向:x:0左,1右, y:0上,1下,
	 */
	var direction = {x:0,y:0};
	
	
	/**
	 * 滑动距离
	 */
	var distance = {x:0,y:0};
	
	
	/**
	 * 滑动点击(按下和弹起在同一位置)
	 */
	var click = false;
	
	
	
	/**
	 * 按下
	 */
	window.addEventListener('touchstart',function(e){
		
		rect.x = e.targetTouches[0].screenX;
		rect.y = e.targetTouches[0].screenY;
		
	},true);
	
	
	/**
	 * 移动
	 */
	window.addEventListener('touchmove',function(e){
		
		rect.w     = e.targetTouches[0].screenX;
		rect.h     = e.targetTouches[0].screenY;
		distance.x = e.targetTouches[0].screenX-rect.x;
		distance.y = e.targetTouches[0].screenY-rect.y;
		
	},true);
	
	
	/**
	 * 弹起
	 */
	window.addEventListener('touchend',function(e)
	{
		
		if(rect.w>rect.x)
		{
			direction.x = 1;
		}
		else
		{
			direction.x = 0;
		}
		
		if(rect.h>rect.y)
		{
			direction.y = 1;
		}
		else
		{
			direction.y = 0;
		}
		
		if(rect.w == rect.x && rect.h == rect.y)
		{
			click = true;
		}
		else
		{
			click = false;
		}
		
	},true)
	
})

	
