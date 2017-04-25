config({
	
	'jquery' 	:'/core/utils/jquery',
	'easing' 	:'/core/utils/easing',
	'request'	:'/core/utils/request',
	'storage'	:'/core/utils/storage',
	'toner'	 	:'/core/utils/toner',
	'system'	:'/core/utils/system',
	'configure'	:'/module/configure',
	'tip'  	    :'/module/tip/tip',
	'model'  	:'/app/main/src/model',
	'control'  	:'/app/main/src/control/control',
	'titlebar'  :'/app/main/src/control/titlebar',
	'menu'  	:'/app/main/src/control/menu',
	'panel'  	:'/app/main/src/control/panel',
	'school'  	:'/app/main/src/control/school',
	'find'  	:'/app/main/src/control/find',
	'my'  	    :'/app/main/src/control/my'},

function main()
{
	var request = reg('request');
	
	request.connect({
					
		debug:1,
		deviceId:'h5',
		webCode:'user1'
	
	},'getWebConfigInfoAction','get','http://192.168.3.6:88/Mobile/Index/',function(e)
	{
		console.log(e)
	});
})
