/**
 * 主视图
 */
app.view('view',function()
{
	var model = app.reg('model');
	
	var control = app.reg('control');
	
	var submit,arrow,account_one,account_two,tip
	
	listenEvent('READY',onReady);
	
	function onReady(e)
	{
		submit = $('#submit');
		submit.css('top',$(window).height()-submit.height()+1);
		
		arrow  = $('#arrow');
		
		tip = $('#tip');
		tip.find('#panel').css('margin-top',($(window).height()-350)/2-50);
		
		toner.setBgImageColor(submit[0],'#5BAEF5',model.school().mainColor);
		toner.setImageColor(arrow[0],'#5BAEF5',model.school().mainColor);
		
		$('body').show();
	}
})