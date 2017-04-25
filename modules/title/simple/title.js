define(function()
{
	/**
	 * 简单标题栏
	 */
	function SimpleTitle(class_name)
	{
		var node;
	
		function main()
		{
			node = $("."+class_name);
			node.show();
			node.find('#back').bind('touchend',onEvent);
		}
		
		function onEvent(e)
		{
			history.back();
		}
		
		this.value = function(str)
		{
			node.find('#title').text(str)
		}
		
		main();
	}
	
	return SimpleTitle;
})
