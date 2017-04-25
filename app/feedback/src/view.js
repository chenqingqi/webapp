/**
 * 主视图
 */
module('feedback_view',function()
{
	var model = reg('feedback_model');
	var control = reg('feedback_control');
	var ui = $('#titlebar');
	listenEvent('READY',onReady);
	
	function onReady(e)
	{   	  
	    $('#back').bind('click',onBack);
	    style(model.school().mainColor);
	     $('body').attr('hidden',false);
	     $('#button').bind('click',sendFeedBack);
	     listenEvent('feedok',returnFeedBack);
	     
	     $('#txt').css('height',($(window).height()-120)+'px');
	}	

    function sendFeedBack(){
    	var feedtxt=$('#txt').val();
    	if(feedtxt!=''){
    		control.getresourcelist(feedtxt);
    	}else{
    		prompts('请输入建议');
    	}
    	
    }
    
    function returnFeedBack(){
    	var code=model.setfeedback().code;
    	var values;
    	if(code=='1000'){
    		values='感谢您的宝贵意见'
    	}else{
    		values=model.setfeedback.msg;
    	}
    	prompts(values);
    	$('#txt').val('');
    }
    
	/*
	 * 提示
	 */
	function prompts(values){
		             var prompt=$('#prompt').text(values);
		             prompt.attr('hidden',false);
				     prompt.show();
				     window.setTimeout(function()
						{
							prompt.hide();
						},2000);
			            
	}
	
	function onBack(e)
	{
		history.back();
	}
	/*
	 * 修改导航条的背景颜色
	 */
	
	function style(bgcolor)
	{
			ui.css('background-color',bgcolor)	
	}

	return {
		style: style
	}


})