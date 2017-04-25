define(function()
{
	/**
	 * 关联弹框
	 */
	function BindTip(class_name)
	{
		var node;
		
		function main()
		{
			node = $('.'+class_name);
			node.find('#panel').css('margin-top',($(window).height()-430)/2+'px');
			node.find('#enter').bind('touchend',onEvent);
		}
		
		function onEvent(e)
		{
			sendEvent('iknow_click');
			node.hide();
		}
		
		this.show = function()
		{
			node.show();
		}
		
		this.name = function(str)
		{
			node.find('#account_name').text(str)
		}
		
		this.user = function(str)
		{
			node.find('#account').find('p').text(str)
		}
		
		this.img = function(url)
		{
			node.find('#account').find('img').attr('src',url)
		}
		
		this.info = function(str)
		{
			node.find('#info').text(str)
		}
		
		main();
	}
	
	return BindTip;
})