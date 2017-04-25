define(function()
{
	/**
	 * 简单加载动画
	 */
	function SimpleLoading(class_name)
	{
		var node;
	
		function main()
		{
			node = $("."+class_name);
		}
		
		this.show = function(x,y)
		{
			if(!x) x = ($(window).width()-90) /2;
			if(!y) y = ($(window).height()-79)/2;
			
			node.css('left',x+'px');
			node.css('top',y+'px');
			
			node.show();
		}
		
		this.hide = function()
		{
			node.hide();
		}
		
		main();
	}
	
	return SimpleLoading
})
