/**
 * 例子视图
 */
app.view('menu',function()
{
	var ui = $($('#menu')[0].outerHTML).attr('hidden',false);
	$('#menu').remove()
		
	function color(value)
	{
		ui.find('#item').css('background-color',value)
	}
	
	return{
		
		color:color,
		ui:ui
	}
})
