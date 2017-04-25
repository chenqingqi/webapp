/**
 * 主视图
 */
module('about_view',function()
{
	var model = reg('about_model');
	var control = reg('about_control');
	var configure = reg('configure');
	var ui = $('#titlebar');
	listenEvent('READY',onReady);
	
	function onReady(e)
	{   	  
	    $('#back').bind('click',onBack);
	    style(model.school().mainColor);
	    $('body').attr('hidden',false);
	    var h=$(window).height();
    	if(h<760){
    		$('#copyright').css('position','inherit');
    	}
	    var json=model.school();
	    var logo=json.logoUrl;
	    
    	if(logo==''){
    	       $('#logos').attr('src','/resource/logo.png');	
    	}else{
    	       $('#logos').attr('src',logo);
    	}
    	
    	$('#school_name').text(json.webName);
    	$('#qrcode').attr('src',configure.qrcode(config.code));
    	$('#webSimpleName').text('扫描二维码，下载'+json.webSimpleName+' App ');
    	$('#button_arrow_href').attr('href',json.downloadPageUrl);
	}	

    function addAbout(){
    	var address=model.setabout().data.address;
    	var logo=model.setabout().data.logoUrl;
    	if(logo==''){
    	$('#logos').attr('src','/resource/logo.png');	
    	}else{
    	$('#logos').attr('src',address+logo);
    	}
    	$('#school_name').text(model.setabout().data.webName);
    	$('#qrcode').attr('src',config.qrcode(config.code));
    	$('#webSimpleName').text('扫描二维码，下载'+model.setabout().data.webSimpleName+' App ');
    	$('#button_arrow_href').attr('href',address);	
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