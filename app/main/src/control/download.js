/**
 * 广告栏目
 */
module('download',function()
{
	
	var ui = $('#download');
	var model = reg('model');
	var storage = reg('storage');
	function main()
	{
		
		if(model.school().iconUrl !== "")
		{
			ui.find('#logo_img').attr('src',model.school().iconUrl);
		}
		
		ui.find('span').text(model.school().webSimpleName);
		ui.find('a').attr('href',model.school().downloadPageUrl);
		
		console.log(model.school())
		
		$('#download_img').bind('touchend',downloadclose);
	}
	
	function downloadclose(e){
		
		window.setTimeout(function()
		{
			$('#download_img').unbind('touchend',downloadclose);
			ui.remove();
			
			var height=$(window).height()-100
			$('#panel').css('height',height+'px');
			$('#home').css('height',height+'px');
			$('#school').css('height',height+'px');
			$('#find').css('height',height+'px');
			$('#my').css('height',height+'px');
			sendEvent('DOWNLOAD_COLSE')
			
		},500)
	}
	
	main();
})
