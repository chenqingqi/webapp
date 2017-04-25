define(function()
{
	/**
	 * 简单提示
	 */
	function SimpleTip(class_name)
	{
		var node;
	
		function main()
		{
			node = $("."+class_name);
		}
		
		this.show = function(txt,x,y)
		{
			
			node.text(txt);
			
			if(!x) x = ($(window).width() -node.width() -30) /2;
			if(!y) y = ($(window).height()-node.height()-30)/2;
			
			node.css('left',x+'px');
			node.css('top',$(window).height()-node.height()+'px');
			node.css('opacity','0');
			node.show();
			node.animate(
			{
				top:$(window).height()-200+'px',
				opacity:1
			},
			{
				easing: 'easeInOutQuad',
				duration:150,
				complete:complete
			})
			
			function complete()
			{
				window.setTimeout(function(){node.hide()},2000);
			}
		}
		
		main();
	}
	
	return SimpleTip;
})
