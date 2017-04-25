/**
 * 主控制器
 */
app.control('control',function()
{
	var model = app.reg('model');
	
	app.reg('configure').init(complete)
	
	function complete()
	{
		model.school(JSON.parse(storage.read(config.code)))
	}
})